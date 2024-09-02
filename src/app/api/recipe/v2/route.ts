import { NextRequest, NextResponse } from 'next/server'
import { isEmpty, isNil } from 'lodash'

import { Recipe } from '@/utils/interfaces/recipes'
import { SupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/server'
import { formatDbRecipeToRecipe } from '../../formatters/recipes'
import { redirect } from 'next/navigation'

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { name }: { name: string } = await request.json()

  const supabase = createClient()

  const { id: userId } = await getLoggedInUser(supabase)
  const existingRecipe = await getRecipeFromNameAndUserId(
    supabase,
    name,
    userId
  )

  return NextResponse.json({ recipe: existingRecipe })
}

const getLoggedInUser = async (
  supabase: SupabaseClient
): Promise<{ credits: number; id: string }> => {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session || !session.user) {
    throw new Error('User is not connected')
  }

  const { user: authUser } = session

  const { data: users } = await supabase
    .from('users')
    .select('id, credits')
    .eq('auth_user_id', authUser.id)

  if (!users || users.length === 0) {
    console.error('User is not connected')
    redirect('/login')
  }

  return users[0]
}

const getRecipeFromNameAndUserId = async (
  supabase: SupabaseClient,
  name: string,
  userId: string
): Promise<Recipe | null> => {
  const { data: recipes } = await supabase
    .from('recipes')
    .select('*, ingredients (*), instructions (*)')
    .eq('name', name)
    .eq('user_id', userId)

  if (isNil(recipes) || isEmpty(recipes)) {
    return null
  }

  return formatDbRecipeToRecipe(recipes[0])
}
