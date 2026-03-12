export type ProjectResult = Record<string, string>;

export type ProjectTestimonial = {
  quote: string;
  author: string;
  role?: string;
};

export type Project = {
  id: string;
  name: string;
  platform: string;
  category: string;
  description: string;
  summary: string;
  image: string;
  internalUrl?: string;
  liveUrl?: string;
  technologies: string[];
  features: string[];
  highlights: string[];
  status: string;
  year: number;
  createdAt: string;
  client: string;
  duration: string;
  testimonial: string;
  testimonialDetails?: ProjectTestimonial;
  results: ProjectResult;
  url?: string;
};

const urlMapping: Record<string, string> = {
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

const projects: Project[] = [
  {
    id: "eletrostart",
    name: "Eletrostart",
    platform: "ecommerce",
    category: "E-commerce",
    description:
      "Loja virtual completa de materiais elétricos e iluminação LED, oferecendo uma ampla variedade de produtos com sistema de busca avançado, carrinho inteligente e checkout otimizado para melhor experiência do usuário.",
    summary: "E-commerce de materiais elétricos e iluminação LED profissional.",
    image: "https://placehold.co/600x400/667eea/fff?text=Eletrostart",
    internalUrl: urlMapping.eletrostart,
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
    internalUrl: urlMapping.lapec,
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
      satisfaction: "95% aprovação",
      efficiency: "Agendamento 24/7",
    },
  },
  {
    id: "abraenergia",
    name: "ABRA Energia",
    platform: "sites",
    category: "Energia",
    description:
      "Site institucional moderno e completo para associação do setor energético, com informações sobre projetos, eventos, notícias e área de membros. Portal que fortalece a presença digital e comunicação com stakeholders.",
    summary: "Portal institucional completo para associação energética.",
    image: "https://placehold.co/600x400/f59e0b/fff?text=ABRA+Energia",
    internalUrl: urlMapping.abraenergia,
    liveUrl: "https://abraenergia.com.br",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    features: [
      "Portal de notícias e atualizações",
      "Calendário de eventos",
      "Área de membros restrita",
      "Biblioteca de documentos",
      "Formulário de contato",
      "SEO otimizado",
      "Design responsivo",
      "Integração com redes sociais",
    ],
    highlights: [
      "Aumento de 150% no tráfego orgânico",
      "Melhoria significativa no SEO",
      "Interface moderna e profissional",
      "Gestão fácil de conteúdo",
    ],
    status: "completed",
    year: 2025,
    createdAt: "2025-01-20",
    client: "ABRA Energia",
    duration: "2 meses",
    testimonial:
      "O novo site elevou nossa comunicação institucional. A navegação é intuitiva e o design transmite nossa credibilidade no setor.",
    testimonialDetails: {
      quote:
        "O novo site elevou nossa comunicação institucional. A navegação é intuitiva e o design transmite nossa credibilidade no setor.",
      author: "Diretoria ABRA Energia",
    },
    results: {
      traffic: "+150% tráfego orgânico",
      seo: "Top 3 Google",
      engagement: "+80% tempo no site",
    },
  },
  {
    id: "abrastandard",
    name: "ABRA Standard",
    platform: "sites",
    category: "Certificação",
    description:
      "Site institucional para organização de certificação, apresentando serviços, processos de certificação, documentação e área de consulta. Plataforma que facilita o acesso às informações e serviços de certificação.",
    summary: "Portal de certificação com área de consulta e documentação.",
    image: "https://placehold.co/600x400/ef4444/fff?text=ABRA+Standard",
    internalUrl: urlMapping.abrastandard,
    liveUrl: "https://abrastandard.org",
    technologies: ["React", "Next.js", "TypeScript", "Styled Components", "AWS"],
    features: [
      "Catálogo de certificações",
      "Área de consulta de certificados",
      "Documentação completa",
      "Formulários de solicitação",
      "Blog institucional",
      "Área administrativa",
      "Integração com sistemas internos",
      "Design acessível",
    ],
    highlights: [
      "Sistema de consulta rápido e eficiente",
      "Documentação organizada e acessível",
      "Interface profissional",
      "Otimização para dispositivos móveis",
    ],
    status: "completed",
    year: 2025,
    createdAt: "2025-02-01",
    client: "ABRA Standard",
    duration: "2 meses",
    testimonial:
      "A plataforma facilitou muito o acesso às nossas certificações. O sistema de consulta é rápido e nossos clientes adoraram a nova interface.",
    testimonialDetails: {
      quote:
        "A plataforma facilitou muito o acesso às nossas certificações. O sistema de consulta é rápido e nossos clientes adoraram a nova interface.",
      author: "Gestão ABRA Standard",
    },
    results: {
      efficiency: "+70% consultas online",
      satisfaction: "92% aprovação",
      speed: "Resposta em <1s",
    },
  },
  {
    id: "instituto-ecovitta",
    name: "Instituto Ecovitta",
    platform: "sites",
    category: "Sustentabilidade",
    description:
      "Site institucional para instituto de sustentabilidade, com apresentação de projetos ambientais, programas educacionais e formas de participação. Portal que inspira e engaja a comunidade em iniciativas sustentáveis.",
    summary: "Portal de sustentabilidade com projetos e programas educacionais.",
    image: "https://placehold.co/600x400/22c55e/fff?text=Instituto+Ecovitta",
    internalUrl: urlMapping["instituto-ecovitta"],
    liveUrl: "https://institutoecovitta.org",
    technologies: ["React", "Vite", "TypeScript", "CSS Modules", "Netlify"],
    features: [
      "Apresentação de projetos ambientais",
      "Área de programas educacionais",
      "Sistema de doações",
      "Galeria de fotos e vídeos",
      "Blog de sustentabilidade",
      "Formulário de voluntariado",
      "Integração com redes sociais",
      "Newsletter",
    ],
    highlights: [
      "Design inspirador e moderno",
      "Foco em engajamento comunitário",
      "Performance otimizada",
      "Experiência mobile excelente",
    ],
    status: "completed",
    year: 2025,
    createdAt: "2025-02-15",
    client: "Instituto Ecovitta",
    duration: "1 mês",
    testimonial:
      "O site capturou perfeitamente nossa missão. Recebemos muitos elogios pelo design e facilidade de navegação. Aumentou significativamente nosso engajamento.",
    testimonialDetails: {
      quote:
        "O site capturou perfeitamente nossa missão. Recebemos muitos elogios pelo design e facilidade de navegação. Aumentou significativamente nosso engajamento.",
      author: "Diretoria Instituto Ecovitta",
    },
    results: {
      engagement: "+200% interações",
      donations: "+150% doações online",
      reach: "+300% alcance",
    },
  },
  {
    id: "holy-street-store",
    name: "Holy Street Store",
    platform: "ecommerce",
    category: "Moda",
    description:
      "E-commerce completo para marca de streetwear, com catálogo de produtos, sistema de compras, pagamentos integrados e área do cliente. Plataforma moderna focada na experiência de compra e conversão.",
    summary: "E-commerce de streetwear com experiência premium de compra.",
    image: "https://placehold.co/600x400/8b5cf6/fff?text=Holy+Street",
    internalUrl: urlMapping["holy-street-store"],
    liveUrl: "https://holystreetstore.com.br",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Stripe",
      "Redis",
      "AWS",
    ],
    features: [
      "Catálogo de produtos com filtros",
      "Carrinho de compras persistente",
      "Checkout otimizado",
      "Sistema de pagamentos Stripe",
      "Área do cliente",
      "Gestão de estoque",
      "Sistema de cupons",
      "Integração com redes sociais",
    ],
    highlights: [
      "Aumento de 120% nas vendas online",
      "Checkout com 95% taxa de conversão",
      "Performance otimizada",
      "Design alinhado com a marca",
    ],
    status: "completed",
    year: 2025,
    createdAt: "2025-03-01",
    client: "Holy Street Store",
    duration: "4 meses",
    testimonial:
      "A loja online ficou incrível! O design é exatamente o que queríamos e as vendas aumentaram muito. O sistema é rápido e fácil de usar.",
    testimonialDetails: {
      quote:
        "A loja online ficou incrível! O design é exatamente o que queríamos e as vendas aumentaram muito. O sistema é rápido e fácil de usar.",
      author: "Equipe Holy Street",
    },
    results: {
      sales: "+120% vendas",
      conversion: "95% conversão",
      performance: "<2s carregamento",
    },
  },
  {
    id: "respira-sustentabilidade",
    name: "Respira Sustentabilidade",
    platform: "sites",
    category: "Meio Ambiente",
    description:
      "Site institucional para projeto de sustentabilidade, com informações sobre iniciativas ambientais, programas de reciclagem e conscientização. Portal educativo que promove práticas sustentáveis.",
    summary: "Portal educativo sobre sustentabilidade e meio ambiente.",
    image: "https://placehold.co/600x400/06b6d4/fff?text=Respira",
    internalUrl: urlMapping["respira-sustentabilidade"],
    liveUrl: "https://respirasustentabilidade.com.br",
    technologies: ["React", "Vite", "TypeScript", "Tailwind CSS", "Netlify"],
    features: [
      "Conteúdo educativo sobre sustentabilidade",
      "Seção de iniciativas ambientais",
      "Calculadora de impacto ambiental",
      "Blog de dicas sustentáveis",
      "Galeria de projetos",
      "Formulário de participação",
      "Newsletter",
      "Integração com redes sociais",
    ],
    highlights: [
      "Conteúdo rico e educativo",
      "Interface clean e moderna",
      "Ferramentas interativas",
      "Otimização SEO",
    ],
    status: "completed",
    year: 2025,
    createdAt: "2025-03-15",
    client: "Respira Sustentabilidade",
    duration: "2 meses",
    testimonial:
      "O site ficou perfeito para nosso projeto. As ferramentas interativas e o blog ajudaram muito a engajar nossa audiência.",
    testimonialDetails: {
      quote:
        "O site ficou perfeito para nosso projeto. As ferramentas interativas e o blog ajudaram muito a engajar nossa audiência.",
      author: "Coordenação Respira",
    },
    results: {
      reach: "+400% alcance",
      engagement: "+250% engajamento",
      seo: "Top 5 Google",
    },
  },
  {
    id: "start-solar",
    name: "Start Solar",
    platform: "sites",
    category: "Energia Solar",
    description:
      "Site institucional para empresa de energia solar, com calculadora de economia, apresentação de serviços, projetos realizados e formulário de orçamento. Portal focado em geração de leads e conversão.",
    summary: "Site de energia solar com calculadora e geração de leads.",
    image: "https://placehold.co/600x400/f97316/fff?text=Start+Solar",
    internalUrl: urlMapping["start-solar"],
    liveUrl: "https://startsolar.com.br",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    features: [
      "Calculadora de economia solar",
      "Apresentação de serviços",
      "Portfolio de projetos",
      "Formulário de orçamento",
      "Integração com WhatsApp",
      "Blog de energia solar",
      "SEO otimizado",
      "Design responsivo",
    ],
    highlights: [
      "Aumento de 300% em leads",
      "Calculadora com alta conversão",
      "Interface moderna",
      "Performance excelente",
    ],
    status: "completed",
    year: 2025,
    createdAt: "2025-04-01",
    client: "Start Solar",
    duration: "2 meses",
    testimonial:
      "O site gerou muitos leads qualificados. A calculadora de economia é um diferencial e nossos clientes adoram. Excelente trabalho!",
    testimonialDetails: {
      quote:
        "O site gerou muitos leads qualificados. A calculadora de economia é um diferencial e nossos clientes adoram. Excelente trabalho!",
      author: "Direção Start Solar",
    },
    results: {
      leads: "+300% leads",
      conversion: "+180% conversão",
      traffic: "+220% tráfego",
    },
  },
  {
    id: "inova-londrina",
    name: "Inova Londrina",
    platform: "sites",
    category: "Inovação",
    description:
      "Portal para hub de inovação de Londrina, com informações sobre startups, eventos, programas de aceleração e networking. Plataforma que conecta o ecossistema de inovação local.",
    summary: "Portal de inovação conectando startups e ecossistema local.",
    image: "https://placehold.co/600x400/3b82f6/fff?text=Inova+Londrina",
    internalUrl: urlMapping["inova-londrina"],
    liveUrl: "https://inovalondrina.com.br",
    technologies: ["React", "Vite", "TypeScript", "Framer Motion", "Netlify"],
    features: [
      "Diretório de startups",
      "Calendário de eventos",
      "Programas de aceleração",
      "Networking e comunidade",
      "Blog de inovação",
      "Formulário de inscrição",
      "Área de parceiros",
      "Newsletter",
    ],
    highlights: [
      "Conectou 200+ startups",
      "Aumento de 500% em inscrições",
      "Interface dinâmica",
      "Animações fluidas",
    ],
    status: "completed",
    year: 2025,
    createdAt: "2025-04-15",
    client: "Inova Londrina",
    duration: "3 meses",
    testimonial:
      "O portal transformou nosso hub. Agora conseguimos conectar melhor as startups e promover nossos eventos. A plataforma é linda e funcional.",
    testimonialDetails: {
      quote:
        "O portal transformou nosso hub. Agora conseguimos conectar melhor as startups e promover nossos eventos. A plataforma é linda e funcional.",
      author: "Coordenação Inova",
    },
    results: {
      startups: "200+ startups",
      registrations: "+500% inscrições",
      engagement: "+350% engajamento",
    },
  },
  {
    id: "vem-ganhar",
    name: "Vem Ganhar",
    platform: "dashboard",
    category: "Finanças",
    description:
      "Dashboard completo para análise financeira e gestão de investimentos, com gráficos interativos, relatórios, alertas e integração com múltiplas fontes de dados. Plataforma robusta para tomada de decisões.",
    summary: "Dashboard financeiro com análises e relatórios avançados.",
    image: "https://placehold.co/600x400/6366f1/fff?text=Vem+Ganhar",
    internalUrl: urlMapping["vem-ganhar"],
    liveUrl: "https://vemganhar.com.br",
    technologies: [
      "React",
      "D3.js",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Redis",
      "Chart.js",
    ],
    features: [
      "Gráficos interativos",
      "Relatórios detalhados",
      "Alertas automáticos",
      "Integração com APIs financeiras",
      "Filtros avançados",
      "Exportação de dados",
      "Dashboard personalizável",
      "Análise em tempo real",
    ],
    highlights: [
      "Análises em tempo real",
      "Interface intuitiva",
      "Performance otimizada",
      "Dados seguros",
    ],
    status: "completed",
    year: 2025,
    createdAt: "2025-05-01",
    client: "Vem Ganhar",
    duration: "5 meses",
    testimonial:
      "O dashboard revolucionou nossa análise financeira. Os gráficos são incríveis e a performance é excelente. Agora tomamos decisões muito mais rápidas.",
    testimonialDetails: {
      quote:
        "O dashboard revolucionou nossa análise financeira. Os gráficos são incríveis e a performance é excelente. Agora tomamos decisões muito mais rápidas.",
      author: "Equipe Vem Ganhar",
    },
    results: {
      speed: "+200% velocidade análise",
      accuracy: "99% precisão",
      efficiency: "+150% eficiência",
    },
  },
  {
    id: "fintech-app",
    name: "FinanceNext App",
    platform: "mobile",
    category: "Fintech",
    description:
      "Aplicativo mobile completo para fintech, com funcionalidades de banco digital, transferências, pagamentos, investimentos e gestão financeira pessoal. App seguro e intuitivo com tecnologia de ponta.",
    summary: "App fintech com banco digital e gestão financeira.",
    image: "https://placehold.co/600x400/0ea5e9/fff?text=FinanceNext",
    internalUrl: urlMapping["fintech-app"],
    liveUrl: "https://app.financenext.com.br",
    technologies: [
      "React Native",
      "Expo",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
    ],
    features: [
      "Conta digital completa",
      "Transferências PIX e TED",
      "Pagamentos de boletos",
      "Carteira de investimentos",
      "Gestão de gastos",
      "Cartões virtuais",
      "Notificações push",
      "Biometria",
    ],
    highlights: [
      "Segurança bancária",
      "Interface intuitiva",
      "Performance excelente",
      "UX premium",
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

export type PublicProject = Omit<Project, "internalUrl" | "url">;

export const getProjects = (): PublicProject[] =>
  projects.map((project) => {
    const { internalUrl: _internalUrl, ...publicProject } = project;
    const { url: _url, ...safeProject } = publicProject;
    void _internalUrl;
    void _url;
    return safeProject;
  });

export const getProjectRealUrl = (projectId: string): string | null => {
  const project = projects.find((p) => p.id === projectId);
  return project?.internalUrl ?? null;
};

export { projects };
