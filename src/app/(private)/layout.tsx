'use client'

import { Footer } from './components/Footer'
import { User } from '@/utils/interfaces/users'
import { setUser } from '../lib/store/features/user/slice'
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
        const userResponse = await fetch('/api/users/v2')
        const { user } = (await userResponse.json()) as { user: User }

        if (!user.hasCompletedOnboarding) {
          router.push('/onboarding')
        }

        dispatch(setUser(user))
      } catch (error) {
        console.error('An error occured when fetching logged in user')
        router.push('/login')
        return
      }
    })()
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-blue-950">
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}
