import { Database } from '@/utils/supabase/database.types'

export type DbMeal = Omit<
  Database['public']['Tables']['meals']['Row'],
  'id' | 'created_at'
>
