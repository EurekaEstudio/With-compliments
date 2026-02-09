declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
    fbq: (...args: unknown[]) => void
    gtag: (...args: unknown[]) => void
  }
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  // Google Tag Manager / GA4
  if (window.dataLayer) {
    window.dataLayer.push({ event: eventName, ...params })
  }

  // Meta Pixel
  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", eventName, params)
  }

  // Google Ads (via gtag)
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params)
  }
}

export const trackCTAClick = (location: string) =>
  trackEvent("cta_click", { location, cta_text: "Agendar diagnóstico" })

export const trackSectionView = (sectionId: string) =>
  trackEvent("section_view", { section_id: sectionId })

export const trackScrollDepth = (percentage: number) =>
  trackEvent("scroll_depth", { depth: percentage })

export const trackFormSubmit = () =>
  trackEvent("form_submit", { form: "agendar_diagnostico" })
