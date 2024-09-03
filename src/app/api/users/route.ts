import { NextResponse, type NextRequest } from 'next/server'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { Plan, UserLegacy } from '@/utils/interfaces/users'
import { DbUserLegacy } from '../interfaces/users'
import {
  Colours,
  MealType,
  WeekDays,
  WeeklyMeals,
} from '@/utils/interfaces/meals'

export async function GET(request: NextRequest) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/login')
  }

  const { user: authUser } = data

  const { data: users } = await supabase
    .from('users')
    .select(
      'credits, email, has_completed_onboarding, plan, options (label), meals (*)'
    )
    .eq('auth_user_id', authUser.id)

  if (!users || users.length === 0) {
    redirect('/login')
  }

  return NextResponse.json({ user: formatDbUserToUser(users[0]) })
}

const formatDbUserToUser = (user: DbUserLegacy): UserLegacy => {
  return {
    credits: user.credits,
    email: user.email,
    hasCompletedOnboarding: user.has_completed_onboarding,
    options: user.options.map(({ label }) => label),
    plan: user.plan as Plan,
  }
}
