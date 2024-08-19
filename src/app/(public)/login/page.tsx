'use client'

import { ChangeEvent, useState } from 'react'

import { buttonHoverTransition } from '@/utils/design/constants'
import { classNames } from '@/utils/classNames'
import { login } from './actions'
import toast from 'react-hot-toast'

const notify = () =>
  toast.success('Check you emails to login', { duration: 5000 })

export default function LoginPage() {
  const [buttonDisabled, setIsButtonDisabled] = useState<boolean>(true)
  const [email, setEmail] = useState<string>('')

  const handleLogin = () => {
    notify()

    login({ email })
  }

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 0) {
      setIsButtonDisabled(false)
    } else {
      setIsButtonDisabled(true)
    }

    setEmail(event.target.value)
  }

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <div>
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight">
          Sign in to your{' '}
          <span className="bg-green-800 p-1 text-white">Foodr</span> account
        </h2>
      </div>

      <div className="mt-8 space-y-8">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6"
          >
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              required
              onChange={handleOnChange}
              autoComplete="email"
              className="block w-full rounded-md py-2 pl-2 text-slate-800 shadow-sm ring-1 ring-inset ring-slate-800/25 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <button
          disabled={buttonDisabled}
          onClick={handleLogin}
          className={classNames(
            buttonHoverTransition,
            'w-full rounded-md bg-green-800 px-4 py-2 text-center text-base font-semibold leading-6 text-white shadow-lg hover:bg-green-900 hover:shadow-none disabled:bg-slate-200 disabled:text-slate-800'
          )}
        >
          Log in
        </button>

        <div>
          <p className="mt-4 text-sm font-medium text-white">
            If you don't have an account, one will be automatically created for
            you
          </p>
        </div>
      </div>
    </div>
  )
}
