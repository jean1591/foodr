import { NextResponse, type NextRequest } from 'next/server'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { Plan, User } from '@/utils/interfaces/users'
import { DbUser } from '../interfaces/users'
import { DbMeal } from '../interfaces/meals'
import {
  Colours,
  Meal,
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

const formatDbUserToUser = (user: DbUser): User => {
  return {
    credits: user.credits,
    email: user.email,
    hasCompletedOnboarding: user.has_completed_onboarding,
    options: user.options.map(({ label }) => label),
    plan: user.plan as Plan,
    weeklyMeal: formatDbMealsToWeeklyMeals(user.meals),
  }
}

const formatDbMealsToWeeklyMeals = (meals: DbMeal[]): WeeklyMeals => {
  return meals.reduce((acc, current) => {
    const currentDay = current.day as WeekDays
    if (!acc[currentDay]) {
      acc[currentDay] = {
        breakfast: undefined,
        dinner: undefined,
        lunch: undefined,
      }
    }

    acc[currentDay][current.meal as MealType] = {
      color: current.color as Colours,
      icon: current.icon,
      name: current.name,
    }

    return acc
  }, {} as WeeklyMeals)
}
