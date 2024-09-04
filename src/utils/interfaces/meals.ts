import { WeekDays } from './recipes'

export type Colours =
  | 'amber'
  | 'blue'
  | 'cyan'
  | 'emerald'
  | 'gray'
  | 'green'
  | 'indigo'
  | 'lime'
  | 'orange'
  | 'pink'
  | 'purple'
  | 'red'
  | 'rose'
  | 'teal'
  | 'yellow'

export type MealType = 'breakfast' | 'lunch' | 'dinner'

type Meals = {
  breakfast?: Meal
  lunch?: Meal
  dinner?: Meal
}

export type WeeklyMeals = Record<WeekDays, Meals>

export interface Meal {
  color: Colours
  icon: string
  name: string
}
