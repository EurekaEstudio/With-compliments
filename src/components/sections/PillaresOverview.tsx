import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Server, BrainCircuit, Rocket } from "lucide-react"
import { SectionWrapper } from "@/components/shared/SectionWrapper"
import { COPY } from "@/lib/constants"
import { PulseDivider, CircuitNodes } from "@/components/ui/svg-decorations"

const icons = [Server, BrainCircuit, Rocket]

export function PillaresOverview() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <SectionWrapper id="pilares">
      {/* Divider */}
      <PulseDivider className="mb-16 md:mb-24" />

      {/* Header */}
      <div className="max-w-3xl mb-12 md:mb-16 mx-auto text-center">
        <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary bg-primary/10 border border-primary/20 rounded-full px-5 py-2 mb-6">
          {COPY.pillaresOverview.badge}
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          {COPY.pillaresOverview.title}
        </h2>
        <p className="text-lg md:text-xl text-white/50 font-light max-w-2xl mx-auto">
          {COPY.pillaresOverview.subtitle}
        </p>
      </div>

      {/* Interactive Flex Accordion */}
      <div className="flex flex-col md:flex-row gap-4 h-[600px] md:h-[500px] w-full max-w-6xl mx-auto">
        {COPY.pillaresOverview.pilares.map((pilar, index) => {
          const isActive = activeTab === index
          const Icon = icons[index]

          return (
            <motion.div
              layout
              key={pilar.num}
              onClick={() => setActiveTab(index)}
              onHoverStart={() => setActiveTab(index)}
              initial={{ borderRadius: "1.5rem" }}
              animate={{
                flexBasis: isActive ? "60%" : "20%",
                borderRadius: "1.5rem",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className={`relative overflow-hidden cursor-pointer group flex flex-col justify-end p-6 border transition-colors duration-500 ${isActive
                  ? "border-primary/30 shadow-[0_0_30px_rgba(34,198,234,0.1)]"
                  : "border-white/5 hover:border-white/15 bg-white/[0.02]"
                }`}
            >
              {/* Animated Background */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-gradient-to-t from-primary/10 via-primary/5 to-transparent z-0"
                  />
                )}
              </AnimatePresence>

              {/* Huge Background Number */}
              <span className={`absolute -right-4 top-4 text-[12rem] md:text-[16rem] font-bold leading-none select-none pointer-events-none transition-all duration-700 ${isActive ? 'text-primary/[0.04]' : 'text-white/[0.02]'}`}>
                {pilar.num}
              </span>

              {/* Content Wrapper */}
              <div className="relative z-10 flex flex-col h-full justify-between">
                {/* Top Icon & Number Badge */}
                <div className="flex items-start justify-between">
                  <motion.div
                    layout="position"
                    className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-500 ${isActive ? "bg-primary/20 border-primary/40" : "bg-white/5 border-white/10"
                      }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-white/40"}`} />
                  </motion.div>
                </div>

                {/* Bottom Text Content */}
                <motion.div layout="position" className="mt-auto">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-500 ${isActive ? "text-primary" : "text-white/30"}`}>
                      Pilar {pilar.num}
                    </span>
                  </div>

                  <h3 className={`text-2xl md:text-3xl font-bold tracking-tight transition-all duration-500 ${isActive ? "text-white mb-4" : "text-white/60 mb-0 md:truncate"}`}>
                    {pilar.name}
                  </h3>

                  <div className={`overflow-hidden transition-all duration-500 origin-bottom ${isActive ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                    <p className="text-white/60 text-sm md:text-base leading-relaxed font-light md:w-5/6">
                      {pilar.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )
        })}
      </div>
      {/* Circuit nodes connecting to pilar sections */}
      <CircuitNodes className="mt-16 md:mt-24" />
    </SectionWrapper>
  )
}
