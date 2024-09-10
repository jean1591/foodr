import { NextRequest, NextResponse } from 'next/server'

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: body.productName,
            },
            unit_amount: body.amount, // Amount in cents (e.g., 2000 = $20)
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.get('origin')}/generate?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/cancel`,
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
