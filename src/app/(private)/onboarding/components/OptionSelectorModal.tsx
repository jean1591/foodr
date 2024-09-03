import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'

import { ButtonParameterLight } from '@/app/design/Button'
import { RootState } from '@/app/lib/store/store'
import { UnknownAction } from '@reduxjs/toolkit'
import { setDisplayOptionSelectorModal } from '@/app/lib/store/features/interactions/slice'
import { useState } from 'react'

export const OptionSelectorModal = ({
  onCloseHandler,
  options,
  selected,
  title,
}: {
  onCloseHandler: (options: string[]) => UnknownAction
  options: string[]
  selected: string[]
  title: string
}) => {
  const dispatch = useDispatch()
  const { displayOptionSelectorModal } = useSelector(
    (state: RootState) => state.interactions
  )

  const [selectionOptions, setSelectedOptions] = useState<string[]>(selected)

  const modalOnClose = () => {
    dispatch(setDisplayOptionSelectorModal(false))
    dispatch(onCloseHandler(selectionOptions))
  }

  const handleOptionOnClick = (option: string) => {
    if (selectionOptions.includes(option)) {
      setSelectedOptions(selectionOptions.filter((opt) => opt !== option))
    } else {
      setSelectedOptions([...selectionOptions, option])
    }
  }

  return (
    <Dialog
      className="relative z-10"
      open={displayOptionSelectorModal}
      onClose={modalOnClose}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-blue-950 bg-opacity-20"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center text-center md:items-center">
          <DialogPanel
            transition
            className="relative w-full transform overflow-hidden rounded-lg bg-white text-left lg:w-1/2"
          >
            <div className="px-4 py-8">
              <DialogTitle className="text-left text-2xl font-bold capitalize leading-6 md:text-3xl">
                {title}
              </DialogTitle>

              <div className="mt-8 flex flex-col space-y-4">
                {options.map((option) => (
                  <ButtonParameterLight
                    key={option}
                    label={option}
                    onClickHandler={() => handleOptionOnClick(option)}
                    selected={selectionOptions.includes(option)}
                  />
                ))}
              </div>

              <div className="flex items-center justify-end">
                <button
                  onClick={modalOnClose}
                  className="mt-8 rounded-lg bg-blue-950 px-4 py-2 font-bold text-white"
                >
                  Validate
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
