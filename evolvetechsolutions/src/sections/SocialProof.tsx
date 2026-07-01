"use client";

import Container from "@/components/Container";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";

const metrics = [
  { value: "50", label: "Projetos Entregues", suffix: "+" },
  { value: "20", label: "Empresas Atendidas", suffix: "+" },
  { value: "95", label: "de Satisfação", suffix: "%" },
  { value: "100.000", label: "Processos Automatizados", suffix: "+" },
];

const logos = [
  "Compras Londrina", "Eletrostart", "Start Solar", "Tech Solutions", 
  "Inova Corp", "Future Tech", "Digital Labs", "Growth Hub"
];

export default function SocialProof() {
  return (
    <section className="py-12 md:py-16 bg-brand-surface border-y border-brand-border overflow-hidden">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-2xl md:text-h3 font-semibold text-brand-text mb-2">
            Resultados Comprovados
          </h2>
          <p className="text-brand-text-muted">
            Empresas que confiaram em nós e transformaram suas operações
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8 mb-12 md:mb-16">
          {metrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} index={index} />
          ))}
        </div>
        
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-brand-surface to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-brand-surface to-transparent z-10" />
          
          <motion.div
            className="flex gap-8 md:gap-16"
            animate={{ x: [0, -800] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[...logos, ...logos].map((logo, index) => (
              <div key={index} className="flex-shrink-0 text-brand-text-muted font-semibold text-sm md:text-lg opacity-60 hover:opacity-100 transition-opacity">
                {logo}
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function MetricCard({ metric, index }: { metric: typeof metrics[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center"
    >
      <div className="text-3xl sm:text-4xl md:text-h1 font-bold bg-gradient-to-r from-brand-accent to-brand-accent-light bg-clip-text text-transparent">
        {inView ? (
          <AnimatedCounter target={metric.value.replace(/\D/g, "")} suffix={metric.suffix} />
        ) : (
            "0"
          )}
      </div>
      <div className="text-xs sm:text-sm text-brand-text-muted mt-2">{metric.label}</div>
    </motion.div>
  );
}

function AnimatedCounter({ target, suffix }: { target: string; suffix: string }) {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });
  const numericTarget = parseFloat(target);
  
  return (
    <span ref={ref}>
      {inView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {target}{suffix}
        </motion.span>
      ) : (
        "0"
      )}
    </span>
  );
}
