// TODO: add uuid to directly get recipe from DB
export interface RecipeItem {
  icon: string
  label: string
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
