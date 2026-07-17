import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "../styles/globals.css";
import { siteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "EvolveTech Solutions | Sistemas sob medida com foco em lucro",
    template: "%s | EVOLVETECH SOLUTIONS",
  },
  description:
    "Desenvolvemos sistemas, dashboards, automações e plataformas web sob medida para empresas que precisam de controle, dados e crescimento. Atendimento em Londrina e todo Brasil.",
  metadataBase: new URL("https://www.evolvetechsolutions.com.br"),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "EVOLVETECH SOLUTIONS | Sistemas sob medida",
    description:
      "Sistemas personalizados, dashboards e automações para aumentar lucro e controle empresarial.",
    url: "https://www.evolvetechsolutions.com.br",
    images: [{ url: "/banner.jpg" }]
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  verification: {
    google: "l6HrxhAESpRzNoXizMAoURkGNi_BAlp5W_0NJduRQD8",
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
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable}`}>
      <body className="bg-ink-950 text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

