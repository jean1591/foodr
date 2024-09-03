import { RecipeItem } from '@/utils/interfaces/recipes'
import { createClient } from '@/utils/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'
import { redirect } from 'next/navigation'
import { DbRecipeItem } from '@/app/api/interfaces/recipes'
import { formatDbRecipeItemToRecipeItem } from '@/app/api/formatters/recipes'

export async function GET(request: NextRequest) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/login')
  }

  const { user: authUser } = data

  const { data: users } = await supabase
    .from('users')
    .select('id')
    .eq('auth_user_id', authUser.id)

  if (!users || users.length === 0) {
    throw new Error('No users found')
  }

  const { data: recipes } = await supabase
    .from('recipes')
    .select('icon, name, type')
    .eq('user_id', users[0].id)
    .limit(3)
    .order('created_at', { ascending: false })

  if (!recipes || recipes.length === 0) {
    throw new Error('An error occured while fetching user latest recipes')
  }

  return NextResponse.json({
    recipes: recipes.map(formatDbRecipeItemToRecipeItem),
  })
}
