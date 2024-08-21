import { NextResponse, type NextRequest } from 'next/server'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { Plan, User } from '@/utils/interfaces/users'
import { Database } from '@/utils/supabase/database.types'

type DbUser = Database['public']['Tables']['users']['Row']

export async function GET(request: NextRequest) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/login')
  }

  const { user: authUser } = data

  const { data: users } = await supabase
    .from('users')
    .select('*')
    .eq('auth_user_id', authUser.id)

  if (!users || users.length === 0) {
    redirect('/login')
  }

  return NextResponse.json({ user: formatDbUserToUser(users[0]) })
}

const formatDbUserToUser = (user: DbUser): User => {
  return {
    credit: user.credits,
    email: user.email,
    plan: user.plan as Plan,
  }
}
