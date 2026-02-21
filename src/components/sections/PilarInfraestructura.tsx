import { useRef } from "react"
import { Bot, Zap } from "lucide-react"
import { SectionWrapper } from "@/components/shared/SectionWrapper"
import { COPY } from "@/lib/constants"

export function PilarInfraestructura() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <SectionWrapper id="infraestructura">
      {/* Container for Sticky Layout */}
      <div
        ref={containerRef}
        className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative items-start"
      >
        {/* Left Column: Sticky Header & Stat */}
        <div className="w-full lg:w-5/12 lg:sticky lg:top-32 flex flex-col gap-10">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary bg-primary/10 border border-primary/20 rounded-full px-5 py-2 mb-6">
              {COPY.pilar1.badge}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              {COPY.pilar1.title}
            </h2>
            <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed max-w-lg">
              {COPY.pilar1.subtitle}
            </p>
          </div>

          {/* Stat Highlight inside Sticky */}
          <div id="pilar-agente-stat" className="glass-strong rounded-3xl p-8 lg:p-10 border-primary/20 glow-cyan flex flex-col gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <span className="text-4xl md:text-5xl font-bold text-gradient-cyan leading-none tracking-tighter">
              {COPY.pilar1.stat.value}
            </span>
            <p className="text-sm text-white/60 leading-relaxed font-light">
              {COPY.pilar1.stat.label}
            </p>
          </div>
        </div>

        {/* Right Column: Stacked Scrolling Cards */}
        <div className="w-full lg:w-7/12 flex flex-col relative pb-32">
          {/* We create fake height to allow scrolling space for stacking */}
          <div className="flex flex-col gap-6 w-full mt-10 md:mt-0">
            {COPY.pilar1.deliverables.map((item, index) => {
              // Calculate top offset for stacking effect
              const baseTop = 140 // pixels from top of viewport when sticky
              const step = 20 // pixels offset per card
              const topOffset = `${baseTop + index * step}px`

              const isLast = index === COPY.pilar1.deliverables.length - 1

              return (
                <div
                  key={index}
                  className="sticky w-full rounded-[2rem] p-8 md:p-12 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] border transition-all duration-300 transform-gpu"
                  style={{
                    top: topOffset,
                    backgroundColor: `rgb(${10 + index * 4}, ${10 + index * 4}, ${15 + index * 3})`, // Slight color progression
                    borderColor: isLast ? "rgba(34, 198, 234, 0.3)" : "rgba(255,255,255,0.05)",
                    zIndex: 10 + index,
                  }}
                >
                  <div className="flex flex-col gap-6 justify-between h-full min-h-[160px]">
                    <div className="flex justify-between items-start">
                      <span className="text-white/20 font-bold text-4xl md:text-5xl font-mono">
                        0{index + 1}
                      </span>
                      {isLast && (
                        <div className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 flex items-center gap-2">
                          <Zap className="w-4 h-4 text-primary fill-primary" />
                          <span className="text-xs font-bold text-primary uppercase tracking-widest">
                            El Cierre
                          </span>
                        </div>
                      )}
                    </div>

                    <h3 className={`text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight ${isLast ? "text-primary brightness-125" : "text-white/90"}`}>
                      {item}
                    </h3>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
