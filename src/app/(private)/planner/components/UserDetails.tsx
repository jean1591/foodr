'use client'

import { RootState } from '@/app/lib/store/store'
import { UserDetailsSkeleton } from './skeleton/UserDetails'
import { useSelector } from 'react-redux'

export const UserDetails = () => {
  const { user } = useSelector((state: RootState) => state.user)

  if (!user) {
    return <UserDetailsSkeleton />
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
        <p className="text-center text-2xl font-medium uppercase">
          {user.email[0]}
        </p>
      </div>
      <div className="flex items-center justify-end gap-x-2">
        <p className="text-right text-2xl font-bold">{user.credits}</p>
        <p className="text-right text-2xl font-bold">💎</p>
      </div>
    </div>
  )
}
