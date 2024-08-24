import { NextRequest, NextResponse } from 'next/server'

import { createClient } from '@/utils/supabase/server'

export async function PUT(request: NextRequest): Promise<NextResponse> {
  const supabase = createClient()

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser()

  if (!authUser) {
    throw new Error('User is not connected')
  }

  const { error: userUpdatedError } = await supabase
    .from('users')
    .update({ has_requested_credits: true })
    .eq('auth_user_id', authUser.id)

  if (userUpdatedError) {
    console.error({ error: userUpdatedError })
    throw new Error('An error occured at user updated: hasRequestedCredits')
  }

  return NextResponse.json({ success: true })
}
