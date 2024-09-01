import { Database } from '@/utils/supabase/database.types'
import { DbMeal } from './meals'

export type DbUserLegacy = Omit<
  Database['public']['Tables']['users']['Row'],
  | 'auth_user_id'
  | 'created_at'
  | 'generation_count'
  | 'has_requested_credits'
  | 'id'
  | 'username'
> & { options: { label: string }[]; meals: DbMeal[] }

export type DbUser = Pick<
  Database['public']['Tables']['users']['Row'],
  'credits' | 'has_completed_onboarding' | 'username'
>
