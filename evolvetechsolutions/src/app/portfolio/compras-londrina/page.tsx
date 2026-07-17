import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Link from "next/link";
import { ArrowLeft, TrendingUp, Zap, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "Case de Sucesso: Compras Londrina | EvolveTech Solutions",
  description: "Como o Compras Londrina reduziu custos operacionais organizando seus processos de compras em um sistema integrado.",
  alternates: {
    canonical: "/portfolio/compras-londrina",
  },
};

export default function ComprasLondrinaCase() {
  return (
    <div className="min-h-screen bg-base text-text-primary">
      <Navbar />
      <main className="pt-24 pb-16">
        <section className="container mx-auto px-4 lg:px-8 py-12">
          <Link href="/#casos" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
            <ArrowLeft size={20} />
            Voltar para Cases
          </Link>
          
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6 text-primary">Case: Compras Londrina</h1>
            <p className="text-lg text-text-secondary mb-10">
              O Compras Londrina sofria com processos de compras descentralizados, baseados exclusivamente em planilhas manuais. A solução da EvolveTech foi um sistema integrado para gestão de compras e fornecedores.
            </p>
            
            <div className="bg-background-secondary p-8 rounded-2xl border border-white/5 mb-12">
              <h2 className="text-2xl font-bold mb-6 text-white">O Desafio</h2>
              <p className="text-text-secondary mb-8">
                A dependência de planilhas dispersas gerava lentidão, falta de rastreabilidade e custos não otimizados na cadeia de suprimentos e aprovação.
              </p>
              
              <h2 className="text-2xl font-bold mb-6 text-white">A Solução</h2>
              <p className="text-text-secondary mb-8">
                Foi desenhado e implementado um sistema sob medida de Gestão de Compras e Fornecedores, centralizando as cotações, pedidos e o histórico de fornecedores em uma única plataforma unificada.
              </p>
              
              <h2 className="text-2xl font-bold mb-6 text-white">Resultados</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-base p-6 rounded-xl border border-white/5 text-center">
                  <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">40%</div>
                  <div className="text-sm text-text-secondary">Redução de custos</div>
                </div>
                <div className="bg-base p-6 rounded-xl border border-white/5 text-center">
                  <Zap className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">60%</div>
                  <div className="text-sm text-text-secondary">Mais produtividade</div>
                </div>
                <div className="bg-base p-6 rounded-xl border border-white/5 text-center">
                  <Target className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">100%</div>
                  <div className="text-sm text-text-secondary">Controle total</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
