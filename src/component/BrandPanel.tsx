import stripes from '../assets/stripes.svg'
import nmsLogo from '../assets/nms_logo.svg'
import ellipse1 from '../assets/login/ellipse-1.svg'
import ellipse2 from '../assets/login/ellipse-2.svg'
import iconShieldTrust from '../assets/login/icon-shield-trust.svg'
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
    <div className="relative min-w-0 flex-3 overflow-hidden bg-[#f3f3f3]">
      <img
        src={ellipse1}
        alt=""
        className="pointer-events-none absolute -right-24 -top-24 size-140"
      />
      <img
        src={ellipse2}
        alt=""
        className="pointer-events-none absolute -bottom-16 -left-32 size-155"
      />
      <img
        src={stripes}
        alt=""
        className="pointer-events-none absolute inset-0 size-full object-cover"
      />

      <div className="relative flex h-full flex-col justify-center gap-12 px-16 py-16">
        <img src={nmsLogo} alt="NMS" className="h-28 w-auto" />

        <div className="flex max-w-155 flex-col gap-5">
          <h1 className="text-[2.75rem] font-semibold leading-13.5 text-[#1c1c1c]">
            Protect your uptime.
            <br />
            Own your infrastructure.
          </h1>
          <p className="text-[1.0625rem] leading-7 text-[#6b7280]">
            Real-time visibility into power, cooling, UPS and environment
            systems — built for Vault Infrastructure&apos;s mission-critical
            infrastructure.
          </p>
        </div>

        <div className="flex max-w-140 flex-col gap-5">
          {VALUE_PROPS.map((prop) => (
            <div key={prop.title} className="flex items-center gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/14 bg-[#e1eeff]">
                <img src={prop.icon} alt="" className="size-5.5" />
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
