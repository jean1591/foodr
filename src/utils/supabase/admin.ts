import { Database } from './database.types'
import { createClient } from '@supabase/supabase-js'
import { isNil } from 'lodash'

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
