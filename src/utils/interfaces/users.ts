export enum Plan {
  FREE = 'free',
  PAID = 'paid',
}

export interface User {
  credits: number
  email: string
  plan: Plan
}
