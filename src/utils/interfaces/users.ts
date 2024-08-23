export enum Plan {
  FREE = 'free',
  PAID = 'paid',
}

export interface User {
  credits: number
  email: string
  hasCompletedOnboarding: boolean
  options: string[]
  plan: Plan
}
