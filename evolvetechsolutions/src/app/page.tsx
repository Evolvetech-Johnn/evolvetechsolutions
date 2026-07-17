import Site from "@/components/Site";

export default function Page() {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "EvolveTech Solutions",
    url: "https://www.evolvetechsolutions.com.br",
    telephone: "+5543999999999",
    areaServed: "Londrina, PR e Brasil",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Londrina",
      addressRegion: "PR",
      addressCountry: "BR",
    },
  };

  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "Service",
        position: 1,
        name: "Desenvolvimento de Sistemas",
        description: "Sob medida para atender exatamente às necessidades da sua empresa.",
        provider: { "@type": "Organization", name: "EvolveTech Solutions" },
      },
      {
        "@type": "Service",
        position: 2,
        name: "Painéis de BI",
        description: "Dashboards interativos com dados em tempo real para decisões assertivas.",
        provider: { "@type": "Organization", name: "EvolveTech Solutions" },
      },
      {
        "@type": "Service",
        position: 3,
        name: "ERP Sob Medida",
        description: "Sistema integrado que centraliza todos os processos do seu negócio.",
        provider: { "@type": "Organization", name: "EvolveTech Solutions" },
      },
      {
        "@type": "Service",
        position: 4,
        name: "CRM Personalizado",
        description: "Gestão de relacionamento com clientes adaptada ao seu fluxo de trabalho.",
        provider: { "@type": "Organization", name: "EvolveTech Solutions" },
      },
      {
        "@type": "Service",
        position: 5,
        name: "IA Corporativa",
        description: "Inteligência Artificial para automatizar tarefas e gerar insights.",
        provider: { "@type": "Organization", name: "EvolveTech Solutions" },
      },
      {
        "@type": "Service",
        position: 6,
        name: "Aplicativos para Celular",
        description: "Apps nativos ou híbridos para Android e iOS.",
        provider: { "@type": "Organization", name: "EvolveTech Solutions" },
      },
      {
        "@type": "Service",
        position: 7,
        name: "Automação Empresarial",
        description: "Automatize processos repetitivos e foque no que realmente importa.",
        provider: { "@type": "Organization", name: "EvolveTech Solutions" },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <Site />
    </>
  );
}
