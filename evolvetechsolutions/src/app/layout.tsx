import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { siteConfig } from "@/config/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.evolvetechsolutions.com.br"),
  title: {
    default: "EvolveTech Solutions | Sistemas sob medida com foco em lucro",
    template: "%s | EVOLVETECH SOLUTIONS",
  },
  description:
    "Desenvolvemos sistemas, dashboards, automações e plataformas web sob medida para empresas que precisam de controle, dados e crescimento. Atendimento em Londrina e todo Brasil.",
  keywords: [
    "sistemas sob medida",
    "desenvolvimento de software",
    "dashboards",
    "automação empresarial",
    "software house",
    "Londrina",
    "PR",
  ],
  authors: [{ name: "EVOLVETECH SOLUTIONS" }],
  creator: "EVOLVETECH SOLUTIONS",
  publisher: "EVOLVETECH SOLUTIONS",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.evolvetechsolutions.com.br",
    siteName: "EVOLVETECH SOLUTIONS",
    title: "EvolveTech Solutions | Sistemas sob medida com foco em lucro",
    description:
      "Sistemas personalizados, dashboards e automações para aumentar lucro e controle empresarial.",
    images: [{ url: "/banner.jpg", width: 1200, height: 630, alt: "EVOLVETECH SOLUTIONS" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EvolveTech Solutions | Sistemas sob medida com foco em lucro",
    description:
      "Sistemas personalizados, dashboards e automações para aumentar lucro e controle empresarial.",
    images: ["/banner.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "EvolveTech Solutions",
    url: "https://www.evolvetechsolutions.com.br",
    logo: "https://www.evolvetechsolutions.com.br/favicon.png",
    sameAs: [],
  };

  return (
    <html lang="pt-BR" className={`${inter.variable}`}>
      <body className="bg-background text-primary antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

