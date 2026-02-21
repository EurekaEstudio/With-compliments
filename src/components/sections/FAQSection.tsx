import { SectionWrapper } from "@/components/shared/SectionWrapper"
import { COPY } from "@/lib/constants"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQSection() {
  const { badge, title, subtitle, items } = COPY.faq

  return (
    <SectionWrapper id="faq" className="pb-0">
      <div className="divider-gradient mb-16 md:mb-20" />

      <div className="grid gap-10 md:grid-cols-5 md:gap-16 mb-20 md:mb-28">
        {/* Left column — header */}
        <div className="md:col-span-2">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary border border-primary/30 rounded-full px-4 py-1.5 mb-6">
            {badge}
          </span>
          <h2 className="text-section-title text-white mb-4">{title}</h2>
          <p className="text-white/50 text-base leading-relaxed mb-8">
            {subtitle}
          </p>

          {/* Desktop: contact prompt */}
          <p className="text-white/35 text-sm hidden md:block leading-relaxed">
            ¿No encontrás tu respuesta?{" "}
            <a
              href="#agendar"
              className="text-primary font-medium hover:text-primary/80 transition-colors duration-200"
            >
              Hablemos directamente →
            </a>
          </p>
        </div>

        {/* Right column — accordion */}
        <div className="md:col-span-3">
          <Accordion type="single" collapsible className="w-full">
            {items.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-white/[0.08] last:border-b-0"
              >
                <AccordionTrigger className="text-white text-base font-semibold py-5 text-left hover:no-underline hover:text-primary transition-colors duration-200 [&[data-state=open]]:text-primary [&[data-state=open]>svg]:text-primary cursor-pointer">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-white/55 text-sm leading-relaxed pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Mobile: contact prompt */}
        <p className="text-white/35 text-sm md:hidden leading-relaxed col-span-full">
          ¿No encontrás tu respuesta?{" "}
          <a
            href="#agendar"
            className="text-primary font-medium hover:text-primary/80 transition-colors duration-200"
          >
            Hablemos directamente →
          </a>
        </p>
      </div>

    </SectionWrapper>
  )
}
