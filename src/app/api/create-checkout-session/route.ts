import { NextRequest, NextResponse } from 'next/server'

import Stripe from 'stripe'
import { createClient } from '@/utils/supabase/server'
import { getLoggedInUser } from '../utils/user'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // TODO: move this to supabase admin
    const supabase = createClient()
    const { id: userId } = await getLoggedInUser(supabase)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      metadata: {
        supabase_user_id: userId,
      },
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: body.productName,
            },
            unit_amount: body.amount, // Amount in cents (e.g., 2000 = $20)
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.get('origin')}/generate`,
      cancel_url: `${req.headers.get('origin')}/generate`,
    })

    return NextResponse.json({ id: session.id })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: 'An error occurred while creating the checkout session.' },
      { status: 500 }
    )
  }
}
