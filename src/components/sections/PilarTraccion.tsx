import { useRef } from "react"
import { motion } from "framer-motion"
import { Target, Filter, RefreshCw, BarChart3 } from "lucide-react"
import { SectionWrapper } from "@/components/shared/SectionWrapper"
import { COPY } from "@/lib/constants"

const segmentIcons = [Target, Filter, RefreshCw, BarChart3]

export function PilarTraccion() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <SectionWrapper id="traccion">
      <div
        ref={containerRef}
        className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative items-start"
      >
        {/* Left Column: Sticky Header & Stat */}
        <div className="w-full lg:w-5/12 lg:sticky lg:top-32 flex flex-col gap-10">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary bg-primary/10 border border-primary/20 rounded-full px-5 py-2 mb-6">
              {COPY.pilar3.badge}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              {COPY.pilar3.title}
            </h2>
            <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed max-w-lg mb-10">
              {COPY.pilar3.subtitle}
            </p>
          </div>

          {/* Stat Highlight inside Sticky */}
          <div className="glass-strong rounded-3xl p-8 lg:p-10 border-primary/20 glow-cyan flex flex-col gap-6">
            <span className="text-[clamp(3rem,6vw,4.5rem)] font-bold text-gradient-cyan leading-none tracking-tighter">
              {COPY.pilar3.stat.value}
            </span>
            <p className="text-sm md:text-base text-white/60 leading-relaxed font-light">
              {COPY.pilar3.stat.label}
            </p>
          </div>
        </div>

        {/* Right Column: Vertical Stepper / Timeline */}
        <div className="w-full lg:w-7/12 relative mt-10 lg:mt-0">
          {/* Vertical Track Line */}
          <div className="absolute left-6 md:left-8 top-4 bottom-12 w-px bg-white/10" />

          <div className="flex flex-col gap-24 md:gap-32 w-full pb-16">
            {COPY.pilar3.segments.map((segment, i) => {
              const Icon = segmentIcons[i]

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0.3 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false, margin: "-20% 0px -40% 0px" }}
                  transition={{ duration: 0.5 }}
                  className="relative pl-20 md:pl-28 flex flex-col group"
                >
                  {/* Glowing Node on the line */}
                  <motion.div
                    className="absolute left-[20px] md:left-[28px] top-2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border-[3px] border-white/20 transition-all duration-500 z-10"
                    whileInView={{ backgroundColor: "#22c6ea", borderColor: "#22c6ea", scale: 1.5, boxShadow: "0 0 20px rgba(34, 198, 234, 0.5)" }}
                    viewport={{ once: false, margin: "-20% 0px -40% 0px" }}
                  />

                  {/* Icon & Number Badge */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center -ml-2">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-white/20 font-bold text-xl md:text-2xl font-mono">
                      0{i + 1}
                    </span>
                  </div>

                  {/* Text Content */}
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight text-white mb-4">
                    {segment.title}
                  </h3>
                  <p className="text-base md:text-lg text-white/50 leading-relaxed font-light max-w-xl">
                    {segment.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
