import { bgGradient, buttonHoverTransition } from '@/utils/design/constants'

import { classNames } from '@/utils/classNames'

export const ButtonParameter = ({
  label,
  onClickHandler,
  selected,
}: {
  label: string
  onClickHandler: () => void
  selected: boolean
}) => {
  return (
    <button
      onClick={onClickHandler}
      className={classNames(
        buttonHoverTransition,
        selected
          ? classNames(bgGradient, 'text-white')
          : 'border-green-800 bg-white text-slate-500',
        'rounded-lg px-4 py-2 text-sm shadow-lg'
      )}
    >
      {label}
    </button>
  )
}
