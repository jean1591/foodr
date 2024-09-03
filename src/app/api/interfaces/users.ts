import { Database } from '@/utils/supabase/database.types'

export type DbUserLegacy = Omit<
  Database['public']['Tables']['users']['Row'],
  | 'auth_user_id'
  | 'created_at'
  | 'generation_count'
  | 'has_requested_credits'
  | 'id'
  | 'username'
> & { options: { label: string }[] }

export type DbUser = Pick<
  Database['public']['Tables']['users']['Row'],
  'credits' | 'has_completed_onboarding' | 'username'
>
