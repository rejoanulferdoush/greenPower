import stripes from '../assets/stripes.svg'
import nmsLogo from '../assets/nms_logo.svg'
import ellipse1 from '../assets/login/ellipse-1.svg'
import ellipse2 from '../assets/login/ellipse-2.svg'
import iconShieldTrust from '../assets/sheild.svg'
import iconMonitoring from '../assets/login/time.svg'
import iconAlerts from '../assets/login/alert.svg'
import iconReporting from '../assets/login/audit.svg'

const VALUE_PROPS = [
  {
    icon: iconMonitoring,
    title: 'Live system monitoring',
    description: 'Power, UPS, cooling and environment — all in one view',
  },
  {
    icon: iconAlerts,
    title: 'Proactive alerts',
    description: 'Get notified before issues become incidents',
  },
  {
    icon: iconReporting,
    title: 'Audit-ready reporting',
    description: 'Full operational history for compliance and review',
  },
]

export default function BrandPanel() {
  return (
    <div className="relative hidden min-w-0 overflow-hidden bg-[#f3f3f3] lg:flex lg:flex-3">
      <img
        src={ellipse1}
        alt=""
        className="pointer-events-none absolute -right-12 -top-12 size-70 lg:-right-16 lg:-top-16 lg:size-90 xl:-right-24 xl:-top-24 xl:size-140"
      />
      <img
        src={ellipse2}
        alt=""
        className="pointer-events-none absolute -bottom-8 -left-16 size-75 lg:-bottom-12 lg:-left-24 lg:size-100 xl:-bottom-16 xl:-left-32 xl:size-155"
      />
      <img
        src={stripes}
        alt=""
        className="pointer-events-none absolute inset-0 size-full object-cover"
      />

      <div className="relative flex h-full flex-col justify-center gap-8 overflow-y-auto px-10 py-10 landscape:gap-6 landscape:py-8 lg:gap-10 lg:px-12 lg:py-12 xl:gap-12 xl:px-16 xl:py-16">
        <img src={nmsLogo} alt="NMS" className="h-16 w-auto lg:h-20 xl:h-28" />

        <div className="flex max-w-none flex-col gap-4 lg:max-w-115 lg:gap-5 xl:max-w-155">
          <h1 className="text-[1.875rem] font-semibold leading-10 text-[#1c1c1c] lg:text-[2.25rem] lg:leading-11 xl:text-[2.75rem] xl:leading-13.5">
            Protect your uptime.
            <br />
            Own your infrastructure.
          </h1>
          <p className="text-[0.9375rem] leading-6 text-[#6b7280] lg:text-[1rem] xl:text-[1.0625rem] xl:leading-7">
            Real-time visibility into power, cooling, UPS and environment
            systems — built for Vault Infrastructure&apos;s mission-critical
            infrastructure.
          </p>
        </div>

        <div className="flex max-w-none flex-col gap-4 lg:max-w-110 lg:gap-5 xl:max-w-140">
          {VALUE_PROPS.map((prop) => (
            <div key={prop.title} className="flex items-center gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/14 bg-[#e1eeff] lg:size-11">
                <img src={prop.icon} alt="" className="size-5 lg:size-5.5" />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-[0.9375rem] font-medium text-[#1c1c1c]">
                  {prop.title}
                </p>
                <p className="text-[0.8125rem] leading-4.5 text-[#6b7280]">
                  {prop.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <img src={iconShieldTrust} alt="" className="size-4" />
          <p className="text-[0.75rem] text-[#8ca1c2]">
            Secure access · Authorized personnel only
          </p>
        </div>
      </div>
    </div>
  )
}
