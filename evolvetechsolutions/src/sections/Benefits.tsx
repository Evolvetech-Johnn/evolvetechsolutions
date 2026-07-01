"use client";

import Container from "@/components/Container";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const benefits = [
  "Redução de custos",
  "Mais produtividade",
  "Dados em tempo real",
  "Menos erros",
  "Escalabilidade",
  "Automação de processos",
  "Decisões baseadas em dados",
  "Integração total da operação",
];

export default function Benefits() {
  return (
    <section id="beneficios" className="py-12 md:py-20 bg-brand-surface overflow-hidden">
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-action/10 px-4 py-2 text-sm font-semibold text-brand-action mb-4">
            Vantagens
          </div>
          <h2 className="text-2xl md:text-h2 font-bold text-brand-text mb-4">
            O que sua empresa ganha
          </h2>
          <p className="text-brand-text-muted text-body max-w-2xl mx-auto">
            Soluções que realmente transformam a forma como sua empresa opera.
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-6">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function BenefitCard({ benefit, index }: { benefit: string; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-brand-surface-alt border border-brand-border hover:border-brand-accent hover:bg-brand-accent/5 transition-all">
        <CheckCircle2 className="h-6 w-6 text-brand-action flex-shrink-0 group-hover:scale-110 transition-transform" />
        <span className="font-semibold text-brand-text">{benefit}</span>
      </div>
    </motion.div>
  );
}
