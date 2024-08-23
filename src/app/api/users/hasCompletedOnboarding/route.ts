import { NextRequest, NextResponse } from 'next/server'

import { Options } from '@/app/lib/store/features/mealOptions/slice'
import { createClient } from '@/utils/supabase/server'

export async function PUT(request: NextRequest): Promise<NextResponse> {
  const { options }: { options: Options } = await request.json()

  const selectedOptions = Object.entries(options)
    .map(([key, option]) => {
      if (option) {
        return key
      }

      return
    })
    .filter((option) => option !== undefined)

  const supabase = createClient()

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser()

  if (!authUser) {
    throw new Error('User is not connected')
  }

  const { data: users, error: userUpdatedError } = await supabase
    .from('users')
    .update({ has_completed_onboarding: true })
    .eq('auth_user_id', authUser.id)
    .select()

  if (userUpdatedError || !users || users.length === 0) {
    console.error({ error: userUpdatedError })
    throw new Error('An error occured at user updated: hasCompletedOnboarding')
  }

  const { error: userOptionsInsertedError } = await supabase
    .from('options')
    .insert(
      selectedOptions.map((option) => ({ label: option, user_id: users[0].id }))
    )

  if (userOptionsInsertedError) {
    console.error({ error: userOptionsInsertedError })
    throw new Error(
      'An error occured at user options inserted: hasCompletedOnboarding'
    )
  }

  return NextResponse.json({ success: true })
}
