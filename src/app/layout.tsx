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
  title: "EVOLVETECH SOLUTIONS | Sistemas sob medida que aumentam lucro e controle",
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
  icons: [{ rel: "icon", url: "/favicon.ico" }]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable}`}>
      <body className="bg-ink-950 text-white antialiased">{children}</body>
    </html>
  );
}

