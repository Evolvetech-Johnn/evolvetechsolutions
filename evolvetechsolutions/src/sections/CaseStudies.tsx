"use client";

import Container from "@/components/Container";
import Card from "@/components/Card";
import { ButtonLink } from "@/components/Button";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { TrendingUp, Target, Zap } from "lucide-react";

const caseStudies = [
  {
    company: "Compras Londrina",
    problem: "Processos de compras descentralizados em planilhas.",
    solution: "Sistema integrado de gestão de compras e fornecedores.",
    results: [
      { metric: "40%", label: "Redução de custos", icon: TrendingUp },
      { metric: "60%", label: "Mais produtividade", icon: Zap },
      { metric: "100%", label: "Controle total", icon: Target },
    ],
  },
  {
    company: "Eletrostart",
    problem: "Falta de visão real-time do estoque e vendas.",
    solution: "Dashboard interativo com BI em tempo real.",
    results: [
      { metric: "35%", label: "Mais vendas", icon: TrendingUp },
      { metric: "50%", label: "Menos retrabalho", icon: Zap },
      { metric: "85%", label: "Satisfação", icon: Target },
    ],
  },
  {
    company: "Start Solar",
    problem: "Processos manuais de instalação e atendimento.",
    solution: "App móvel + CRM personalizado.",
    results: [
      { metric: "70%", label: "Mais velocidade", icon: TrendingUp },
      { metric: "45%", label: "Menos erros", icon: Zap },
      { metric: "95%", label: "Satisfação cliente", icon: Target },
    ],
  },
];

export default function CaseStudies() {
  return (
    <section id="casos" className="py-20 bg-base">
      <Container>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-success/10 px-4 py-2 text-sm font-semibold text-success mb-4">
            Casos de Sucesso
          </div>
          <h2 className="text-h2 font-bold text-primary mb-4">
            Empresas que transformamos
          </h2>
          <p className="text-text-secondary text-body max-w-2xl mx-auto">
            Veja como nossos clientes alcançaram resultados extraordinários.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={index} study={study} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function CaseStudyCard({ study, index }: { study: typeof caseStudies[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <Card className="border border-border overflow-hidden">
        <div className="bg-gradient-to-r from-accent to-accent-light p-6 text-white">
          <h3 className="text-xl font-bold">{study.company}</h3>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <div className="text-xs font-semibold text-red-400 mb-1">Desafio</div>
            <p className="text-text-secondary">{study.problem}</p>
          </div>
          
          <div className="mb-6">
            <div className="text-xs font-semibold text-accent mb-1">Solução</div>
            <p className="text-text-secondary">{study.solution}</p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            {study.results.map((result, i) => {
              const Icon = result.icon;
              return (
                <div key={i} className="text-center p-3 bg-surface rounded-xl border border-border">
                  <Icon className="h-5 w-5 text-success mx-auto mb-1" />
                  <div className="text-lg font-bold text-text-primary">{result.metric}</div>
                  <div className="text-xs text-text-secondary">{result.label}</div>
                </div>
              );
            })}
          </div>
          
          <ButtonLink href="#contato" className="w-full bg-accent hover:bg-accent-light text-white">
            Ver caso completo
          </ButtonLink>
        </div>
      </Card>
    </motion.div>
  );
}
