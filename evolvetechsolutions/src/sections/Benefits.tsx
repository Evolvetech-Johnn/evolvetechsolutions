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
    <section id="beneficios" className="py-20 bg-white">
      <Container>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-success/10 px-4 py-2 text-sm font-semibold text-success mb-4">
            Vantagens
          </div>
          <h2 className="text-h2 font-bold text-primary mb-4">
            O que sua empresa ganha
          </h2>
          <p className="text-text-secondary text-body max-w-2xl mx-auto">
            Soluções que realmente transformam a forma como sua empresa opera.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-ink-50 border border-border hover:border-brand-200 hover:bg-brand-50 transition-all">
        <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0 group-hover:scale-110 transition-transform" />
        <span className="font-semibold text-primary">{benefit}</span>
      </div>
    </motion.div>
  );
}
