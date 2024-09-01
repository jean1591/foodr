import { Database } from '@/utils/supabase/database.types'

// TODO: In DB, change name for label
export type DbRecipe = Omit<
  Database['public']['Tables']['recipes']['Row'],
  'id' | 'created_at'
>

export type DbRecipeItem = Pick<
  Database['public']['Tables']['recipes']['Row'],
  'icon' | 'name' | 'type'
>

export type DbRecipeWithRelations = Omit<
  Database['public']['Tables']['recipes']['Row'],
  'id' | 'created_at'
> & { ingredients: DbIngredient[]; instructions: DbInstruction[] }

export type DbIngredient = Omit<
  Database['public']['Tables']['ingredients']['Row'],
  'id'
>

export type DbInstruction = Omit<
  Database['public']['Tables']['instructions']['Row'],
  'id'
>
