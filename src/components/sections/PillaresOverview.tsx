import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SectionWrapper } from "@/components/shared/SectionWrapper"
import { COPY } from "@/lib/constants"

gsap.registerPlugin(ScrollTrigger)

export function PillaresOverview() {
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardsRef.current) return

    const cards = cardsRef.current.querySelectorAll(".pilar-card")
    gsap.fromTo(
      cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          once: true,
        },
      },
    )

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === cardsRef.current)
        .forEach((t) => t.kill())
    }
  }, [])

  return (
    <SectionWrapper id="pilares">
      {/* Divider */}
      <div className="divider-gradient mb-16 md:mb-20" />

      {/* Header */}
      <div className="max-w-3xl mb-16 md:mb-20">
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary border border-primary/30 rounded-full px-4 py-1.5 mb-6">
          {COPY.pillaresOverview.badge}
        </span>
        <h2 className="text-section-title text-white mb-5">
          {COPY.pillaresOverview.title}
        </h2>
        <p className="text-section-subtitle text-white/50">
          {COPY.pillaresOverview.subtitle}
        </p>
      </div>

      {/* Pilar Cards */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {COPY.pillaresOverview.pilares.map((pilar) => (
          <div
            key={pilar.num}
            className="pilar-card glass rounded-2xl p-8 md:p-10 group hover:glow-cyan transition-all duration-700 relative overflow-hidden"
          >
            {/* Large decorative number */}
            <span className="absolute -top-4 -right-2 text-[7rem] font-bold text-white/[0.03] leading-none select-none pointer-events-none">
              {pilar.num}
            </span>

            <span className="text-primary text-sm font-semibold tracking-wider uppercase block mb-4">
              {pilar.num}
            </span>
            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
              {pilar.name}
            </h3>
            <p className="text-sm text-white/50 leading-relaxed">
              {pilar.description}
            </p>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
