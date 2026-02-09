import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Target, Filter, RefreshCw, BarChart3 } from "lucide-react"
import { SectionWrapper } from "@/components/shared/SectionWrapper"
import { COPY } from "@/lib/constants"

gsap.registerPlugin(ScrollTrigger)

const segmentIcons = [Target, Filter, RefreshCw, BarChart3]

export function PilarTraccion() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gridRef.current) return

    const cards = gridRef.current.querySelectorAll(".segment-card")
    gsap.fromTo(
      cards,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          once: true,
        },
      },
    )

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === gridRef.current)
        .forEach((t) => t.kill())
    }
  }, [])

  return (
    <SectionWrapper id="traccion">
      {/* Header */}
      <div className="max-w-3xl mb-16 md:mb-20">
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary border border-primary/30 rounded-full px-4 py-1.5 mb-6">
          {COPY.pilar3.badge}
        </span>
        <h2 className="text-section-title text-white mb-5">
          {COPY.pilar3.title}
        </h2>
        <p className="text-section-subtitle text-white/50">
          {COPY.pilar3.subtitle}
        </p>
      </div>

      {/* Segments Grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16 md:mb-20">
        {COPY.pilar3.segments.map((segment, i) => {
          const Icon = segmentIcons[i]
          const hasAccent = i % 2 === 0
          return (
            <div
              key={i}
              className={`segment-card glass rounded-2xl p-8 md:p-10 group hover:glass-strong transition-all duration-500 relative ${
                hasAccent ? "border-l-2 border-l-primary/40" : ""
              }`}
            >
              <Icon className="w-7 h-7 text-primary mb-5 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-lg font-semibold text-white mb-3 tracking-tight">
                {segment.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">
                {segment.description}
              </p>
            </div>
          )
        })}
      </div>

      {/* Stat */}
      <div className="glass-strong rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center gap-8 glow-cyan">
        <span className="text-[clamp(2rem,6vw,4rem)] font-bold text-gradient-cyan leading-none flex-shrink-0 whitespace-nowrap">
          {COPY.pilar3.stat.value}
        </span>
        <p className="text-base md:text-lg text-white/60 leading-relaxed font-light">
          {COPY.pilar3.stat.label}
        </p>
      </div>
    </SectionWrapper>
  )
}
