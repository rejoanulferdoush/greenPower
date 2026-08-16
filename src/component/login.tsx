import { useState } from 'react'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import BrandPanel from './BrandPanel'
import nmsLogo from '../assets/nms_logo.svg'
import iconUser from '../assets/login/user.svg'
import iconLock from '../assets/login/password.svg'
import iconArrowRight from '../assets/login/arrow-icon.svg'
import iconSso from '../assets/login/sos.svg'

interface LoginFormProps {
  onForgotPassword?: () => void
}

export default function LoginForm({ onForgotPassword }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex min-h-dvh w-dvw flex-col overflow-y-auto bg-white lg:flex-row">
      <BrandPanel />

      <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-6 p-4 py-8 sm:gap-8 sm:p-6 sm:py-10 landscape:gap-5 landscape:py-6 md:p-8 lg:flex-2">
        <img src={nmsLogo} alt="NMS" className="h-10 w-auto lg:hidden" />

        <div className="flex w-full max-w-100 flex-col gap-5 sm:gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-[1.5rem] font-semibold leading-9 text-[#1b1b21] sm:text-[1.875rem] sm:leading-10">
              Welcome back
            </h2>
            <p className="text-[0.875rem] leading-5.25 text-[#6b7380]">
              Sign in to your infrastructure dashboard
            </p>
          </div>

          <form className="flex flex-col gap-5 sm:gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-[0.875rem] font-medium text-[#374151]"
              >
                Email address
              </label>
              <div className="flex items-center gap-2.5 rounded-[0.625rem] border border-[#e0e5ed] bg-white px-4 py-3.5">
                <img src={iconUser} alt="" className="size-4.5 shrink-0" />
                <input
                  id="email"
                  type="email"
                  placeholder="you@vaultinfra.com"
                  className="w-full text-[0.875rem] text-[#1c1c1c] placeholder:text-[#9ca3af] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-[0.875rem] font-medium text-[#374151]"
                >
                  Password
                </label>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    onForgotPassword?.()
                  }}
                  className="text-[0.75rem] font-medium text-[#FF0000]"
                >
                  Forgot password?
                </a>
              </div>
              <div className="flex items-center gap-2.5 rounded-[0.625rem] border border-[#e0e5ed] bg-white px-4 py-3.5">
                <img src={iconLock} alt="" className="size-4.5 shrink-0" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="w-full text-[0.875rem] text-[#1c1c1c] placeholder:text-[#9ca3af] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="shrink-0 text-[#9ca3af]"
                >
                  {showPassword ? (
                    <MdVisibilityOff className="size-4.5" />
                  ) : (
                    <MdVisibility className="size-4.5" />
                  )}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2.5">
              <input
                type="checkbox"
                className="size-4.5 rounded-[0.3125rem] border-[0.09375rem] border-[#e0e5ed] text-[#0073ff] focus:ring-[#0073ff]"
              />
              <span className="text-[0.8125rem] text-[#6b7380]">
                Remember me for 30 days
              </span>
            </label>

            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-[0.625rem] bg-[#0073ff] text-[0.9375rem] font-medium text-white shadow-[0rem_0.625rem_0.46875rem_rgb(0_115_255/0.2)]"
            >
              Sign in
              <img src={iconArrowRight} alt="" className="size-4.5" />
            </button>

            <div className="flex items-center gap-3.5">
              <div className="h-px flex-1 bg-[#e0e5ed]" />
              <p className="whitespace-nowrap text-[0.75rem] text-[#9ca3af]">
                or continue with
              </p>
              <div className="h-px flex-1 bg-[#e0e5ed]" />
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-2.5 rounded-[0.625rem] border border-[#e0e5ed] bg-white py-3.25 text-[0.875rem] font-medium text-[#1b1b21]"
            >
              <img src={iconSso} alt="" className="size-4.5" />
              Single Sign-On (SSO)
            </button>
          </form>
        </div>

        <p className="flex items-center gap-1.25 text-[0.8125rem]">
          <span className="text-[#6b7380]">Don&apos;t have an account?</span>
          <span className="font-medium text-[#0073ff]">
            Contact your administrator
          </span>
        </p>

        <p className="text-[0.75rem] text-[#9ca3af]">
          © 2025 VaultNet Systems · Built for Vault Infrastructure
        </p>
      </div>
    </div>
  )
}
