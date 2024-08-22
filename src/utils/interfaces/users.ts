export enum Plan {
  FREE = 'free',
  PAID = 'paid',
}

export interface User {
  credits: number
  email: string
  hasCompletedOnboarding: boolean
  plan: Plan
}
