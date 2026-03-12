export type Platform = {
  id: string;
  name: string;
  summary: string;
  icon: string;
  category: string;
  description: string;
  technologies: string[];
  highlights: string[];
  features: string[];
};

const platforms: Platform[] = [
  {
    id: "web",
    name: "Aplicações Web",
    summary: "Sistemas web responsivos e performáticos com React e Node.js.",
    icon: "FiGlobe",
    category: "frontend",
    description:
      "Desenvolvimento de aplicações SPA modernas com React, integração com APIs REST, implementação de segurança, acessibilidade (WCAG) e otimização para SEO. Utilizamos as melhores práticas de desenvolvimento para garantir performance e escalabilidade.",
    technologies: [
      "React",
      "Vite",
      "Node.js",
      "Express",
      "REST API",
      "TypeScript",
      "Tailwind CSS",
    ],
    highlights: [
      "Arquitetura modular e escalável",
      "Componentização e reuso de código",
      "Performance otimizada com lazy loading",
      "Acessibilidade WCAG 2.1 AA",
      "SEO otimizado para mecanismos de busca",
      "Testes automatizados",
    ],
    features: [
      "Interface responsiva e moderna",
      "Integração com APIs externas",
      "Autenticação e autorização",
      "Dashboard administrativo",
      "Sistema de notificações",
      "Relatórios e analytics",
    ],
  },
  {
    id: "mobile",
    name: "Apps Mobile",
    summary: "Aplicativos móveis multiplataforma com React Native.",
    icon: "FiSmartphone",
    category: "mobile",
    description:
      "Criação de experiências móveis nativas com React Native e Expo, integração com serviços de push notification, geolocalização, câmera e estratégias offline-first para garantir funcionamento sem conexão.",
    technologies: [
      "React Native",
      "Expo",
      "TypeScript",
      "Redux Toolkit",
      "AsyncStorage",
    ],
    highlights: [
      "UX/UI consistente entre plataformas",
      "Integrações nativas (câmera, GPS, sensores)",
      "Funcionamento offline",
      "Push notifications",
      "Publicação automática nas stores",
      "Atualizações OTA (Over-The-Air)",
    ],
    features: [
      "Interface nativa iOS e Android",
      "Sincronização de dados offline",
      "Integração com mapas",
      "Sistema de pagamentos",
      "Chat em tempo real",
      "Biometria e segurança",
    ],
  },
  {
    id: "api",
    name: "APIs e Backends",
    summary: "Serviços robustos e confiáveis com Node.js e Express.",
    icon: "FiServer",
    category: "backend",
    description:
      "Desenvolvimento de APIs REST escaláveis com Node.js e Express, implementação de autenticação JWT, logging estruturado, documentação automática com Swagger e testes unitários e de integração.",
    technologies: [
      "Node.js",
      "Express",
      "JWT",
      "Swagger",
      "MongoDB",
      "PostgreSQL",
      "Redis",
    ],
    highlights: [
      "Arquitetura RESTful padronizada",
      "Autenticação e autorização segura",
      "Documentação automática",
      "Logging e monitoramento",
      "Cache inteligente com Redis",
      "Testes automatizados",
    ],
    features: [
      "Rate limiting e throttling",
      "Validação de dados robusta",
      "Backup automático",
      "Escalabilidade horizontal",
      "Integração com serviços externos",
      "Webhooks e eventos",
    ],
  },
  {
    id: "sites",
    name: "Sites Institucionais",
    summary: "Landing pages e sites corporativos otimizados.",
    icon: "FiLayout",
    category: "frontend",
    description:
      "Desenvolvimento de sites institucionais com foco em performance, SEO e conversão. Utilizamos tecnologias modernas para criar experiências rápidas e envolventes que geram resultados.",
    technologies: ["React", "Next.js", "Vite", "Tailwind CSS", "Framer Motion"],
    highlights: [
      "Performance otimizada (Core Web Vitals)",
      "SEO técnico avançado",
      "Design responsivo e moderno",
      "Animações fluidas",
      "Formulários inteligentes",
      "Analytics integrado",
    ],
    features: [
      "CMS headless integrado",
      "Otimização de imagens automática",
      "Carregamento progressivo",
      "Integração com redes sociais",
      "Chat online",
      "Sistema de blog",
    ],
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    summary: "Lojas virtuais completas e seguras.",
    icon: "FiShoppingCart",
    category: "fullstack",
    description:
      "Desenvolvimento de plataformas de e-commerce completas com carrinho de compras, sistema de pagamentos, gestão de estoque e painel administrativo. Focamos na experiência do usuário e conversão.",
    technologies: ["React", "Node.js", "Stripe", "PayPal", "MongoDB", "Redis"],
    highlights: [
      "Carrinho de compras inteligente",
      "Múltiplos gateways de pagamento",
      "Gestão completa de produtos",
      "Sistema de cupons e promoções",
      "Relatórios de vendas",
      "Integração com marketplaces",
    ],
    features: [
      "Checkout otimizado",
      "Wishlist e favoritos",
      "Sistema de avaliações",
      "Programa de fidelidade",
      "Integração com ERP",
      "Multi-idioma e multi-moeda",
    ],
  },
  {
    id: "dashboard",
    name: "Dashboards e BI",
    summary: "Painéis analíticos e business intelligence.",
    icon: "FiBarChart3",
    category: "frontend",
    description:
      "Criação de dashboards interativos e sistemas de business intelligence para visualização de dados em tempo real. Transformamos dados complexos em insights acionáveis.",
    technologies: [
      "React",
      "D3.js",
      "Chart.js",
      "Node.js",
      "PostgreSQL",
      "InfluxDB",
    ],
    highlights: [
      "Visualizações interativas",
      "Dados em tempo real",
      "Filtros avançados",
      "Exportação de relatórios",
      "Alertas automáticos",
      "Performance otimizada",
    ],
    features: [
      "Gráficos customizáveis",
      "Drill-down de dados",
      "Comparações temporais",
      "KPIs personalizados",
      "Integração com múltiplas fontes",
      "Compartilhamento de insights",
    ],
  },
];

export default platforms;
