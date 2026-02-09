export const BRAND = {
  name: "Eureka",
  fullName: "Eureka Estudio Creativo",
  logo: "/eureka-logo.png",
  website: "https://eurekaestudiocreativo.com",
  ctaUrl: "#agendar",
} as const

export const COPY = {
  hero: {
    title: "No vendemos servicios. Construimos sistemas que venden.",
    subtitle:
      "Landing page + IA + tráfico pagado = un ecosistema que filtra, convierte y escala. Sin piezas sueltas.",
    cta: "Agendar diagnóstico",
  },

  pillaresOverview: {
    badge: "Metodología",
    title: "Nuestros 3 Pilares de Crecimiento",
    subtitle:
      "El sistema solo funciona cuando los 3 están activos. Quita una pieza y deja de generar resultados.",
    pilares: [
      {
        num: "01",
        name: "Infraestructura",
        description:
          "Landing pages diseñadas para convertir, no para decorar. Tu vendedor digital 24/7.",
      },
      {
        num: "02",
        name: "Inteligencia",
        description:
          "Agentes de IA que califican leads antes de que tu equipo humano invierta un segundo.",
      },
      {
        num: "03",
        name: "Tracción",
        description:
          "Tráfico de alta intención que atrae personas listas para comprar, no curiosos.",
      },
    ],
  },

  pilar1: {
    badge: "Pilar 1 — Infraestructura",
    title: "Smart Landing Pages",
    subtitle:
      "No vendemos diseño web. Vendemos un vendedor digital que trabaja las 24 horas sin descanso.",
    oldWay: {
      title: "Así trabaja una agencia tradicional",
      items: [
        "Template de WordPress personalizado",
        "Formulario genérico de contacto",
        "Diseño bonito pero sin estrategia de conversión",
        "Sin tracking real de comportamiento",
      ],
    },
    eurekaWay: {
      title: "Así lo hace Eureka",
      items: [
        "Landing construida para un solo objetivo: convertir",
        "Copy persuasivo basado en puntos de dolor reales",
        "Micro-interacciones que guían al usuario al CTA",
        "Tracking completo: scroll depth, clicks, heatmaps",
      ],
    },
    deliverables: [
      "Above the fold de alto impacto psicológico",
      "Arquitectura anti-fricción",
      "Optimización extrema de velocidad móvil",
      "Copywriting de respuesta directa",
      "Integración con CRM / WhatsApp",
      "Página de gracias con siguiente paso claro",
    ],
    stat: {
      value: "90%",
      label:
        "del tráfico hoy es móvil. Si tu web no está pensada para el pulgar, estás perdiendo dinero.",
    },
  },

  pilar2: {
    badge: "Pilar 2 — Inteligencia",
    title: "Agentes de IA & Automatización",
    subtitle:
      "No vendemos chatbots. Vendemos tiempo y cualificación. Tu equipo solo habla con quien está listo para pagar.",
    filterQuestions: [
      "¿Cuál es tu presupuesto aproximado para este proyecto?",
      "¿Cuándo necesitas comenzar con el servicio?",
      "¿Cuántos empleados tiene tu empresa actualmente?",
      "¿Cuál es tu principal desafío de crecimiento ahora mismo?",
    ],
    automationFeatures: [
      {
        title: "Calificación 24/7",
        description: "IA que filtra leads mientras tu equipo descansa",
      },
      {
        title: "Respuesta inmediata",
        description: "Menos de 30 segundos en responder cualquier consulta",
      },
      {
        title: "Seguimiento inteligente",
        description: "Recuperación automática de leads que no completaron el proceso",
      },
      {
        title: "Integración CRM",
        description: "Sincronización automática con tu sistema de gestión",
      },
      {
        title: "Agenda automatizada",
        description: "Reserva de citas directamente desde la conversación",
      },
      {
        title: "Derivación humana",
        description: "Solo cuando el lead está listo para cerrar",
      },
    ],
    caseStudy: {
      client: "Clínica Yany",
      quote:
        "Nuestra IA permitió que el equipo humano solo se enfocara en cerrar al 30% de pacientes realmente calificados.",
      description:
        "El agente de IA filtró el 70% de consultas no calificadas, permitiendo que el equipo comercial se concentrara exclusivamente en oportunidades reales de cierre.",
    },
  },

  pilar3: {
    badge: "Pilar 3 — Tracción",
    title: "Tráfico de Alta Intención",
    subtitle:
      "No vendemos clicks. Vendemos oportunidades reales de venta. Cada peso invertido tiene un propósito.",
    segments: [
      {
        title: "Segmentación por intención transaccional",
        description:
          "Google Ads para personas que buscan activamente tu servicio. Intención de compra real, no curiosos navegando.",
      },
      {
        title: "Creativos que filtran desde el anuncio",
        description:
          "Meta Ads diseñados para atraer solo al perfil correcto y repeler al que no califica. Menos leads, más ventas.",
      },
      {
        title: "Remarketing omnicanal",
        description:
          "Seguimos a tus visitantes en Google, Instagram, Facebook y YouTube hasta que conviertan o descarten.",
      },
      {
        title: "Reportes de negocio reales",
        description:
          "No reportamos impresiones ni likes. Reportamos Costo por Cita Agendada, costo por lead calificado y ROAS.",
      },
    ],
    stat: {
      value: "$500 CLP",
      label:
        "Reducimos el costo por conversación optimizando a quién ve el anuncio, no solo el anuncio.",
    },
  },

  comparisonTable: {
    title: "¿Por qué un ecosistema y no una agencia?",
    subtitle:
      "La diferencia entre contratar servicios sueltos y construir un sistema integrado que trabaja por ti.",
    rows: [
      {
        feature: "Sitio web",
        traditional: "Web estática que nadie visita",
        eureka: "Vendedor digital activo 24/7",
      },
      {
        feature: "Respuesta al lead",
        traditional: "Horas o días en responder",
        eureka: "Respuesta inmediata con IA",
      },
      {
        feature: "Calidad de leads",
        traditional: "Leads mezclados sin filtrar",
        eureka: "Leads 100% filtrados y calificados",
      },
      {
        feature: "Proceso de venta",
        traditional: "Perseguir clientes manualmente",
        eureka: "Cerrar ventas con leads listos",
      },
      {
        feature: "Tráfico",
        traditional: "Métricas de vanidad (likes, clicks)",
        eureka: "Intención de compra real",
      },
      {
        feature: "Seguimiento",
        traditional: "Manual por Excel o WhatsApp",
        eureka: "Automatizado y omnicanal",
      },
      {
        feature: "Reportes",
        traditional: "Impresiones y alcance",
        eureka: "Costo por cita y ROAS real",
      },
    ],
  },

  offer: {
    badge: "Tu sistema completo",
    title: "Sistema de Adquisición Eureka",
    productName: "Launchpad",
    subtitle:
      "Todo lo que necesitas para dejar de perseguir clientes y empezar a cerrar ventas.",
    setup: {
      title: "Setup Inicial",
      label: "Pago único",
      description: "Configuración completa del ecosistema",
      includes: [
        "Landing page premium personalizada",
        "Configuración de agente IA inteligente",
        "Setup de campañas de tráfico",
        "Integración con CRM / WhatsApp",
        "Tracking y analytics completo",
        "Copywriting estratégico incluido",
      ],
    },
    monthly: {
      title: "Fee Mensual",
      label: "Recurrente",
      description: "Operación, optimización y soporte continuo",
      includes: [
        "Gestión activa de campañas de tráfico",
        "Optimización continua de landing y ads",
        "Monitoreo y mejora del agente IA",
        "Reportes semanales de rendimiento",
        "Soporte prioritario directo",
      ],
    },
    note: "No vendemos servicios individuales. El ecosistema funciona completo o no funciona. Cada pieza potencia a la otra.",
  },

  finalCta: {
    title:
      "Si quieres dejar de perseguir clientes y empezar a cerrar ventas, conversemos.",
    cta: "Agendar diagnóstico gratuito",
    subtext:
      "Sin compromiso. 30 minutos. Te mostramos exactamente cómo aplicaría en tu negocio.",
  },
} as const
