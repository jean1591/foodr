import { NextResponse, type NextRequest } from 'next/server'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { Plan, User } from '@/utils/interfaces/users'
import { Database } from '@/utils/supabase/database.types'

type DbUser = Omit<
  Database['public']['Tables']['users']['Row'],
  'auth_user_id' | 'created_at' | 'id'
> & { options: { label: string }[] }

export async function GET(request: NextRequest) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/login')
  }

  const { user: authUser } = data

  const { data: users } = await supabase
    .from('users')
    .select('credits, email, has_completed_onboarding, plan, options (label)')
    .eq('auth_user_id', authUser.id)

  if (!users || users.length === 0) {
    redirect('/login')
  }

  return NextResponse.json({ user: formatDbUserToUser(users[0]) })
}

const formatDbUserToUser = (user: DbUser): User => {
  return {
    credits: user.credits,
    email: user.email,
    hasCompletedOnboarding: user.has_completed_onboarding,
    options: user.options.map(({ label }) => label),
    plan: user.plan as Plan,
  }
}
