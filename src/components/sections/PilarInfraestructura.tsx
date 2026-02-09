import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { X, Check, Smartphone } from "lucide-react"
import { SectionWrapper } from "@/components/shared/SectionWrapper"
import { COPY } from "@/lib/constants"

gsap.registerPlugin(ScrollTrigger)

export function PilarInfraestructura() {
  const comparisonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!comparisonRef.current) return

    const items = comparisonRef.current.querySelectorAll(".comparison-item")
    gsap.fromTo(
      items,
      { x: -30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: comparisonRef.current,
          start: "top 80%",
          once: true,
        },
      },
    )

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === comparisonRef.current)
        .forEach((t) => t.kill())
    }
  }, [])

  return (
    <SectionWrapper id="infraestructura">
      {/* Header */}
      <div className="max-w-3xl mb-16 md:mb-20">
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary border border-primary/30 rounded-full px-4 py-1.5 mb-6">
          {COPY.pilar1.badge}
        </span>
        <h2 className="text-section-title text-white mb-5">
          {COPY.pilar1.title}
        </h2>
        <p className="text-section-subtitle text-white/50">
          {COPY.pilar1.subtitle}
        </p>
      </div>

      {/* Old Way vs Eureka Way */}
      <div ref={comparisonRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-16 md:mb-20">
        {/* Old Way */}
        <div className="glass rounded-2xl p-8 md:p-10 border-white/5">
          <h3 className="text-lg font-semibold text-white/40 mb-6 uppercase tracking-wider text-sm">
            {COPY.pilar1.oldWay.title}
          </h3>
          <ul className="space-y-4">
            {COPY.pilar1.oldWay.items.map((item, i) => (
              <li key={i} className="comparison-item flex items-start gap-3">
                <X className="w-5 h-5 text-red-500/60 mt-0.5 flex-shrink-0" />
                <span className="text-white/40 text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Eureka Way */}
        <div className="glass-strong rounded-2xl p-8 md:p-10 border-primary/20 glow-cyan">
          <h3 className="text-lg font-semibold text-primary mb-6 uppercase tracking-wider text-sm">
            {COPY.pilar1.eurekaWay.title}
          </h3>
          <ul className="space-y-4">
            {COPY.pilar1.eurekaWay.items.map((item, i) => (
              <li key={i} className="comparison-item flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Deliverables */}
      <div className="mb-16 md:mb-20">
        <h3 className="text-xl font-semibold text-white mb-8 tracking-tight">
          Qué incluye tu landing
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {COPY.pilar1.deliverables.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl hover:bg-white/[0.02] transition-colors duration-300">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="text-sm text-white/70 leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stat Highlight */}
      <div className="glass-strong rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center gap-8 glow-cyan">
        <div className="flex items-center gap-4 flex-shrink-0">
          <Smartphone className="w-10 h-10 text-primary" />
          <span className="text-[clamp(3rem,8vw,6rem)] font-bold text-gradient-cyan leading-none">
            {COPY.pilar1.stat.value}
          </span>
        </div>
        <p className="text-base md:text-lg text-white/60 leading-relaxed font-light">
          {COPY.pilar1.stat.label}
        </p>
      </div>
    </SectionWrapper>
  )
}
