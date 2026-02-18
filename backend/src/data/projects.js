// Sistema de mapeamento interno para URLs reais (não exposto no frontend)
const urlMapping = {
  eletrostart: "eletrostart1.netlify.app",
  lapec: "lapecexameslaboratoriais.netlify.app",
  abraenergia: "abraenergia.com.br",
  abrastandard: "abrastandard.org",
  "instituto-ecovitta": "institutoecovitta.org",
  "holy-street-store": "holystreetstore.com.br",
  "respira-sustentabilidade": "respirasustentabilidade.com.br",
  "start-solar": "startsolar.com.br",
  "inova-londrina": "inovalondrina.com.br",
  "vem-ganhar": "vemganhar.com.br",
  "fintech-app": "app.financenext.com.br",
};

const projects = [
  {
    id: "eletrostart",
    name: "Eletrostart",
    platform: "ecommerce",
    category: "E-commerce",
    description:
      "Loja virtual completa de materiais elétricos e iluminação LED, oferecendo uma ampla variedade de produtos com sistema de busca avançado, carrinho inteligente e checkout otimizado para melhor experiência do usuário.",
    summary: "E-commerce de materiais elétricos e iluminação LED profissional.",
    image: "https://placehold.co/600x400/667eea/fff?text=Eletrostart",
    internalUrl: urlMapping["eletrostart"],
    liveUrl: "https://eletrostart1.netlify.app",
    technologies: [
      "React",
      "Vite",
      "CSS Modules",
      "React Router",
      "Context API",
      "LocalStorage",
    ],
    features: [
      "Catálogo completo de produtos elétricos",
      "Sistema de busca e filtros avançados",
      "Carrinho de compras persistente",
      "Categorização por tipo de produto",
      "Galeria de imagens dos produtos",
      "Sistema de favoritos",
      "Contato via WhatsApp integrado",
      "Design responsivo mobile-first",
    ],
    highlights: [
      "Interface intuitiva e moderna",
      "Performance otimizada com Vite",
      "Experiência mobile excepcional",
      "Integração com WhatsApp Business",
    ],
    status: "completed",
    year: 2025,
    createdAt: "2025-01-10",
    client: "Eletrostart",
    duration: "2 meses",
    testimonial:
      "A EvolveTech criou uma loja virtual que superou nossas expectativas. O design moderno e a facilidade de navegação aumentaram significativamente nossas vendas online.",
    testimonialDetails: {
      quote:
        "A EvolveTech criou uma loja virtual que superou nossas expectativas. O design moderno e a facilidade de navegação aumentaram significativamente nossas vendas online.",
      author: "Equipe Eletrostart",
    },
    results: {
      performance: "Carregamento em <2s",
      mobile: "100% responsivo",
      engagement: "Fácil navegação",
    },
  },
  {
    id: "lapec",
    name: "Lapec Exames Laboratoriais",
    platform: "web",
    category: "Saúde",
    description:
      "Portal institucional moderno para laboratório de análises clínicas, com informações sobre exames, agendamento online, resultados digitais e área do paciente. Plataforma que moderniza a experiência do usuário com serviços de saúde.",
    summary: "Portal de laboratório com agendamento e resultados online.",
    image: "https://placehold.co/600x400/10b981/fff?text=Lapec",
    internalUrl: urlMapping["lapec"],
    liveUrl: "https://lapecexameslaboratoriais.netlify.app",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "JWT",
      "Material-UI",
      "AWS S3",
    ],
    features: [
      "Catálogo completo de exames",
      "Sistema de agendamento online",
      "Portal do paciente com resultados",
      "Área administrativa para gestão",
      "Informações detalhadas dos exames",
      "Localização e contato",
      "Blog de saúde e bem-estar",
      "Integração com WhatsApp",
    ],
    highlights: [
      "Redução de 60% em ligações telefônicas",
      "Agendamento 24/7 disponível",
      "Resultados digitais seguros",
      "Interface LGPD compliant",
    ],
    status: "completed",
    year: 2025,
    createdAt: "2025-01-05",
    client: "Lapec Laboratórios",
    duration: "3 meses",
    testimonial:
      "O portal transformou nossa operação. Os pacientes adoram a conveniência de agendar online e acessar resultados de forma segura.",
    testimonialDetails: {
      quote:
        "O portal transformou nossa operação. Os pacientes adoram a conveniência de agendar online e acessar resultados de forma segura.",
      author: "Lapec Laboratórios",
      role: "Direção Clínica",
    },
    results: {
      automation: "60% redução ligações",
      availability: "24/7 agendamento",
      security: "100% LGPD",
    },
  },
  {
    id: "abrastandard",
    name: "AbraStandard",
    platform: "web",
    category: "Site Institucional",
    description:
      "Site institucional moderno para empresa de padronização e certificação, com foco em performance e SEO. Desenvolvido com as mais modernas tecnologias web, oferece uma experiência única para usuários que buscam informações sobre certificações e padrões técnicos.",
    summary:
      "Plataforma web responsiva com sistema de certificações e padrões técnicos.",
    image: "https://placehold.co/600x400/f59e0b/fff?text=AbraStandard",
    // URL real protegida - não exposta no frontend
    internalUrl: urlMapping["abrastandard"],
    liveUrl: "https://abrastandard.org",
    technologies: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
    ],
    features: [
      "Design responsivo e moderno",
      "Sistema de busca avançada com filtros inteligentes",
      "Área de certificações com validação online",
      "Blog integrado com CMS",
      "SEO otimizado com meta tags dinâmicas",
      "Performance otimizada com lazy loading",
      "Sistema de notificações",
      "Área administrativa completa",
    ],
    highlights: [
      "Melhoria de 40% na velocidade de carregamento",
      "Aumento de 60% no tempo de permanência",
      "Interface intuitiva e acessível",
      "Certificação WCAG 2.1 AA",
    ],
    status: "completed",
    year: 2024,
    createdAt: "2024-01-15",
    client: "AbraStandard",
    duration: "3 meses",
    testimonial:
      "A EvolveTech superou nossas expectativas. O site ficou moderno, rápido e nossos clientes adoraram a nova experiência.",
    testimonialDetails: {
      quote:
        "A EvolveTech superou nossas expectativas. O site ficou moderno, rápido e nossos clientes adoraram a nova experiência.",
      author: "AbraStandard",
      role: "Equipe de Comunicação",
    },
    results: {
      performance: "+40% velocidade",
      engagement: "+60% permanência",
      conversions: "+35% conversões",
    },
  },
  {
    id: "abraenergia",
    name: "AbraEnergia",
    platform: "web",
    category: "Energia Renovável",
    description:
      "Plataforma digital inovadora para empresa de energia renovável e sustentabilidade. Desenvolvida com foco em educação ambiental, simulação de economia energética e promoção de soluções sustentáveis para o mercado brasileiro.",
    summary:
      "Portal de energia renovável com simuladores e conteúdo educativo.",
    image: "https://placehold.co/600x400/3b82f6/fff?text=AbraEnergia",
    // URL real protegida - não exposta no frontend
    internalUrl: urlMapping["abraenergia"],
    liveUrl: "https://abraenergia.com.br",
    technologies: [
      "Vue.js",
      "Nuxt.js",
      "Node.js",
      "MongoDB",
      "Chart.js",
      "Leaflet",
      "PWA",
    ],
    features: [
      "Simulador de economia energética",
      "Calculadora de energia solar",
      "Mapa interativo de projetos",
      "Blog educativo sobre sustentabilidade",
      "Sistema de orçamentos online",
      "Dashboard de monitoramento",
      "Certificações ambientais",
      "Comparador de soluções energéticas",
    ],
    highlights: [
      "Simulador com 95% de precisão",
      "Aumento de 150% em leads qualificados",
      "Interface educativa premiada",
      "Integração com APIs de clima",
    ],
    status: "completed",
    year: 2024,
    createdAt: "2024-02-20",
    client: "AbraEnergia",
    duration: "4 meses",
    testimonial:
      "A plataforma revolucionou nossa forma de educar e converter clientes. O simulador de economia se tornou nossa principal ferramenta de vendas.",
    testimonialDetails: {
      quote:
        "A plataforma revolucionou nossa forma de educar e converter clientes. O simulador de economia se tornou nossa principal ferramenta de vendas.",
      author: "AbraEnergia",
      role: "Diretoria Comercial",
    },
    results: {
      leads: "+150% leads qualificados",
      engagement: "+200% tempo no site",
      conversions: "+85% conversões",
    },
  },
  {
    id: "respira-sustentabilidade",
    name: "Respira Sustentabilidade",
    platform: "web",
    category: "Meio Ambiente",
    description:
      "Portal dedicado à sustentabilidade e meio ambiente, focado em educação ambiental, projetos de reflorestamento e iniciativas de redução de CO2. Uma plataforma que conecta pessoas e empresas com práticas sustentáveis.",
    summary: "Portal ambiental com projetos de sustentabilidade e educação.",
    image: "/images/projects/respira-sustentabilidade.jpg",
    // URL real protegida - não exposta no frontend
    internalUrl: urlMapping["respira-sustentabilidade"],
    liveUrl: "https://respirasustentabilidade.com.br",
    technologies: [
      "React",
      "Next.js",
      "Strapi",
      "PostgreSQL",
      "Mapbox",
      "D3.js",
      "Vercel",
    ],
    features: [
      "Mapa de projetos ambientais",
      "Calculadora de pegada de carbono",
      "Sistema de doações para reflorestamento",
      "Blog educativo sobre meio ambiente",
      "Certificados de compensação de CO2",
      "Galeria de projetos sustentáveis",
      "Newsletter ambiental",
      "Parcerias com ONGs",
    ],
    highlights: [
      "Mais de 10.000 árvores plantadas",
      "Compensação de 500 toneladas de CO2",
      "Rede de 50+ parceiros ambientais",
      "Certificação ambiental ISO 14001",
    ],
    status: "completed",
    year: 2024,
    createdAt: "2024-03-10",
    client: "Respira Sustentabilidade",
    duration: "3 meses",
    testimonial:
      "A plataforma nos ajudou a amplificar nosso impacto ambiental. Conseguimos conectar mais pessoas com a causa da sustentabilidade.",
    testimonialDetails: {
      quote:
        "A plataforma nos ajudou a amplificar nosso impacto ambiental. Conseguimos conectar mais pessoas com a causa da sustentabilidade.",
      author: "Respira Sustentabilidade",
      role: "Coordenação de Projetos",
    },
    results: {
      trees: "10.000+ árvores plantadas",
      co2: "500 ton CO2 compensadas",
      partners: "50+ parceiros",
    },
  },
  {
    id: "instituto-ecovitta",
    name: "Instituto EcoVitta",
    platform: "web",
    category: "Educação Ambiental",
    description:
      "Site institucional para instituto de educação ambiental e sustentabilidade, com foco em cursos online, projetos educativos e conscientização ecológica. Plataforma que promove a educação ambiental através de conteúdo interativo e engajador.",
    summary:
      "Instituto de educação ambiental com cursos e projetos sustentáveis.",
    image: "https://placehold.co/600x400/059669/fff?text=EcoVitta",
    // URL real protegida - não exposta no frontend
    internalUrl: urlMapping["instituto-ecovitta"],
    liveUrl: "https://institutoecovitta.org",
    technologies: [
      "WordPress",
      "PHP",
      "MySQL",
      "LearnDash",
      "WooCommerce",
      "Elementor",
    ],
    features: [
      "Plataforma de cursos online (LMS)",
      "Sistema de certificações ambientais",
      "Blog educativo especializado",
      "Biblioteca digital de recursos",
      "Fórum de discussão comunitário",
      "Calendário de eventos",
      "Sistema de voluntariado",
      "Loja de produtos sustentáveis",
    ],
    highlights: [
      "Mais de 5.000 alunos certificados",
      "Biblioteca com 1.000+ recursos",
      "Comunidade ativa de 2.000+ membros",
      "Parcerias com universidades",
    ],
    status: "completed",
    year: 2024,
    createdAt: "2024-04-05",
    client: "Instituto EcoVitta",
    duration: "2 meses",
    testimonial:
      "A plataforma transformou nossa capacidade de educar sobre sustentabilidade. Nosso alcance aumentou exponencialmente.",
    testimonialDetails: {
      quote:
        "A plataforma transformou nossa capacidade de educar sobre sustentabilidade. Nosso alcance aumentou exponencialmente.",
      author: "Instituto EcoVitta",
      role: "Direção do Instituto",
    },
    results: {
      students: "5.000+ alunos",
      resources: "1.000+ recursos",
      community: "2.000+ membros",
    },
  },
  {
    id: "start-solar",
    name: "Start Solar",
    platform: "web",
    category: "Energia Solar",
    description:
      "Plataforma completa para empresa de energia solar fotovoltaica, com simulador de economia, sistema de orçamentos e marketplace de equipamentos. Solução digital que facilita a transição para energia limpa no Brasil.",
    summary: "Plataforma de energia solar com simulador e marketplace.",
    image: "/images/projects/start-solar.jpg",
    // URL real protegida - não exposta no frontend
    internalUrl: urlMapping["start-solar"],
    liveUrl: "https://startsolar.com.br",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Stripe",
      "Google Maps API",
    ],
    features: [
      "Simulador avançado de energia solar",
      "Sistema de orçamentos automatizado",
      "Marketplace de equipamentos",
      "Calculadora de ROI solar",
      "Mapa de instaladores certificados",
      "Sistema de financiamento",
      "Monitoramento de produção",
      "App mobile para clientes",
    ],
    highlights: [
      "Simulador com dados satelitais reais",
      "Rede de 200+ instaladores",
      "Financiamento em até 120x",
      "Monitoramento em tempo real",
    ],
    status: "completed",
    year: 2024,
    createdAt: "2024-05-12",
    client: "Start Solar",
    duration: "5 meses",
    testimonial:
      "A plataforma revolucionou nosso negócio. O simulador automatizou 80% do nosso processo de vendas e aumentou drasticamente nossa conversão.",
    testimonialDetails: {
      quote:
        "A plataforma revolucionou nosso negócio. O simulador automatizou 80% do nosso processo de vendas e aumentou drasticamente nossa conversão.",
      author: "Start Solar",
      role: "Diretoria de Vendas",
    },
    results: {
      automation: "80% processo automatizado",
      installers: "200+ instaladores",
      financing: "Até 120x financiamento",
    },
  },
  {
    id: "inova-londrina",
    name: "Inova Londrina",
    platform: "web",
    category: "Inovação e Tecnologia",
    description:
      "Portal de inovação e empreendedorismo para a cidade de Londrina, conectando startups, investidores e talentos. Plataforma que fomenta o ecossistema de inovação local através de eventos, networking e oportunidades.",
    summary: "Ecossistema de inovação conectando startups e investidores.",
    image: "/images/projects/inova-londrina.jpg",
    // URL real protegida - não exposta no frontend
    internalUrl: urlMapping["inova-londrina"],
    liveUrl: "https://inovalondrina.com.br",
    technologies: [
      "Vue.js",
      "Nuxt.js",
      "Firebase",
      "Algolia",
      "Stripe",
      "Socket.io",
    ],
    features: [
      "Diretório de startups locais",
      "Plataforma de networking",
      "Sistema de eventos e workshops",
      "Marketplace de talentos",
      "Hub de investidores",
      "Incubadora virtual",
      "Mentoria online",
      "Coworking digital",
    ],
    highlights: [
      "Rede de 500+ empreendedores",
      "R$ 2M+ em investimentos facilitados",
      "100+ eventos realizados",
      "Parcerias com universidades",
    ],
    status: "completed",
    year: 2024,
    createdAt: "2024-06-18",
    client: "Inova Londrina",
    duration: "4 meses",
    testimonial:
      "A plataforma fortaleceu significativamente o ecossistema de inovação de Londrina. Conseguimos conectar muito mais empreendedores e investidores.",
    testimonialDetails: {
      quote:
        "A plataforma fortaleceu significativamente o ecossistema de inovação de Londrina. Conseguimos conectar muito mais empreendedores e investidores.",
      author: "Inova Londrina",
      role: "Coordenação do Ecossistema",
    },
    results: {
      entrepreneurs: "500+ empreendedores",
      investments: "R$ 2M+ facilitados",
      events: "100+ eventos",
    },
  },
  {
    id: "holy-street-store",
    name: "Holy Street Store",
    platform: "web",
    category: "E-commerce Fashion",
    description:
      "Loja virtual moderna de moda streetwear com design arrojado e experiência de compra única. E-commerce completo com sistema de personalização, programa de fidelidade e integração com redes sociais.",
    summary: "E-commerce de moda streetwear com experiência premium.",
    image: "https://placehold.co/600x400/dc2626/fff?text=Holy+Street",
    // URL real protegida - não exposta no frontend
    internalUrl: urlMapping["holy-street-store"],
    liveUrl: "https://holystreetstore.com.br",
    technologies: [
      "Shopify Plus",
      "React",
      "Node.js",
      "GraphQL",
      "Klaviyo",
      "Instagram API",
    ],
    features: [
      "Catálogo visual interativo",
      "Personalização de produtos",
      "Try-on virtual com AR",
      "Sistema de fidelidade",
      "Integração com Instagram",
      "Programa de influenciadores",
      "Wishlist compartilhável",
      "Checkout express",
    ],
    highlights: [
      "Conversão 40% acima da média",
      "Try-on AR com 95% precisão",
      "Programa com 1.000+ influenciadores",
      "Crescimento de 300% em 6 meses",
    ],
    status: "completed",
    year: 2024,
    createdAt: "2024-07-25",
    client: "Holy Street Store",
    duration: "3 meses",
    testimonial:
      "A loja virtual superou todas as expectativas. O try-on virtual e a integração com redes sociais revolucionaram nossa conversão.",
    testimonialDetails: {
      quote:
        "A loja virtual superou todas as expectativas. O try-on virtual e a integração com redes sociais revolucionaram nossa conversão.",
      author: "Holy Street Store",
      role: "Direção de E-commerce",
    },
    results: {
      conversion: "+40% acima da média",
      growth: "300% em 6 meses",
      influencers: "1.000+ parceiros",
    },
  },
  {
    id: "vem-ganhar",
    name: "Vem Ganhar",
    platform: "web",
    category: "E-commerce Gamificado",
    description:
      "Plataforma de e-commerce inovadora com sistema de gamificação e recompensas. Uma solução única que combina vendas online com elementos de jogos, criando uma experiência envolvente para compradores e vendedores.",
    summary: "E-commerce gamificado com sistema de recompensas e afiliados.",
    image: "/images/projects/vem-ganhar.jpg",
    // URL real protegida - não exposta no frontend
    internalUrl: urlMapping["vem-ganhar"],
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Stripe",
      "Redis",
      "Socket.io",
      "AWS",
    ],
    features: [
      "Sistema de gamificação completo",
      "Programa de afiliados multinível",
      "Recompensas e pontos",
      "Carrinho inteligente",
      "Múltiplos gateways de pagamento",
      "Dashboard de vendas em tempo real",
      "Sistema de cupons dinâmicos",
      "Chat ao vivo integrado",
    ],
    highlights: [
      "Aumento de 80% na conversão",
      "Sistema de gamificação único",
      "ROI de 300% no primeiro ano",
      "Rede de 5.000+ afiliados",
    ],
    status: "completed",
    year: 2024,
    createdAt: "2024-08-30",
    client: "Vem Ganhar",
    duration: "4 meses",
    testimonial:
      "O sistema de gamificação revolucionou nossa plataforma. As vendas aumentaram drasticamente e os usuários estão muito mais engajados.",
    results: {
      conversion: "+80% conversão",
      roi: "300% ROI",
      affiliates: "5.000+ afiliados",
    },
  },
  // Projetos antigos mantidos para demonstração (podem ser removidos se necessário)
  {
    id: "fintech-app",
    name: "FinTech Mobile",
    platform: "mobile",
    category: "Aplicativo Financeiro",
    description:
      "Aplicativo mobile completo para gestão financeira pessoal com IA integrada para análise de gastos e investimentos. Oferece uma experiência bancária moderna e segura.",
    summary: "App financeiro com IA para análise de gastos e investimentos.",
    image: "/images/projects/fintech-app.jpg",
    internalUrl: urlMapping["fintech-app"],
    technologies: [
      "React Native",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "TensorFlow",
      "Biometrics",
    ],
    features: [
      "Autenticação biométrica",
      "Análise de gastos com IA",
      "Investimentos automatizados",
      "Carteira digital",
      "Transferências instantâneas",
      "Notificações inteligentes",
      "Modo offline",
      "Criptografia end-to-end",
    ],
    highlights: [
      "Segurança bancária nível 5",
      "IA com 95% de precisão",
      "Interface premiada",
      "Compliance total com LGPD",
    ],
    status: "completed",
    year: 2024,
    createdAt: "2024-09-15",
    client: "FinanceNext",
    duration: "6 meses",
    testimonial:
      "A EvolveTech criou um app que compete com os maiores bancos digitais. A segurança e usabilidade são excepcionais.",
    results: {
      users: "50k+ usuários",
      rating: "4.8/5 estrelas",
      security: "100% compliance",
    },
  },
];

// Função para obter projetos sem expor URLs reais
export const getProjects = () => {
  return projects.map((project) => {
    const { internalUrl, ...publicProject } = project;
    // Remove também o campo url se existir
    const { url, ...safeProject } = publicProject;
    return safeProject;
  });
};

// Função para obter URL real (apenas para uso interno do servidor)
export const getProjectRealUrl = (projectId) => {
  const project = projects.find((p) => p.id === projectId);
  return project ? project.internalUrl : null;
};

export { projects };
