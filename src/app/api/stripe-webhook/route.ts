import { NextRequest, NextResponse } from 'next/server'

import Stripe from 'stripe'
import { addCreditsByUserId } from '@/utils/supabase/admin'
import { isNil } from 'lodash'

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
      // Refund of a successful payment
      case 'charge.refunded':
        // TODO: remove credits
        break

      // Completed payment process and successful payment
      case 'checkout.session.completed':
        const checkoutSession = event.data.object as Stripe.Checkout.Session

        if (checkoutSession.payment_status !== 'paid') {
          throw new Error('TODO')
        }

        const supabaseUserId = checkoutSession.client_reference_id
        if (isNil(supabaseUserId)) {
          throw new Error('TODO')
        }

        await addCreditsByUserId(supabaseUserId)
        break

      // Potential fraud risk for a charge, early warning a dispute
      case 'radar.early_fraud_warning.created':
        const warning = event.data.object as any // Cast to the appropriate type
        const chargeId = warning.charge

        // Retrieve the charge details
        const charge = await stripe.charges.retrieve(chargeId)

        // Issue a refund
        const refund = await stripe.refunds.create({
          charge: chargeId,
        })

        console.log('Refund created:', refund)
        break
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
