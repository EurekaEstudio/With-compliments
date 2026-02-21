import { useRef } from "react"
import { motion, useInView, Variants } from "framer-motion"
import { X, Check } from "lucide-react"
import { SectionWrapper } from "@/components/shared/SectionWrapper"
import { COPY } from "@/lib/constants"
import { PulseDivider } from "@/components/ui/svg-decorations"

export function ComparisonTable() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const rowVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  }

  return (
    <SectionWrapper id="comparacion">
      <PulseDivider className="mb-16 md:mb-24" />

      {/* Header */}
      <div className="max-w-3xl mb-16 md:mb-24 mx-auto text-center md:text-left">
        <h2 className="text-3xl md:text-5xl lg:text-5xl font-bold tracking-tight text-white mb-6">
          {COPY.comparisonTable.title}
        </h2>
        <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed max-w-2xl">
          {COPY.comparisonTable.subtitle}
        </p>
      </div>

      {/* Comparison Layout */}
      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative max-w-5xl mx-auto"
      >
        {/* Desktop Central Divider Line */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2" />

        {/* Column Headers (Desktop) */}
        <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center gap-8 mb-12">
          <div className="flex justify-end pr-4">
            <h3 className="text-lg font-medium text-white/30 uppercase tracking-widest text-right">
              Agencia Tradicional
            </h3>
          </div>
          <div className="w-32 opacity-0" aria-hidden="true" /> {/* Spacer for header alignment */}
          <div className="flex justify-start pl-4">
            <h3 className="text-lg font-bold text-primary uppercase tracking-widest flex items-center justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Ecosistema Eureka
            </h3>
          </div>
        </div>

        <div className="flex flex-col gap-10 md:gap-10">
          {COPY.comparisonTable.rows.map((row, i) => (
            <motion.div
              key={i}
              variants={rowVariants}
              className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-8 group"
            >
              {/* Central Badge (Mobile Order: 1, Desktop Order: Middle) */}
              <div className="flex items-center justify-center z-10 w-full md:w-32 row-start-1 md:col-start-2 md:row-auto">
                <div className="px-5 py-2 rounded-full bg-[#0a0a0a] border border-white/5 shadow-2xl backdrop-blur-xl group-hover:border-primary/30 transition-colors duration-500 text-center whitespace-nowrap">
                  <span className="text-xs md:text-sm font-semibold text-white/80 uppercase tracking-widest">
                    {row.feature}
                  </span>
                </div>
              </div>

              {/* Traditional Side (Left) */}
              <div className="w-full flex justify-center md:justify-end items-center opacity-70 group-hover:opacity-100 transition-opacity duration-500 md:col-start-1 md:row-start-1">
                <div className="flex items-center gap-4 bg-white/[0.02] border border-white/[0.05] group-hover:border-red-500/20 rounded-2xl p-5 md:p-6 w-full max-w-[340px] md:max-w-sm transition-all duration-500 group-hover:bg-red-500/[0.02]">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 group-hover:bg-red-500/10 flex-shrink-0 transition-colors duration-500">
                    <X className="w-4 h-4 text-white/40 group-hover:text-red-500 transition-colors duration-500" />
                  </div>
                  <span className="text-sm md:text-base text-white/50 group-hover:text-white/70 font-light transition-colors duration-500">
                    {row.traditional}
                  </span>
                </div>
              </div>

              {/* Eureka Side (Right) */}
              <div className="w-full flex justify-center md:justify-start items-center md:col-start-3 md:row-start-1">
                <div className="relative flex items-center gap-4 bg-primary/5 group-hover:bg-primary/10 border border-primary/20 group-hover:border-primary/40 rounded-2xl p-5 md:p-6 w-full max-w-[340px] md:max-w-sm transition-all duration-500 transform group-hover:-translate-y-1 shadow-[0_0_20px_rgba(0,0,0,0)] group-hover:shadow-[0_10_30px_rgba(var(--primary-rgb),0.15)] overflow-hidden">
                  {/* Subtle highlight gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />

                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 flex-shrink-0">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm md:text-base text-white font-medium relative z-10">
                    {row.eureka}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  )
}
