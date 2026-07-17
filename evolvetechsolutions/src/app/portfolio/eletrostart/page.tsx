import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Link from "next/link";
import { ArrowLeft, TrendingUp, Zap, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "Case de Sucesso: Eletrostart | EvolveTech Solutions",
  description: "Como a Eletrostart ganhou visão em tempo real do estoque e vendas através de um dashboard interativo com BI.",
  alternates: {
    canonical: "/portfolio/eletrostart",
  },
};

export default function EletrostartCase() {
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
            <h1 className="text-4xl font-bold mb-6 text-primary">Case: Eletrostart</h1>
            <p className="text-lg text-text-secondary mb-10">
              A Eletrostart enfrentava o desafio da falta de visão em tempo real sobre seu estoque e vendas. Através de um Dashboard Interativo com BI em tempo real desenvolvido pela EvolveTech Solutions, a empresa conseguiu transformar sua operação.
            </p>
            
            <div className="bg-background-secondary p-8 rounded-2xl border border-white/5 mb-12">
              <h2 className="text-2xl font-bold mb-6 text-white">O Desafio</h2>
              <p className="text-text-secondary mb-8">
                Processos manuais limitavam a visibilidade dos dados operacionais, dificultando a tomada de decisão ágil e gerando ineficiências no controle de estoque e acompanhamento de vendas.
              </p>
              
              <h2 className="text-2xl font-bold mb-6 text-white">A Solução</h2>
              <p className="text-text-secondary mb-8">
                Foi desenvolvido um dashboard gerencial inteligente com Business Intelligence (BI) integrado, proporcionando visibilidade instantânea dos principais indicadores de desempenho (KPIs) da empresa.
              </p>
              
              <h2 className="text-2xl font-bold mb-6 text-white">Resultados</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-base p-6 rounded-xl border border-white/5 text-center">
                  <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">35%</div>
                  <div className="text-sm text-text-secondary">Mais vendas</div>
                </div>
                <div className="bg-base p-6 rounded-xl border border-white/5 text-center">
                  <Zap className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">50%</div>
                  <div className="text-sm text-text-secondary">Menos retrabalho</div>
                </div>
                <div className="bg-base p-6 rounded-xl border border-white/5 text-center">
                  <Target className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">85%</div>
                  <div className="text-sm text-text-secondary">Satisfação garantida</div>
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
