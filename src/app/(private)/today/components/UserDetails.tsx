'use client'

import { RootState } from '@/app/lib/store/store'
import { UserDetailsSkeleton } from './skeletons/UserDetails'
import { useSelector } from 'react-redux'

export const UserDetails = () => {
  const { user } = useSelector((state: RootState) => state.user)

  if (!user) {
    return <UserDetailsSkeleton />
  }

  return (
    <div className="bg-blue-100 px-4 pb-16 pt-8">
      <h1 className="text-2xl font-bold">Good morning !</h1>

      <div className="mt-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-medium capitalize">{user.username}</p>
            <p className="text-xs font-light">Username</p>
          </div>
          <div>
            <p className="text-lg font-medium">{user.credits}</p>
            <p className="text-xs font-light">Credits</p>
          </div>
        </div>
      </div>
    </div>
  )
}
