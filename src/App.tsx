import { lazy, Suspense, useEffect, useRef } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { COPY, BRAND } from "@/lib/constants"
import { trackScrollDepth } from "@/lib/tracking"
import { PillaresOverview } from "@/components/sections/PillaresOverview"
import { PilarInfraestructura } from "@/components/sections/PilarInfraestructura"
import { PilarInteligencia } from "@/components/sections/PilarInteligencia"
import { PilarTraccion } from "@/components/sections/PilarTraccion"
import { ComparisonTable } from "@/components/sections/ComparisonTable"
import { OfferPackaging } from "@/components/sections/OfferPackaging"
import { FinalCTA } from "@/components/sections/FinalCTA"

gsap.registerPlugin(ScrollTrigger)

// Lazy load the heavy 3D hero (~600KB three.js bundle)
const ExperienceHero = lazy(
  () => import("@/components/ui/experience-hero"),
)

// Minimal fallback while 3D loads — shows text immediately (LCP optimization)
function HeroFallback() {
  return (
    <section className="relative min-h-screen w-full bg-[#020202] flex items-center justify-center px-6">
      <div className="text-center max-w-4xl">
        <img
          src={BRAND.logo}
          alt={BRAND.fullName}
          className="h-8 w-auto brightness-0 invert mx-auto mb-10 opacity-60"
        />
        <h1 className="text-[clamp(2.2rem,6vw,5.5rem)] font-bold leading-[1.05] tracking-tight text-white">
          {COPY.hero.title}
        </h1>
        <p className="mt-6 text-sm md:text-base text-white/50 max-w-lg mx-auto leading-relaxed font-light">
          {COPY.hero.subtitle}
        </p>
      </div>
    </section>
  )
}

export default function App() {
  const scrollDepthsTracked = useRef(new Set<number>())

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    // Scroll depth tracking
    const thresholds = [25, 50, 75, 100]

    const onScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) return
      const progress = Math.round((window.scrollY / scrollHeight) * 100)

      for (const threshold of thresholds) {
        if (progress >= threshold && !scrollDepthsTracked.current.has(threshold)) {
          scrollDepthsTracked.current.add(threshold)
          trackScrollDepth(threshold)
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      lenis.destroy()
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <main className="relative w-full overflow-x-hidden">
        {/* HERO — Full viewport with 3D WebGL background */}
        <Suspense fallback={<HeroFallback />}>
          <ExperienceHero />
        </Suspense>

        {/* CONTENT SECTIONS */}
        <div className="relative z-10 bg-background">
          <PillaresOverview />
          <PilarInfraestructura />
          <PilarInteligencia />
          <PilarTraccion />
          <ComparisonTable />
          <OfferPackaging />
          <FinalCTA />
        </div>
      </main>
    </div>
  )
}
