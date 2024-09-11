import { Database, Tables } from './database.types'

import { createClient } from '@supabase/supabase-js'
import { isNil } from 'lodash'

type User = Tables<'users'>

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export const addCreditsByUserId = async (userId: string): Promise<void> => {
  const { data: user } = await supabase
    .from('users')
    .select('credits')
    .eq('id', userId)
    .single()

  if (isNil(user)) {
    throw new Error('TODO')
  }

  const { error: insertError } = await supabase
    .from('users')
    .update({ credits: user.credits + 50 })
    .eq('id', userId)

  if (insertError) {
    throw new Error('An error occured at user credits update')
  }
}

export const addPayment = async (
  userId: string,
  paymentIntentId: string
): Promise<void> => {
  const { error: insertError } = await supabase
    .from('payments')
    .insert([{ stripe_payment_id: paymentIntentId, user_id: userId }])

  if (insertError) {
    console.error('An error occured at payment insert', insertError)
    throw new Error('An error occured at payment insert')
  }
}

export const withdrawCreditsByUserId = async (
  userId: string
): Promise<void> => {
  const { data: user } = await supabase
    .from('users')
    .select('credits')
    .eq('id', userId)
    .single()

  if (isNil(user)) {
    throw new Error('TODO')
  }

  const updatedCredits = Math.max(user.credits - 50, 0)

  const { error: insertError } = await supabase
    .from('users')
    .update({ credits: updatedCredits })
    .eq('id', userId)

  if (insertError) {
    throw new Error('An error occured at user credits update')
  }
}

export const getUserByPaymentIntentId = async (
  paymentIntentId: string
): Promise<User> => {
  const { data: user } = await supabase
    .from('payments')
    .select('...users!inner(*)')
    .eq('stripe_payment_id', paymentIntentId)
    .single()

  if (isNil(user)) {
    throw new Error(
      `No user found linked to paymentIntentId ${paymentIntentId}`
    )
  }

  return user
}
