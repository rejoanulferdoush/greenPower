import { useState } from 'react'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import logo from '../assets/login/logo.png'
import lockIcon from '../assets/set-password/lock-icon.svg'

interface SetPasswordProps {
  onResetPassword?: (password: string) => void
}

export default function SetPassword({ onResetPassword }: SetPasswordProps) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const isValid = password.length >= 8 && password === confirmPassword

  return (
    <div className="flex min-h-dvh w-dvw items-center justify-center bg-neutral-50 p-6">
      <div className="w-full max-w-115 rounded-2xl bg-white px-10 pb-10 pt-6">
        <img src={logo} alt="Green Power" className="mx-auto mb-14 h-21 w-auto" />

        <div className="mb-6 flex flex-col gap-2">
          <h1 className="text-[2rem] font-semibold leading-10 text-[#1c1c1c]">
            Set new password
          </h1>
          <p className="text-[0.875rem] leading-5.25 text-[#6b7280]">
            Your new password must be different from previously used passwords
          </p>
        </div>

        <form
          className="flex flex-col"
          onSubmit={(e) => {
            e.preventDefault()
            if (isValid) onResetPassword?.(password)
          }}
        >
          <div className="mb-5 flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-[0.875rem] font-medium leading-5.25 text-[#374151]"
            >
              New password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
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
            <p className="text-[0.75rem] leading-4.5 text-[#6b7280]">
              Must be at least 8 characters
            </p>
          </div>

          <div className="mb-7 flex flex-col gap-2">
            <label
              htmlFor="confirmPassword"
              className="text-[0.875rem] font-medium leading-5.25 text-[#374151]"
            >
              Confirm password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="h-12 w-full rounded-[0.625rem] border border-[#d1d5db] pl-4 pr-12 text-[0.875rem] text-[#1c1c1c] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#008236]/30"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                className="absolute right-1 top-1/2 flex size-6.5 -translate-y-1/2 items-center justify-center text-[#9ca3af]"
              >
                {showConfirmPassword ? (
                  <MdVisibilityOff className="size-4.5" />
                ) : (
                  <MdVisibility className="size-4.5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className={`flex h-12 w-full items-center justify-center gap-2 rounded-[0.625rem] text-[0.9375rem] font-medium text-white transition-colors ${
              isValid ? 'bg-[#008236]' : 'bg-[#d1d5db]'
            }`}
          >
            Reset password
            <img src={lockIcon} alt="" className="size-4.5" />
          </button>
        </form>
      </div>
    </div>
  )
}
