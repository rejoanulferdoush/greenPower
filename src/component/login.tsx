import { useState } from 'react'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import logo from '../assets/login/logo.png'
import arrowIcon from '../assets/login/arrow-icon.svg'

interface LoginFormProps {
  onForgotPassword?: () => void
}

export default function LoginForm({ onForgotPassword }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex min-h-dvh w-dvw items-center justify-center bg-neutral-50 p-6">
      <div className="w-full max-w-115 rounded-2xl bg-white px-10 pb-10 pt-6">
        <img src={logo} alt="Green Power" className="mx-auto mb-3 h-21 w-auto" />

        <div className="mb-6 flex flex-col gap-2">
          <h1 className="text-[2rem] font-semibold leading-10 text-[#1c1c1c]">
            Welcome back
          </h1>
          <p className="text-[0.875rem] leading-5.25 text-[#6b7280]">
            Please enter your credentials to continue
          </p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
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
              placeholder="name@example.com"
              className="h-12 w-full rounded-[0.625rem] border border-[#d1d5db] px-4 text-[0.875rem] text-[#1c1c1c] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#008236]/30"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-[0.875rem] font-medium leading-5.25 text-[#374151]"
              >
                Password
              </label>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  onForgotPassword?.()
                }}
                className="text-[0.75rem] font-medium leading-4.5 text-[#ef4444]"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="h-12 w-full rounded-[0.625rem] border border-[#d1d5db] pl-4 pr-12 text-[0.875rem] text-[#1c1c1c] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#008236]/30"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-1 top-1/2 flex size-6.5 -translate-y-1/2 items-center justify-center text-[#9ca3af]"
              >
                {showPassword ? (
                  <MdVisibilityOff className="size-4.5" />
                ) : (
                  <MdVisibility className="size-4.5" />
                )}
              </button>
            </div>
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="size-4 rounded-sm border border-[#bdbdbd] text-[#008236] focus:ring-[#008236]"
            />
            <span className="text-[0.8125rem] leading-[1.21875rem] text-[#4b5563]">
              Remember me for 30 days
            </span>
          </label>

          <button
            type="submit"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-[0.625rem] bg-[#008236] text-[0.9375rem] font-medium text-white"
          >
            Sign in
            <img src={arrowIcon} alt="" className="size-4.5" />
          </button>
        </form>

        <p className="mt-8 text-center text-[0.8125rem] leading-[1.21875rem] text-[#6b7280]">
          Don&apos;t have an account?{' '}
          <a href="#" className="font-semibold text-[#00c950]">
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}
