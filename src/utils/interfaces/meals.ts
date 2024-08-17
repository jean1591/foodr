type WeekDays =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

export type Colours =
  | 'amber'
  | 'blue'
  | 'gray'
  | 'green'
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
  calories: number
  color: Colours
  icon: string
  name: string
}
