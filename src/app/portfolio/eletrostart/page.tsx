import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CookieBanner from "@/components/CookieBanner";
import GlobalBackground from "@/components/GlobalBackground";

export const metadata: Metadata = {
  title: "Case de Sucesso: Eletrostart Automação Industrial",
  description:
    "Saiba como a EvolveTech ajudou a Eletrostart a expandir sua presença digital com um site institucional focado na captação B2B.",
  alternates: {
    canonical: "/portfolio/eletrostart",
  },
};

export default function EletrostartPage() {
  return (
    <div className="min-h-dvh bg-ink-950 text-white relative">
      <GlobalBackground />
      <Navbar />
      <main className="pt-32 pb-16 relative z-10">
        <section className="container mx-auto px-4 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white tracking-tight">
              Case: Eletrostart
            </h1>
            <p className="text-lg text-white/70 mb-10 leading-relaxed">
              A Eletrostart buscou nossa experiência para construir um site
              institucional de alta conversão, fortalecendo sua marca e
              captando mais clientes no setor B2B de automação industrial.
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
