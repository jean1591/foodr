import { NextRequest, NextResponse } from 'next/server'
import {
  addCreditsByUserId,
  addPayment,
  getUserByPaymentIntentId,
  withdrawCreditsByUserId,
} from '@/utils/supabase/admin'

import Stripe from 'stripe'
import { isNil } from 'lodash'

// TODO: Rename all admin method to be business agnostic

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature') as string
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  let event: Stripe.Event

  try {
    if (!sig || !webhookSecret) {
      console.error('Webhook secret not found')
      return NextResponse.json({
        message: 'Webhook secret not found',
        status: 400,
      })
    }

    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
    console.info(`Webhook triggered - ${event.type} received`)
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`)

    return NextResponse.json({
      message: `Webhook Error: ${err.message}`,
      status: 400,
    })
  }

  try {
    switch (event.type) {
      case 'charge.dispute.created': {
        const disputeSession = event.data.object

        const chargeId = disputeSession.charge as string

        // Issue a refund
        await stripe.refunds.create({
          charge: chargeId,
        })

        break
      }
      // Refund of a successful payment
      case 'charge.refunded': {
        const refundSession = event.data.object
        const paymentIntentId = refundSession.payment_intent

        if (isNil(paymentIntentId)) {
          throw new Error('No paymentIntentId linked')
        }

        const user = await getUserByPaymentIntentId(paymentIntentId as string)

        if (isNil(user)) {
          console.error(
            `No user found linked to paymentIntentId ${paymentIntentId}`
          )

          return
        }

        const { id: supabaseUserId } = user

        await withdrawCreditsByUserId(supabaseUserId)

        break
      }

      // Completed payment process and successful payment
      case 'checkout.session.completed': {
        const checkoutSession = event.data.object

        if (checkoutSession.payment_status !== 'paid') {
          throw new Error(
            `An error occured during payment: paymentStatus: ${checkoutSession.payment_status}`
          )
        }

        const paymentIntentId = checkoutSession.payment_intent

        if (
          checkoutSession.metadata &&
          checkoutSession.metadata.supabase_user_id &&
          paymentIntentId
        ) {
          const supabaseUserId = checkoutSession.metadata.supabase_user_id
          await addCreditsByUserId(supabaseUserId)
          await addPayment(supabaseUserId, paymentIntentId as string)
        }

        break
      }

      // Potential fraud risk for a charge, early warning a dispute
      case 'radar.early_fraud_warning.created': {
        const warningSession = event.data.object

        const chargeId = warningSession.charge as string

        // Issue a refund
        await stripe.refunds.create({
          charge: chargeId,
        })

        break
      }
      default:
        console.info(`Unhandled event: ${event.type}`)
    }
  } catch (error) {
    console.error(`Webhook handler failed ${event.type}`, { error })
    return new Response(`Webhook handler failed - ${event.type}`, {
      status: 400,
    })
  }

  return NextResponse.json({ todo: true })
}
