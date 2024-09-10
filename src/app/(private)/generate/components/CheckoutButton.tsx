import { buttonHoverTransition } from '@/utils/design/constants'
import { classNames } from '@/utils/classNames'
import { loadStripe } from '@stripe/stripe-js'
import { useState } from 'react'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

export const CheckoutButton = () => {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    const stripe = await stripePromise

    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productName: 'Foodr - 50 credits',
        amount: 99, // Amount in cents
      }),
    })

    const session = await response.json()

    const result = await stripe?.redirectToCheckout({
      sessionId: session.id,
    })

    if (result?.error) {
      alert(result.error.message)
    }
    setLoading(false)
  }
  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={classNames(
        buttonHoverTransition,
        'col-span-3 flex items-center justify-center gap-x-4 rounded-xl border-2 border-blue-950 bg-blue-950 p-4 text-center font-bold uppercase text-white hover:opacity-90 hover:shadow-xl disabled:border-opacity-20 disabled:bg-opacity-20 disabled:hover:shadow-none'
      )}
    >
      <p>Buy more credits</p>
    </button>
  )
}
