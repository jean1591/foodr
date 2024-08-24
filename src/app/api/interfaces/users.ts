import { Database } from '@/utils/supabase/database.types'
import { DbMeal } from './meals'

export type DbUser = Omit<
  Database['public']['Tables']['users']['Row'],
  | 'auth_user_id'
  | 'created_at'
  | 'generation_count'
  | 'has_requested_credits'
  | 'id'
> & { options: { label: string }[]; meals: DbMeal[] }
