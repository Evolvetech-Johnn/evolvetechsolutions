"use client";

import Container from "@/components/Container";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Search, ClipboardList, Code, Rocket, Headset } from "lucide-react";

const steps = [
  { number: 1, icon: Search, title: "Diagnóstico", description: "Analisamos seus processos e identificamos oportunidades." },
  { number: 2, icon: ClipboardList, title: "Planejamento", description: "Criamos uma solução personalizada alinhada aos seus objetivos." },
  { number: 3, icon: Code, title: "Desenvolvimento", description: "Construímos seu sistema com as melhores tecnologias do mercado." },
  { number: 4, icon: Rocket, title: "Implantação", description: "Lançamos a solução com treinamento completo da sua equipe." },
  { number: 5, icon: Headset, title: "Suporte", description: "Acompanhamos você com suporte contínuo e melhorias." },
];

export default function Process() {
  return (
    <section id="processo" className="py-20 bg-surface">
      <Container>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent mb-4">
            Como Trabalhamos
          </div>
          <h2 className="text-h2 font-bold text-text-primary mb-4">
            Processo simples e eficiente
          </h2>
          <p className="text-text-secondary text-body max-w-2xl mx-auto">
            Metodologia testada e aprovada que garante resultados rápidos.
          </p>
        </div>
        
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-border hidden md:block" />
          
          <div className="space-y-8">
            {steps.map((step, index) => (
              <ProcessStep key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function ProcessStep({ step, index }: { step: typeof steps[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const Icon = step.icon;
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -30 : 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex items-center gap-8 md:gap-16"
    >
      <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left md:order-2'}`}>
        <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm">
          <h3 className="text-xl font-bold text-text-primary mb-2">{step.title}</h3>
          <p className="text-text-secondary">{step.description}</p>
        </div>
      </div>
      
      <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-accent/30">
        <Icon className="h-6 w-6" />
      </div>
      
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
}
