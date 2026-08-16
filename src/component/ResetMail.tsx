import logo from '../assets/login/logo.png'
import backArrow from '../assets/reset-mail/back-arrow.svg'
import checkCircle from '../assets/reset-mail/check-circle.svg'
import mailOutline from '../assets/reset-mail/mail-outline.svg'
import mailIcon from '../assets/reset-mail/mail-icon.svg'

interface ResetMailProps {
  email?: string
  onBack?: () => void
  onResend?: () => void
  onBackToLogin?: () => void
  onResetPassword?: () => void
}

export default function ResetMail({
  email = 'santosh@greenpowerbd.com',
  onBack,
  onResend,
  onBackToLogin,
  onResetPassword,
}: ResetMailProps) {
  return (
    <div className="flex min-h-dvh w-dvw items-center justify-center bg-neutral-50 p-6">
      <div className="w-full max-w-115 rounded-2xl bg-white px-10 pb-10 pt-6">
        <img src={logo} alt="Green Power" className="mx-auto mb-14 h-21 w-auto" />

        <button
          type="button"
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-[0.8125rem] font-medium leading-[1.21875rem] text-[#6b7280]"
        >
          <img src={backArrow} alt="" className="size-4" />
          Back
        </button>

        <div className="flex flex-col items-center gap-6">
          <div className="flex size-16 items-center justify-center rounded-full bg-[#00c950]/10">
            <img src={checkCircle} alt="" className="size-8" />
          </div>

          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-[2rem] font-semibold leading-10 text-[#1c1c1c]">
              Check your email
            </h1>
            <div className="flex flex-col gap-1">
              <p className="text-[0.875rem] leading-5.25 text-[#6b7280]">
                We sent a password reset link to
              </p>
              <p className="text-[0.875rem] font-semibold leading-5.25 text-[#1c1c1c]">
                {email}
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 rounded-[0.625rem] bg-[#f6faff] p-4">
            <div className="flex gap-3">
              <img src={mailOutline} alt="" className="size-5 shrink-0" />
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <p className="text-[0.8125rem] font-semibold leading-5.25 text-[#374151]">
                    Password Reset Request
                  </p>
                  <p className="text-[0.75rem] leading-4.5 text-[#6b7280]">
                    Click the button below to reset your password
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onResetPassword}
                  className="w-fit rounded-md bg-[#008236] px-4 py-2 text-[0.75rem] font-medium leading-4.5 text-white"
                >
                  Reset Password
                </button>
              </div>
            </div>
            <p className="text-[0.6875rem] leading-4 text-[#9ca3af]">
              This link will expire in 24 hours for security reasons.
            </p>
          </div>

          <div className="flex w-full flex-col gap-1 rounded-[0.625rem] border border-[#e5e7eb] p-4">
            <p className="text-[0.8125rem] font-medium leading-5.25 text-[#374151]">
              Didn&apos;t receive the email?
            </p>
            <p className="text-[0.75rem] leading-4.5 text-[#6b7280]">
              Check your spam folder or click below to resend
            </p>
          </div>

          <div className="flex w-full flex-col gap-3">
            <button
              type="button"
              onClick={onResend}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-[0.625rem] border border-[#d1d5db] bg-white text-[0.9375rem] font-medium text-[#374151]"
            >
              Resend email
              <img src={mailIcon} alt="" className="size-4.5" />
            </button>
            <button
              type="button"
              onClick={onBackToLogin}
              className="flex h-12 w-full items-center justify-center text-[0.875rem] font-medium text-[#6b7280]"
            >
              Back to login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
