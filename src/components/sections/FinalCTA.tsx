import { useState, type FormEvent } from "react"
import { SectionWrapper } from "@/components/shared/SectionWrapper"
import { COPY, BRAND } from "@/lib/constants"
import { trackCTAClick, trackFormSubmit } from "@/lib/tracking"

export function FinalCTA() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    trackFormSubmit()
    trackCTAClick("final_cta_form")
    setSubmitted(true)
  }

  return (
    <SectionWrapper id="agendar" className="pb-16 md:pb-24">
      <div className="divider-gradient mb-16 md:mb-20" />

      {/* Main Copy */}
      <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
        <h2 className="text-section-title text-white leading-snug">
          {COPY.finalCta.title}
        </h2>
      </div>

      {/* Contact Form */}
      <div className="max-w-xl mx-auto mb-16">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="glass-strong rounded-2xl p-8 md:p-10 space-y-5">
            <div>
              <label htmlFor="nombre" className="block text-xs text-white/40 uppercase tracking-wider mb-2 font-medium">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                required
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 transition-all duration-300"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs text-white/40 uppercase tracking-wider mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 transition-all duration-300"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label htmlFor="telefono" className="block text-xs text-white/40 uppercase tracking-wider mb-2 font-medium">
                Teléfono / WhatsApp
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 transition-all duration-300"
                placeholder="+56 9 1234 5678"
              />
            </div>
            <div>
              <label htmlFor="mensaje" className="block text-xs text-white/40 uppercase tracking-wider mb-2 font-medium">
                Cuéntanos brevemente sobre tu negocio
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={3}
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 transition-all duration-300 resize-none"
                placeholder="Qué vendes, a quién, y cuál es tu mayor desafío..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground font-semibold text-base py-4 rounded-full hover:glow-cyan-strong hover:scale-[1.02] transition-all duration-500 mt-2"
            >
              {COPY.finalCta.cta}
            </button>
            <p className="text-center text-xs text-white/30 mt-3">
              {COPY.finalCta.subtext}
            </p>
          </form>
        ) : (
          <div className="glass-strong rounded-2xl p-10 md:p-14 text-center glow-cyan">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Recibido</h3>
            <p className="text-sm text-white/50">
              Nos pondremos en contacto contigo dentro de las próximas 24 horas para agendar tu diagnóstico.
            </p>
          </div>
        )}
      </div>

      {/* CHAT WIDGET: insertar script del agente IA aquí */}

      {/* Footer */}
      <footer className="text-center pt-10 border-t border-white/5">
        <img
          src={BRAND.logo}
          alt={BRAND.fullName}
          className="h-6 w-auto brightness-0 invert mx-auto mb-4 opacity-40"
        />
        <p className="text-xs text-white/20">
          &copy; {new Date().getFullYear()} {BRAND.fullName}. Todos los derechos reservados.
        </p>
      </footer>
    </SectionWrapper>
  )
}
