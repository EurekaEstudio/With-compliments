import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { X, Check } from "lucide-react"
import { SectionWrapper } from "@/components/shared/SectionWrapper"
import { COPY } from "@/lib/constants"

gsap.registerPlugin(ScrollTrigger)

export function ComparisonTable() {
  const tableRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!tableRef.current) return

    const rows = tableRef.current.querySelectorAll(".table-row")
    gsap.fromTo(
      rows,
      { x: -20, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: tableRef.current,
          start: "top 80%",
          once: true,
        },
      },
    )

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === tableRef.current)
        .forEach((t) => t.kill())
    }
  }, [])

  return (
    <SectionWrapper id="comparacion">
      <div className="divider-gradient mb-16 md:mb-20" />

      {/* Header */}
      <div className="max-w-3xl mb-16 md:mb-20">
        <h2 className="text-section-title text-white mb-5">
          {COPY.comparisonTable.title}
        </h2>
        <p className="text-section-subtitle text-white/50">
          {COPY.comparisonTable.subtitle}
        </p>
      </div>

      {/* Desktop Table */}
      <div ref={tableRef} className="hidden md:block glass rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left p-6 text-sm font-medium text-white/40 uppercase tracking-wider w-1/4">
                Aspecto
              </th>
              <th className="text-left p-6 text-sm font-medium text-white/30 uppercase tracking-wider w-[37.5%]">
                Agencia Tradicional
              </th>
              <th className="text-left p-6 text-sm font-semibold text-primary uppercase tracking-wider w-[37.5%] bg-primary/[0.05]">
                Ecosistema Eureka
              </th>
            </tr>
          </thead>
          <tbody>
            {COPY.comparisonTable.rows.map((row, i) => (
              <tr
                key={i}
                className="table-row border-b border-white/[0.03] last:border-b-0 hover:bg-white/[0.01] transition-colors duration-300"
              >
                <td className="p-6 text-sm font-medium text-white/80">
                  {row.feature}
                </td>
                <td className="p-6">
                  <div className="flex items-start gap-3">
                    <X className="w-4 h-4 text-red-500/50 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-white/35">{row.traditional}</span>
                  </div>
                </td>
                <td className="p-6 bg-primary/[0.03]">
                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-white/80 font-medium">{row.eureka}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: Stacked Cards */}
      <div className="md:hidden flex flex-col gap-4">
        {COPY.comparisonTable.rows.map((row, i) => (
          <div key={i} className="table-row glass rounded-xl p-6">
            <h4 className="text-sm font-semibold text-white mb-4">{row.feature}</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <X className="w-4 h-4 text-red-500/50 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-white/35">{row.traditional}</span>
              </div>
              <div className="flex items-start gap-3 bg-primary/[0.05] rounded-lg p-3 -mx-1">
                <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-xs text-white/80 font-medium">{row.eureka}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
