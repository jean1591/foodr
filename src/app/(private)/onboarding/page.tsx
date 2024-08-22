import { bgGradient, textGradient } from '@/utils/design/constants'

import { Steps } from './components/Steps'
import { classNames } from '@/utils/classNames'

export default function OnboardingPage() {
  return (
    <div className="my-24">
      <OnboardingHeader />
      <Steps />
    </div>
  )
}

const OnboardingHeader = () => {
  return (
    <div className="text-center">
      <p className="text-6xl font-extrabold leading-none tracking-tight">
        Welcome to{' '}
        <span className={classNames(textGradient, bgGradient)}>Foodr</span>
      </p>
      <p className="mt-8 text-lg font-medium leading-relaxed">
        Tick some boxes se we can generate a meal plan
        <span
          className={classNames(bgGradient, 'rounded px-2 py-1 text-white')}
        >
          fitted to your needs
        </span>
      </p>
    </div>
  )
}
