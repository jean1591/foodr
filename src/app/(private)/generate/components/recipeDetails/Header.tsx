'use client'

import { RootState } from '@/app/lib/store/store'
import { useSelector } from 'react-redux'

export const Header = () => {
  const { user } = useSelector((state: RootState) => state.user)

  return (
    <div className="relative flex items-center justify-center">
      <p className="text-8xl font-extrabold leading-none tracking-tight">
        Foodr
      </p>
      <div className="absolute right-0 flex items-center justify-end gap-x-2 rounded-xl bg-white bg-opacity-50 px-4 py-2 text-lg font-medium">
        <p>Credits:</p>
        {user && <p>{user.credits}</p>}
        {!user && (
          <p className="animate-pulse bg-slate-200 text-slate-200">99</p>
        )}
      </div>
    </div>
  )
}
