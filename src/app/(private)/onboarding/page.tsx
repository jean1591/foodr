'use client'

import { FirstGenerateStep } from './components/FirsGenerateStep'
import { WelcomeStep } from './components/WelcomeStep'
import { buttonHoverTransition } from '@/utils/design/constants'
import { classNames } from '@/utils/classNames'
import { useState } from 'react'

export default function Onboarding() {
  const [step, setStep] = useState<number>(0)

  return (
    <div className="mx-auto flex min-h-screen flex-col py-16 md:max-w-7xl">
      <div className="flex-1">
        <div className="flex items-center justify-center">
          <p className="text-8xl font-extrabold leading-none tracking-tight">
            Foodr
          </p>
        </div>

        <div className="mt-16">
          {step === 0 && <WelcomeStep />}
          {step === 1 && <FirstGenerateStep />}
        </div>
      </div>

      {step === 0 && (
        <div className="-mt-16 flex items-center justify-end">
          <button
            className={classNames(
              buttonHoverTransition,
              'col-span-3 flex items-center justify-center gap-x-4 rounded-xl border-2 border-blue-950 bg-blue-950 px-8 py-4 text-center font-bold uppercase text-white hover:opacity-90 hover:shadow-xl'
            )}
            onClick={() => setStep(1)}
          >
            Got it !
          </button>
        </div>
      )}
    </div>
  )
}
