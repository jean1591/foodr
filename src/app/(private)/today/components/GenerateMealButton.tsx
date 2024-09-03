import { PiMagnifyingGlassBold } from 'react-icons/pi'
import { buttonHoverTransition } from '@/utils/design/constants'
import { classNames } from '@/utils/classNames'

export const GenerateMealButton = () => {
  return (
    <div className="absolute -top-7 w-full px-4">
      <button
        className={classNames(
          buttonHoverTransition,
          'flex w-full items-center justify-center space-x-4 rounded-xl bg-white py-4 text-slate-600 shadow-lg hover:shadow-none'
        )}
      >
        <PiMagnifyingGlassBold className="h-4 w-4" />
        <p>Find something to eat</p>
      </button>
    </div>
  )
}
