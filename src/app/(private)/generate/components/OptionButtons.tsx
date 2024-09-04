'use client'

import { buttonHoverTransition } from '@/utils/design/constants'
import { classNames } from '@/utils/classNames'

export const OptionButtons = () => {
  return (
    <div className="grid grid-cols-4 gap-x-4">
      <button
        className={classNames(
          buttonHoverTransition,
          'col-span-1 rounded-xl border-2 border-slate-950 py-4 text-center font-bold uppercase hover:bg-blue-100 hover:shadow-xl'
        )}
      >
        Reset
      </button>
      <button
        className={classNames(
          buttonHoverTransition,
          'col-span-3 rounded-xl border-2 border-blue-950 bg-blue-950 py-4 text-center font-bold uppercase text-white hover:opacity-90 hover:shadow-xl'
        )}
      >
        Generate meal plan
      </button>
    </div>
  )
}
