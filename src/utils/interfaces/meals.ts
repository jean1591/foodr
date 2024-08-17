type WeekDays =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

export type Colours =
  | 'blue'
  | 'brown'
  | 'gray'
  | 'green'
  | 'orange'
  | 'pink'
  | 'purple'
  | 'red'
  | 'teal'
  | 'yellow'

export type Meals = 'breakfast' | 'lunch' | 'dinner'

export type WeeklyMeals = Record<WeekDays, Record<Meals, Meal>>

export interface Meal {
  calories: number
  color: Colours
  icon: string
  name: string
}
