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
    <div className="flex items-center justify-between rounded-lg bg-indigo-100 px-4 py-8 shadow-lg">
      <p className="text-lg font-medium">{user.email}</p>
      <div className="flex items-center justify-end gap-x-2">
        <p className="text-right text-2xl font-bold">{user.credits}</p>
        <p className="text-right text-2xl font-bold">💎</p>
      </div>
    </div>
  )
}
