import { useState } from 'react'
import BrandPanel from './BrandPanel'
import backArrow from '../assets/forgot-password/back-arrow.svg'
import mailIcon from '../assets/forgot-password/email.svg'

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
    <div className="flex min-h-dvh w-dvw bg-white">
      <BrandPanel />

      <div className="flex min-w-0 flex-2 flex-col items-center justify-center gap-8 p-8">
        <div className="w-full max-w-115 rounded-4xl bg-white p-10">
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
                className="text-[0.875rem] font-medium text-[#374151]"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="h-12 w-full rounded-[0.625rem] border border-[#d1d5db] px-4 text-[0.875rem] text-[#1c1c1c] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#1d6ef5]/30"
              />
            </div>

            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-[0.625rem] bg-[#1d6ef5] text-[0.9375rem] font-medium text-white"
            >
              Reset password
              <img src={mailIcon} alt="" className="size-4.5" />
            </button>
          </form>
        </div>

        <p className="text-[0.75rem] text-[#9ca3af]">
          © 2025 VaultNet Systems · Built for Vault Infrastructure
        </p>
      </div>
    </div>
  )
}
