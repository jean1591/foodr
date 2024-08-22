import { PiCheck, PiX } from 'react-icons/pi'
import {
  bgGradient,
  buttonHoverTransition,
  textGradient,
} from '@/utils/design/constants'

import { BorderGradient } from '@/app/design/BorderGradient'
import Link from 'next/link'
import { classNames } from '@/utils/classNames'

export default function LandingPage() {
  return (
    <div className="my-12">
      <div className="mt-24 md:mt-48">
        <div>
          <Hero />
        </div>

        <div className="mt-12">
          <CTA />
        </div>
      </div>

      <div id="features" className="mt-24 md:mt-32">
        <FeaturesCard />
      </div>

      <div id="pricing" className="mt-24 md:mt-32">
        <Pricing />
      </div>
    </div>
  )
}

const Hero = () => {
  return (
    <div className="text-center text-slate-800">
      {/* TITLE */}
      <h1 className="text-4xl font-extrabold leading-none tracking-tight md:text-5xl">
        <p>
          Weekly{' '}
          <span className={classNames(bgGradient, textGradient)}>
            <span className="px-2">meal plans</span>{' '}
          </span>
        </p>
        <p>with ai-powered precision</p>
      </h1>

      {/* SUB-HEADING */}
      <div className="mt-8 flex items-center justify-center text-slate-600">
        <h2 className="w-full text-lg font-medium leading-relaxed md:w-3/4 md:text-lg">
          <p>
            Say goodbye to the overwhelm of meal planning. Effortlessly enjoy
            healthy, delicious meals tailored to your preferences, without the
            hassle.
          </p>
        </h2>
      </div>

      {/* KEY FEATURES */}
      <div className="mt-8 flex items-center justify-center text-slate-600">
        <ul className="list-none text-left font-medium">
          <li className="flex items-center justify-start gap-x-4">
            <PiCheck className="h-6 w-6 text-green-500" />
            <p>Time-Saving</p>
          </li>
          <li className="flex items-center justify-start gap-x-4">
            <PiCheck className="h-6 w-6 text-green-500" />
            <p>Diverse Recipes</p>
          </li>
          <li className="flex items-center justify-start gap-x-4">
            <PiCheck className="h-6 w-6 text-green-500" />
            <p>AI-Powered Personalization</p>
          </li>
        </ul>
      </div>
    </div>
  )
}

const CTA = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full md:w-1/3">
        <CtaButton />
      </div>
    </div>
  )
}

const FeaturesCard = () => {
  return (
    <div>
      <p className="text-center text-3xl font-extrabold tracking-tight">
        Ready for effortless meal planning ?
      </p>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="order-2 rounded-lg border-[1px] border-slate-500 bg-slate-50 p-8 text-slate-700 md:order-1 md:p-12">
          <p className="text-lg font-bold">Without Foodr</p>

          <ul className="mt-4 list-none space-y-2 text-left text-sm font-semibold">
            <li className="flex items-center justify-start gap-x-4">
              <PiX className="h-4 w-4" />
              <p>Wasted ingredients and food</p>
            </li>
            <li className="flex items-center justify-start gap-x-4">
              <PiX className="h-4 w-4" />
              <p>Time-consuming meal planning</p>
            </li>
            <li className="flex items-center justify-start gap-x-4">
              <PiX className="h-4 w-4" />
              <p>Inconsistent nutrition</p>
            </li>
            <li className="flex items-center justify-start gap-x-4">
              <PiX className="h-4 w-4" />
              <p>Recipe overwhelm</p>
            </li>
          </ul>
        </div>

        <div className="order-1 md:order-2">
          <BorderGradient>
            <div className="rounded-lg bg-white p-8 text-slate-700 md:p-12">
              <p
                className={
                  (classNames(bgGradient, textGradient), 'text-lg font-bold')
                }
              >
                With Foodr
              </p>

              <ul className="mt-4 list-none space-y-2 text-left text-sm font-semibold">
                <li className="flex items-center justify-start gap-x-4">
                  <PiCheck className="h-4 w-4 text-green-600" />
                  <p>Personalized meal plans</p>
                </li>
                <li className="flex items-center justify-start gap-x-4">
                  <PiCheck className="h-4 w-4 text-green-600" />
                  <p>Time-saving convenience</p>
                </li>
                <li className="flex items-center justify-start gap-x-4">
                  <PiCheck className="h-4 w-4 text-green-600" />
                  <p>Nutritional balance</p>
                </li>
                <li className="flex items-center justify-start gap-x-4">
                  <PiCheck className="h-4 w-4 text-green-600" />
                  <p>Effortless meal discovery</p>
                </li>
              </ul>
            </div>
          </BorderGradient>
        </div>
      </div>
    </div>
  )
}

const Pricing = () => {
  return (
    <div>
      <p className="text-center text-3xl font-extrabold tracking-tight">
        Try for free
      </p>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        <FreeTrialCard />
        <OneTimePaymentCard />
      </div>
    </div>
  )
}

const CtaButton = () => {
  return (
    <Link href="/login">
      <button
        className={classNames(
          buttonHoverTransition,
          bgGradient,
          'w-full rounded-lg p-4 font-bold text-white shadow-none hover:opacity-75 hover:shadow-lg'
        )}
      >
        Generate your weekly meals
      </button>
    </Link>
  )
}

const FreeTrialCard = () => {
  return (
    <div className="order-2 rounded-lg border-[1px] border-slate-500 bg-slate-50 p-8 md:order-1">
      <div className="flex items-baseline justify-start gap-x-2">
        <p className="text-5xl font-extrabold">Free</p>
      </div>

      <ul className="mt-8 list-none space-y-2 text-left font-medium">
        <li className="flex items-center justify-start gap-x-4">
          <PiCheck className="h-6 w-6 text-green-500" />
          <p>Unlimited parameters</p>
        </li>
        <li className="flex items-center justify-start gap-x-4">
          <PiCheck className="h-6 w-6 text-green-500" />
          <p>5 generations</p>
        </li>
      </ul>

      <div className="mt-16 w-full">
        {' '}
        <CtaButton />
      </div>
    </div>
  )
}

const OneTimePaymentCard = () => {
  return (
    <div className="order1 md:order-2">
      <BorderGradient>
        <div className="rounded-lg bg-white p-8">
          <div className="flex items-baseline justify-start gap-x-2">
            <p className="text-lg font-medium text-slate-600 line-through">
              18€
            </p>
            <p className="text-5xl font-extrabold">9€</p>
          </div>

          <ul className="mt-8 list-none space-y-2 text-left font-medium">
            <li className="flex items-center justify-start gap-x-4">
              <PiCheck className="h-6 w-6 text-green-500" />
              <p>Unlimited parameters</p>
            </li>
            <li className="flex items-center justify-start gap-x-4">
              <PiCheck className="h-6 w-6 text-green-500" />
              <p>
                10 generations{' '}
                <span className={classNames(bgGradient, 'p-1 text-white')}>
                  per day
                </span>
              </p>
            </li>
          </ul>

          <div className="mt-16 w-full">
            <CtaButton />
          </div>

          <p className="mt-4 text-center text-sm font-semibold text-slate-600">
            Pay it once, own it forever
          </p>
        </div>
      </BorderGradient>
    </div>
  )
}
