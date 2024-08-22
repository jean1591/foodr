'use client'

import { ButtonParameter } from './ButtonParameter'
import useOptionsHook from './hook/useOptionsHook'

export const Options = () => {
  const options = useOptionsHook()

  return (
    <div className="rounded-lg bg-green-100 px-4 py-8 shadow-lg">
      <div className="flex items-center justify-between">
        <p className="text-xl font-medium">Options</p>
      </div>

      <div className="mt-4 flex items-center justify-start gap-4">
        {options.map((option) => (
          <ButtonParameter
            key={option.label}
            label={option.label}
            onClickHandler={option.onClick}
            selected={option.selected}
          />
        ))}
      </div>
    </div>
  )
}
