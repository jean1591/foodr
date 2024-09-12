import { SupabaseClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

export const getLoggedInUser = async (
  supabase: SupabaseClient
): Promise<{ credits: number; id: string }> => {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session || !session.user) {
    throw new Error('User is not connected')
  }

  const { user: authUser } = session

  const { data: users } = await supabase
    .from('users')
    .select('credits, id')
    .eq('auth_user_id', authUser.id)

  if (!users || users.length === 0) {
    console.error('User is not connected')
    redirect('/login')
  }

  return users[0]
}
