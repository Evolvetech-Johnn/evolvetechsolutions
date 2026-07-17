import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CookieBanner from "@/components/CookieBanner";
import GlobalBackground from "@/components/GlobalBackground";
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
    <div className="min-h-dvh bg-ink-950 text-white relative">
      <GlobalBackground />
      <Navbar />
      <main className="pt-32 pb-16 relative z-10">
        <section className="container mx-auto px-4 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white tracking-tight">
              EvolveTech CRM: Assuma o Controle do Seu Negócio
            </h1>
            <p className="text-lg lg:text-xl text-white/70 mb-10 leading-relaxed">
              O EvolveTech CRM é um sistema desenvolvido sob medida para ajudar
              empresas a centralizar o controle de vendas, acompanhar o
              relacionamento com clientes e automatizar processos repetitivos.
              Ideal para negócios que precisam escalar com organização, nossa
              plataforma oferece dashboards intuitivos, gestão de leads e
              integrações exclusivas.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mb-12 text-left">
              <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/10 backdrop-blur">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-neon-cyan">
                  <CheckCircle2 />
                  Para Quem É
                </h2>
                <ul className="space-y-4 text-white/70">
                  <li className="flex items-start gap-2"><ArrowRight className="text-neon-cyan shrink-0 w-5 h-5" />Empresas com processos de vendas complexos</li>
                  <li className="flex items-start gap-2"><ArrowRight className="text-neon-cyan shrink-0 w-5 h-5" />Equipes comerciais que precisam de métricas claras</li>
                  <li className="flex items-start gap-2"><ArrowRight className="text-neon-cyan shrink-0 w-5 h-5" />Gestores em busca de previsibilidade de receita</li>
                </ul>
              </div>
              <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/10 backdrop-blur">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-neon-purple">
                  <CheckCircle2 />
                  Principais Funcionalidades
                </h2>
                <ul className="space-y-4 text-white/70">
                  <li className="flex items-start gap-2"><ArrowRight className="text-neon-purple shrink-0 w-5 h-5" />Gestão de pipeline de vendas e funil</li>
                  <li className="flex items-start gap-2"><ArrowRight className="text-neon-purple shrink-0 w-5 h-5" />Dashboards gerenciais em tempo real</li>
                  <li className="flex items-start gap-2"><ArrowRight className="text-neon-purple shrink-0 w-5 h-5" />Automação de follow-ups e propostas</li>
                </ul>
              </div>
            </div>
            <div className="flex justify-center">
              <Link
                href="https://wa.me/5543999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl font-semibold transition will-change-transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-neon-cyan/40 before:absolute before:inset-0 before:opacity-0 before:transition before:duration-300 hover:before:opacity-100 before:bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.18),transparent_50%)] after:absolute after:-left-1/2 after:top-0 after:h-full after:w-1/2 after:skew-x-[-20deg] after:bg-white/20 after:opacity-0 after:transition after:duration-500 group-hover:after:translate-x-[240%] group-hover:after:opacity-100 bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple text-ink-950 shadow-glowStrong h-12 px-8 text-base"
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
      <CookieBanner />
    </div>
  );
}
