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

export type WeeklyRecipes = Record<WeekDays, RecipeItem[]>

export interface RecipeItem {
  calories: number
  cookTime: number
  description: string
  icon: string
  name: string
  prepTime: number
  type: string
}

export interface Recipe {
  cookTime: number // In minutes
  description: string
  ingredients: Ingredient[]
  instructions: Instruction[]
  name: string
  prepTime: number // In minutes
}

export interface Ingredient {
  icon: string
  name: string
  quantity: number
  unit: string
}

export interface Instruction {
  instruction: string
  stepNumber: number
}
