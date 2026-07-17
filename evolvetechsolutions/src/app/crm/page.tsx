import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "EvolveTech CRM | Gestão Inteligente para sua Empresa",
  description:
    "Conheça o EvolveTech CRM, um sistema sob medida para gerenciar vendas, clientes e processos com foco no aumento de lucro e controle operacional.",
  alternates: {
    canonical: "/crm",
  },
  openGraph: {
    title: "EvolveTech CRM | Gestão Inteligente para sua Empresa",
    description:
      "Conheça o EvolveTech CRM, um sistema sob medida para gerenciar vendas, clientes e processos com foco no aumento de lucro e controle operacional.",
    url: "https://www.evolvetechsolutions.com.br/crm",
    images: [
      {
        url: "/banner.jpg",
        width: 1200,
        height: 630,
        alt: "EvolveTech CRM",
      },
    ],
  },
  twitter: {
    title: "EvolveTech CRM | Gestão Inteligente para sua Empresa",
    description:
      "Conheça o EvolveTech CRM, um sistema sob medida para gerenciar vendas, clientes e processos.",
    images: ["/banner.jpg"],
  },
};

export default function CRMPage() {
  return (
    <div className="min-h-screen bg-base text-text-primary">
      <Navbar />
      <main className="pt-24 pb-16">
        <section className="container mx-auto px-4 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-primary">
              EvolveTech CRM: Assuma o Controle do Seu Negócio
            </h1>
            <p className="text-lg lg:text-xl text-text-secondary mb-10">
              O EvolveTech CRM é um sistema desenvolvido sob medida para ajudar
              empresas a centralizar o controle de vendas, acompanhar o
              relacionamento com clientes e automatizar processos repetitivos.
              Ideal para negócios que precisam escalar com organização, nossa
              plataforma oferece dashboards intuitivos, gestão de leads e
              integrações exclusivas.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mb-12 text-left">
              <div className="bg-background-secondary p-6 rounded-2xl border border-white/5">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="text-primary" />
                  Para Quem É
                </h2>
                <ul className="space-y-3 text-text-secondary">
                  <li>Empresas com processos de vendas complexos</li>
                  <li>Equipes comerciais que precisam de métricas claras</li>
                  <li>Gestores em busca de previsibilidade de receita</li>
                </ul>
              </div>
              <div className="bg-background-secondary p-6 rounded-2xl border border-white/5">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="text-primary" />
                  Principais Funcionalidades
                </h2>
                <ul className="space-y-3 text-text-secondary">
                  <li>Gestão de pipeline de vendas e funil</li>
                  <li>Dashboards gerenciais em tempo real</li>
                  <li>Automação de follow-ups e propostas</li>
                </ul>
              </div>
            </div>
            <div className="flex justify-center">
              <Link
                href="https://wa.me/5543999999999" // TODO: Use actual whatsapp number if available in site config
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-full flex items-center gap-2 transition-colors"
              >
                Fale com um Especialista
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
