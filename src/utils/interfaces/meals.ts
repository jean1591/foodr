export const days = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const

export type WeekDays = (typeof days)[number]

export type Colours =
  | 'amber'
  | 'blue'
  | 'gray'
  | 'green'
  | 'indigo'
  | 'orange'
  | 'pink'
  | 'purple'
  | 'red'
  | 'teal'
  | 'yellow'

export type MealType = 'breakfast' | 'lunch' | 'dinner'

type Meals = {
  breakfast?: Meal
  lunch: Meal
  dinner: Meal
}

export type WeeklyMeals = Record<WeekDays, Meals>

export interface Meal {
  color: Colours
  icon: string
  name: string
}
