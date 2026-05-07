export type Locale = "en-US" | "pt-BR";

const defaultLocale = typeof navigator === "undefined" ? "pt-BR" : navigator.language.startsWith("en") ? "en-US" : "pt-BR";

const translations: Record<Locale, Record<string, string>> = {
  "en-US": {
    "services.subtitle": "Learn how our digital products help you gain speed, predictability and business control.",
    "services.heroAria": "Services hero section",
    "services.title": "Services",
    "services.heroPrimary": "Talk to our team",
    "services.heroSecondary": "See portfolio",
    "services.coreTitle": "Core Services",
    "services.coreDescription": "Solutions designed to improve your operation, speed up delivery and increase revenue.",
    "services.benefitsAria": "Benefits list",
    "positioning.sectionTitle": "Positioning & Growth",
    "positioning.sectionDescription": "Communication and content that strengthen your brand in the digital market.",
    "positioning.videoPlanning.title": "Video Planning",
    "positioning.videoPlanning.description": "Strategic video content planning for stronger market positioning.",
    "positioning.mobileVideo.title": "Mobile Video",
    "positioning.mobileVideo.description": "Short-form mobile-first videos built for social and modern audiences.",
    "positioning.socialDesign.title": "Social Media Design",
    "positioning.socialDesign.description": "Visual content and posts created to increase engagement and brand recognition.",
    "positioning.corporatePhoto.title": "Corporate Photography",
    "positioning.corporatePhoto.description": "Professional visual assets that elevate your brand credibility.",
    "positioning.productPhoto.title": "Product Photography",
    "positioning.productPhoto.description": "High-conversion product imagery for catalogs, e-commerce and campaigns.",
    "positioning.ctaTitle": "Ready to transform your digital presence?",
    "positioning.ctaDescription": "Let's build a product that works for your business goals.",
    "positioning.ctaButton": "Contact us",
  },
  "pt-BR": {
    "services.subtitle": "Descubra como nossos produtos digitais trazem velocidade, previsibilidade e controle para o seu negócio.",
    "services.heroAria": "Seção principal de serviços",
    "services.title": "Serviços",
    "services.heroPrimary": "Fale com nossa equipe",
    "services.heroSecondary": "Ver portfólio",
    "services.coreTitle": "Serviços Principais",
    "services.coreDescription": "Soluções pensadas para melhorar sua operação, acelerar entregas e aumentar receita.",
    "services.benefitsAria": "Lista de benefícios",
    "positioning.sectionTitle": "Posicionamento e Crescimento",
    "positioning.sectionDescription": "Comunicação e conteúdo que fortalecem sua marca no digital.",
    "positioning.videoPlanning.title": "Planejamento de Vídeo",
    "positioning.videoPlanning.description": "Planejamento estratégico de conteúdo em vídeo para posicionamento de mercado.",
    "positioning.mobileVideo.title": "Vídeo para Mobile",
    "positioning.mobileVideo.description": "Vídeos curtos e mobile-first criados para redes sociais e audiência moderna.",
    "positioning.socialDesign.title": "Design para Redes Sociais",
    "positioning.socialDesign.description": "Conteúdos visuais orientados a engajamento e reconhecimento de marca.",
    "positioning.corporatePhoto.title": "Fotografia Corporativa",
    "positioning.corporatePhoto.description": "Ativos visuais profissionais que elevam a credibilidade da sua marca.",
    "positioning.productPhoto.title": "Fotografia de Produto",
    "positioning.productPhoto.description": "Imagens de produto de alta conversão para catálogo, e-commerce e campanhas.",
    "positioning.ctaTitle": "Pronto para transformar sua presença digital?",
    "positioning.ctaDescription": "Vamos construir um produto que funcione para os seus objetivos de negócio.",
    "positioning.ctaButton": "Entre em contato",
  },
};

function getString(locale: Locale, key: string): string | undefined {
  return translations[locale]?.[key] ?? translations["pt-BR"]?.[key];
}

export function getLocale(): Locale {
  return defaultLocale;
}

export function t(key: string): string {
  return getString(getLocale(), key) ?? key;
}
