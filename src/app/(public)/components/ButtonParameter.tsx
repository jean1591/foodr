import { buttonHoverTransition } from '@/utils/design/constants'
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
        selected ? 'border-[1px] font-medium shadow-none' : 'shadow-lg',
        'rounded-lg border-green-800 bg-white px-4 py-2 text-sm text-slate-500 hover:bg-green-50 hover:shadow-none'
      )}
    >
      {label}
    </button>
  )
}
