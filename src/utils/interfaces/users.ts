import { WeeklyMeals } from './meals'

export enum Plan {
  FREE = 'free',
  PAID = 'paid',
}

export interface UserLegacy {
  credits: number
  email: string
  hasCompletedOnboarding: boolean
  options: string[]
  weeklyMeal: WeeklyMeals
  plan: Plan
}

export interface User {
  credits: number
  hasCompletedOnboarding: boolean
  username: string
}
