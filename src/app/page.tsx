import Site from "@/components/Site";

export default function Page() {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "EvolveTech Solutions",
    url: "https://www.evolvetechsolutions.com.br",
    telephone: "+5543999999999",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Londrina",
      addressRegion: "PR",
      addressCountry: "BR",
    },
  };

  const servicesJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Desenvolvimento de Sistemas",
      description: "Sistemas sob medida e dashboards gerenciais.",
      provider: {
        "@type": "Organization",
        name: "EvolveTech Solutions",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Automação",
      description: "Automatização de processos e tarefas.",
      provider: {
        "@type": "Organization",
        name: "EvolveTech Solutions",
      },
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      {servicesJsonLd.map((service, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
        />
      ))}
      <Site />
    </>
  );
}
