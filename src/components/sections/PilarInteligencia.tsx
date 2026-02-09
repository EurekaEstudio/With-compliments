import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Bot, Clock, MailCheck, Database, CalendarCheck, UserCheck } from "lucide-react"
import { SectionWrapper } from "@/components/shared/SectionWrapper"
import { COPY } from "@/lib/constants"

gsap.registerPlugin(ScrollTrigger)

const featureIcons = [Bot, Clock, MailCheck, Database, CalendarCheck, UserCheck]

export function PilarInteligencia() {
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chatRef.current) return

    const bubbles = chatRef.current.querySelectorAll(".chat-bubble")
    gsap.fromTo(
      bubbles,
      { y: 20, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: chatRef.current,
          start: "top 80%",
          once: true,
        },
      },
    )

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === chatRef.current)
        .forEach((t) => t.kill())
    }
  }, [])

  return (
    <SectionWrapper id="inteligencia">
      {/* Header */}
      <div className="max-w-3xl mb-16 md:mb-20">
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary border border-primary/30 rounded-full px-4 py-1.5 mb-6">
          {COPY.pilar2.badge}
        </span>
        <h2 className="text-section-title text-white mb-5">
          {COPY.pilar2.title}
        </h2>
        <p className="text-section-subtitle text-white/50">
          {COPY.pilar2.subtitle}
        </p>
      </div>

      {/* Chat Simulation + Features Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 mb-16 md:mb-20">
        {/* Chat Bubbles - Simulated AI conversation */}
        <div ref={chatRef} className="lg:col-span-2 flex flex-col gap-3">
          <p className="text-xs text-white/30 uppercase tracking-widest mb-4 font-medium">
            Preguntas que tu IA hace automáticamente
          </p>
          {COPY.pilar2.filterQuestions.map((question, i) => (
            <div
              key={i}
              className="chat-bubble glass rounded-2xl rounded-bl-sm p-4 md:p-5 max-w-sm"
            >
              <p className="text-sm text-white/70 leading-relaxed">{question}</p>
            </div>
          ))}
          <div className="chat-bubble flex items-center gap-2 mt-2 ml-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-white/30">
              Solo los leads calificados llegan a tu equipo
            </span>
          </div>
        </div>

        {/* Automation Features */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {COPY.pilar2.automationFeatures.map((feature, i) => {
            const Icon = featureIcons[i]
            return (
              <div
                key={i}
                className="glass rounded-xl p-6 hover:glass-strong transition-all duration-500 group"
              >
                <Icon className="w-6 h-6 text-primary mb-4 group-hover:scale-110 transition-transform duration-500" />
                <h4 className="text-sm font-semibold text-white mb-1.5">
                  {feature.title}
                </h4>
                <p className="text-xs text-white/40 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Case Study */}
      <div className="glass-strong rounded-3xl p-10 md:p-14 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/[0.03] to-transparent pointer-events-none" />
        <div className="relative z-10">
          <span className="text-xs text-primary uppercase tracking-widest font-medium block mb-6">
            Caso real
          </span>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="flex-shrink-0">
              <p className="text-xs text-white/30 uppercase tracking-wider mb-1">
                {COPY.pilar2.caseStudy.client}
              </p>
            </div>
            <div className="flex-1">
              <blockquote className="text-base md:text-lg text-white/80 leading-relaxed font-light italic">
                &ldquo;{COPY.pilar2.caseStudy.quote}&rdquo;
              </blockquote>
              <p className="text-sm text-white/40 mt-4 leading-relaxed">
                {COPY.pilar2.caseStudy.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
