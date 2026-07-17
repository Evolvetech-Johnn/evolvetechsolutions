import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Link from "next/link";
import { ArrowLeft, TrendingUp, Zap, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "Case de Sucesso: Start Solar | EvolveTech Solutions",
  description: "Como a Start Solar otimizou seus processos manuais de instalação e atendimento através de um App móvel e CRM personalizado.",
  alternates: {
    canonical: "/portfolio/start-solar",
  },
};

export default function StartSolarCase() {
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
            <h1 className="text-4xl font-bold mb-6 text-primary">Case: Start Solar</h1>
            <p className="text-lg text-text-secondary mb-10">
              A Start Solar enfrentava gargalos operacionais devido a processos manuais de instalação e atendimento. A EvolveTech Solutions resolveu isso criando um aplicativo móvel associado a um CRM sob medida.
            </p>
            
            <div className="bg-background-secondary p-8 rounded-2xl border border-white/5 mb-12">
              <h2 className="text-2xl font-bold mb-6 text-white">O Desafio</h2>
              <p className="text-text-secondary mb-8">
                O gerenciamento das instalações e o relacionamento com os clientes dependiam de métodos manuais suscetíveis a erros, o que retardava o atendimento e reduzia a satisfação geral dos clientes.
              </p>
              
              <h2 className="text-2xl font-bold mb-6 text-white">A Solução</h2>
              <p className="text-text-secondary mb-8">
                Desenvolvimento de um ecossistema digital composto por um Aplicativo Móvel para a equipe técnica de campo e um CRM Personalizado para o backoffice, garantindo agilidade e precisão nas informações.
              </p>
              
              <h2 className="text-2xl font-bold mb-6 text-white">Resultados</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-base p-6 rounded-xl border border-white/5 text-center">
                  <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">70%</div>
                  <div className="text-sm text-text-secondary">Mais velocidade</div>
                </div>
                <div className="bg-base p-6 rounded-xl border border-white/5 text-center">
                  <Zap className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">45%</div>
                  <div className="text-sm text-text-secondary">Menos erros</div>
                </div>
                <div className="bg-base p-6 rounded-xl border border-white/5 text-center">
                  <Target className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">95%</div>
                  <div className="text-sm text-text-secondary">Satisfação do cliente</div>
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
