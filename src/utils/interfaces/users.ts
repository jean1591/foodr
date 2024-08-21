export enum Plan {
  FREE = 'free',
  PAID = 'paid',
}

export interface User {
  credit: number
  email: string
  plan: Plan
}
