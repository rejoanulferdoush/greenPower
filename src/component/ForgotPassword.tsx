import { useState } from 'react'
import logo from '../assets/login/logo.png'
import backArrow from '../assets/forgot-password/back-arrow.svg'
import mailIcon from '../assets/forgot-password/mail-icon.svg'

interface ForgotPasswordProps {
  onBackToLogin?: () => void
  onResetPassword?: (email: string) => void
}

export default function ForgotPassword({
  onBackToLogin,
  onResetPassword,
}: ForgotPasswordProps) {
  const [email, setEmail] = useState('')

  return (
    <div className="flex min-h-dvh w-dvw items-center justify-center bg-neutral-50 p-6">
      <div className="w-full max-w-115 rounded-2xl bg-white px-10 pb-10 pt-6">
        <img src={logo} alt="Green Power" className="mx-auto mb-14 h-21 w-auto" />

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onBackToLogin?.()
          }}
          className="mb-6 flex items-center gap-2 text-[0.8125rem] font-medium leading-[1.21875rem] text-[#6b7280]"
        >
          <img src={backArrow} alt="" className="size-4" />
          Back to login
        </a>

        <div className="mb-6 flex flex-col gap-2">
          <h1 className="text-[2rem] font-semibold leading-10 text-[#1c1c1c]">
            Forgot password?
          </h1>
          <p className="text-[0.875rem] leading-5.25 text-[#6b7280]">
            No worries, we&apos;ll send you reset instructions
          </p>
        </div>

        <form
          className="flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault()
            onResetPassword?.(email)
          }}
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-[0.875rem] font-medium leading-5.25 text-[#374151]"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="h-12 w-full rounded-[0.625rem] border border-[#d1d5db] px-4 text-[0.875rem] text-[#1c1c1c] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#008236]/30"
            />
          </div>

          <button
            type="submit"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-[0.625rem] bg-[#008236] text-[0.9375rem] font-medium text-white"
          >
            Reset password
            <img src={mailIcon} alt="" className="size-4.5" />
          </button>
        </form>
      </div>
    </div>
  )
}
