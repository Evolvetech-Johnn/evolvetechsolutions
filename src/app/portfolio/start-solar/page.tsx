import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CookieBanner from "@/components/CookieBanner";
import GlobalBackground from "@/components/GlobalBackground";

export const metadata: Metadata = {
  title: "Case de Sucesso: Start Solar e Energia",
  description:
    "Descubra a Landing Page de alta conversão criada pela EvolveTech para a Start Solar, maximizando a geração de leads e vendas de painéis solares.",
  alternates: {
    canonical: "/portfolio/start-solar",
  },
};

export default function StartSolarPage() {
  return (
    <div className="min-h-dvh bg-ink-950 text-white relative">
      <GlobalBackground />
      <Navbar />
      <main className="pt-32 pb-16 relative z-10">
        <section className="container mx-auto px-4 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white tracking-tight">
              Case: Start Solar
            </h1>
            <p className="text-lg text-white/70 mb-10 leading-relaxed">
              Desenvolvemos uma Landing Page focada inteiramente em performance e
              UX para a Start Solar, captando clientes com rapidez e
              integrando diretamente com o CRM de vendas.
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
