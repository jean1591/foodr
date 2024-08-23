import { WeeklyMeals } from './meals'

export enum Plan {
  FREE = 'free',
  PAID = 'paid',
}

export interface User {
  credits: number
  email: string
  hasCompletedOnboarding: boolean
  options: string[]
  weeklyMeal: WeeklyMeals
  plan: Plan
}
