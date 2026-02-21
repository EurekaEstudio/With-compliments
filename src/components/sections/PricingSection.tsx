import { SectionWrapper } from "@/components/shared/SectionWrapper"
import { COPY } from "@/lib/constants"
import { Pricing } from "@/components/ui/pricing"
import { PulseDivider } from "@/components/ui/svg-decorations"

export function PricingSection() {
  return (
    <SectionWrapper id="precios">
      <PulseDivider className="mb-16 md:mb-20" />
      <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary border border-primary/30 rounded-full px-4 py-1.5 mb-10 md:mb-14">
        {COPY.pricing.badge}
      </span>
      <Pricing
        plans={COPY.pricing.plans}
        title={COPY.pricing.title}
        subtitle={COPY.pricing.subtitle}
      />
    </SectionWrapper>
  )
}
