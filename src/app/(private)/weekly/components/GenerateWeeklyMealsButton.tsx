import Link from 'next/link'
import { PiBowlFoodBold } from 'react-icons/pi'
import { buttonHoverTransition } from '@/utils/design/constants'
import { classNames } from '@/utils/classNames'

// TODO: do not use abolute here, use absolute on parent div
export const GenerateWeeklyMealsButton = () => {
  return (
    <div className="absolute -top-7 w-full px-4">
      <Link
        href="/onboarding/weekly"
        className={classNames(
          buttonHoverTransition,
          'flex w-full items-center justify-center space-x-4 rounded-xl bg-white py-4 text-slate-600 shadow-lg hover:shadow-none'
        )}
      >
        <PiBowlFoodBold className="h-4 w-4" />
        <p>Generate a weekly meals plan</p>
      </Link>
    </div>
  )
}
