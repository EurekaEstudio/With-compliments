import { Check, Zap, RefreshCw } from "lucide-react"
import { SectionWrapper } from "@/components/shared/SectionWrapper"
import { COPY, BRAND } from "@/lib/constants"
import { trackCTAClick } from "@/lib/tracking"

export function OfferPackaging() {
  return (
    <SectionWrapper id="oferta">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary border border-primary/30 rounded-full px-4 py-1.5 mb-6">
          {COPY.offer.badge}
        </span>
        <h2 className="text-section-title text-white mb-3">
          {COPY.offer.title}
        </h2>
        <p className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-gradient-cyan mb-5">
          {COPY.offer.productName}
        </p>
        <p className="text-section-subtitle text-white/50">
          {COPY.offer.subtitle}
        </p>
      </div>

      {/* Two Columns: Setup + Monthly */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
        {/* Setup Inicial */}
        <div className="glass rounded-2xl p-8 md:p-10 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{COPY.offer.setup.title}</h3>
              <span className="text-xs text-primary font-medium uppercase tracking-wider">
                {COPY.offer.setup.label}
              </span>
            </div>
          </div>
          <p className="text-sm text-white/50 mb-8">{COPY.offer.setup.description}</p>
          <ul className="space-y-3 flex-1">
            {COPY.offer.setup.includes.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/70">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Fee Mensual */}
        <div className="glass-strong rounded-2xl p-8 md:p-10 flex flex-col glow-cyan relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/[0.04] to-transparent pointer-events-none" />
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{COPY.offer.monthly.title}</h3>
                <span className="text-xs text-primary font-medium uppercase tracking-wider">
                  {COPY.offer.monthly.label}
                </span>
              </div>
            </div>
            <p className="text-sm text-white/50 mb-8">{COPY.offer.monthly.description}</p>
            <ul className="space-y-3 flex-1">
              {COPY.offer.monthly.includes.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-white/70">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Note */}
      <p className="text-center text-sm text-white/40 italic max-w-2xl mx-auto mb-12">
        {COPY.offer.note}
      </p>

      {/* CTA */}
      <div className="text-center">
        <a
          href={BRAND.ctaUrl}
          onClick={() => trackCTAClick("oferta")}
          className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-semibold text-base px-10 py-4 rounded-full hover:glow-cyan-strong hover:scale-105 transition-all duration-500"
        >
          <span>{COPY.hero.cta}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M17 7H8M17 7V16" />
          </svg>
        </a>
      </div>
    </SectionWrapper>
  )
}
