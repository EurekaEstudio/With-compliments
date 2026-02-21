import { COPY } from "@/lib/constants"
import ImageGallery from "@/components/ui/image-gallery"
import { FloatingGeometrics } from "@/components/ui/svg-decorations"

export function VisualShowcase() {
    const { badge, title, subtitle } = COPY.visualShowcase

    return (
        <section
            id="galeria"
            className="relative py-24 md:py-32 overflow-hidden bg-background"
        >
            {/* Decorative background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
            <FloatingGeometrics />

            <div className="relative z-10 container mx-auto">
                {/* Header */}
                <div className="text-center mb-12 px-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
                        <span className="text-xs md:text-sm font-medium text-primary uppercase tracking-wider">
                            {badge}
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                        {title}
                    </h2>
                    <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
                        {subtitle}
                    </p>
                </div>

                {/* Gallery Component */}
                <ImageGallery />
            </div>

            {/* Bottom Divider */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </section>
    )
}
