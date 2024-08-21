'use client'

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
        const userResponse = await fetch('/api/users')
        const { user } = (await userResponse.json()) as { user: User }

        dispatch(setUser(user))
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
