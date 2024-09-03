import { NextResponse, type NextRequest } from 'next/server'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { DbUser } from '../../interfaces/users'
import { User } from '@/utils/interfaces/users'

export async function GET(request: NextRequest) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/login')
  }

  const { user: authUser } = data

  const { data: users } = await supabase
    .from('users')
    .select('credits, has_completed_onboarding, username')
    .eq('auth_user_id', authUser.id)

  if (!users || users.length === 0) {
    redirect('/login')
  }

  return NextResponse.json({ user: formatDbUserToUser(users[0]) })
}

const formatDbUserToUser = (user: DbUser): User => {
  return {
    credits: user.credits,
    hasCompletedOnboarding: user.has_completed_onboarding,
    username: user.username,
  }
}
