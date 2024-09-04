import { PiCheckBold } from 'react-icons/pi'
import { UnknownAction } from '@reduxjs/toolkit'
import { classNames } from '@/utils/classNames'
import { useDispatch } from 'react-redux'

export const OptionSelector = ({
  options,
  selectedOptions,
  setSlice,
  title,
}: {
  options: string[]
  selectedOptions: string[]
  setSlice: (options: string[]) => UnknownAction
  title: string
}) => {
  const dispatch = useDispatch()

  const handleOnClick = (option: string) => {
    if (selectedOptions.includes(option)) {
      dispatch(setSlice(selectedOptions.filter((opt) => opt !== option)))
    } else {
      dispatch(setSlice([...selectedOptions, option]))
    }
  }

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="text-2xl font-bold">{title}</p>
        <p className="text-sm">{selectedOptions.length} selected</p>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-start gap-2 rounded-xl bg-white p-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleOnClick(option)}
            className={classNames(
              selectedOptions.includes(option)
                ? 'border-blue-800 bg-blue-50 text-blue-800'
                : 'border-slate-200 bg-slate-50 text-slate-700',
              'flex items-center justify-center gap-x-2 rounded-xl border-2 px-2 py-1 text-sm font-medium capitalize'
            )}
          >
            {selectedOptions.includes(option) && (
              <PiCheckBold className="h-4 w-4" />
            )}

            <p>{option}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
