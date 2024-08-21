'use client'

import { RootState } from '@/app/lib/store/store'
import { useSelector } from 'react-redux'

export const UserDetails = () => {
  const { user } = useSelector((state: RootState) => state.user)

  // TODO: add skeleton
  if (!user) {
    return <></>
  }

  return (
    <div className="space-y-8 rounded-lg bg-indigo-50 px-4 py-8 shadow-lg">
      <p className="text-lg font-medium">{user.email}</p>
      <div className="flex items-center justify-between">
        <p className="rounded-lg border-[1px] border-green-800 px-2 py-1 text-sm font-semibold text-green-800">
          {user.plan}
        </p>
        <p className="text-right text-xl font-bold">{user.credit} 💎</p>
      </div>
    </div>
  )
}
