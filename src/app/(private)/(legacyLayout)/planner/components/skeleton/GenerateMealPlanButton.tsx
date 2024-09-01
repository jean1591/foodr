import { buttonHoverTransition } from '@/utils/design/constants'
import { classNames } from '@/utils/classNames'

export const GenerateMealPlanButtonSkeleton = () => {
  return (
    <div>
      <button
        className={classNames(
          buttonHoverTransition,
          'w-full rounded-lg bg-gradient-to-tr from-indigo-400 to-green-300 px-8 py-4 text-lg font-bold text-white shadow-lg hover:opacity-75 hover:shadow-none disabled:from-slate-500 disabled:to-slate-500'
        )}
      >
        Generate meal plan
      </button>
    </div>
  )
}
