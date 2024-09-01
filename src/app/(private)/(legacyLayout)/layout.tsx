'use client'

import { UserLegacy } from '@/utils/interfaces/users'
import { setSelectedOptions } from '../../lib/store/features/mealOptions/slice'
import { setUserLegacy } from '../../lib/store/features/user/slice'
import { setWeeklyMeals } from '../../lib/store/features/meals/slice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    ;(async function getUser() {
      try {
        const userResponse = await fetch('/api/users')
        const { user } = (await userResponse.json()) as { user: UserLegacy }

        if (!user.hasCompletedOnboarding) {
          router.push('/onboarding')
        }

        dispatch(setUserLegacy(user))
        dispatch(setSelectedOptions(user.options))
        dispatch(setWeeklyMeals(user.weeklyMeal))
      } catch (error) {
        console.error('An error occured when fetching logged in user')
        router.push('/login')
        return
      }
    })()
  }, [])

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">{children}</div>
  )
}
