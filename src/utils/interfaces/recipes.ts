export interface Recipe {
  cookTime: number // In minutes
  description: string
  ingredients: Ingredient[]
  instructions: Instruction[]
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
