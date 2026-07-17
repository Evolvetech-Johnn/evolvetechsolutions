import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CookieBanner from "@/components/CookieBanner";
import GlobalBackground from "@/components/GlobalBackground";

export const metadata: Metadata = {
  title: "Case de Sucesso: Portal Compras Londrina",
  description:
    "Veja como a EvolveTech modernizou o portal Compras Londrina com um sistema rápido, acessível e otimizado para SEO, aumentando as licitações no município.",
  alternates: {
    canonical: "/portfolio/compras-londrina",
  },
};

export default function ComprasLondrinaPage() {
  return (
    <div className="min-h-dvh bg-ink-950 text-white relative">
      <GlobalBackground />
      <Navbar />
      <main className="pt-32 pb-16 relative z-10">
        <section className="container mx-auto px-4 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white tracking-tight">
              Case: Portal Compras Londrina
            </h1>
            <p className="text-lg text-white/70 mb-10 leading-relaxed">
              O Portal Compras Londrina precisava de uma renovação tecnológica
              para garantir transparência, velocidade e facilidade para os
              fornecedores do município. Desenvolvemos uma plataforma robusta,
              integrada e escalável.
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
      <CookieBanner />
    </div>
  );
}
