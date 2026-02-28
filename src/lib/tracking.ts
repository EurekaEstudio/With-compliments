declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  // Google Tag Manager (GTM) es el centro de distribución.
  // Al enviar eventos solo a dataLayer, evitamos duplicidad si GTM 
  // ya está configurado para reenviar a Meta Pixel o Google Ads.
  if (window.dataLayer) {
    window.dataLayer.push({ event: eventName, ...params })
  }
}

export const trackCTAClick = (location: string) =>
  trackEvent("cta_click", { location })

export const trackSectionView = (sectionId: string) =>
  trackEvent("section_view", { section_id: sectionId })

export const trackScrollDepth = (percentage: number) =>
  trackEvent("scroll_depth", { depth: percentage })

export const trackChatOpen = (source: string) =>
  trackEvent("chat_open", { source })
