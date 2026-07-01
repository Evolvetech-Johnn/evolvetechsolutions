"use client";

import Container from "@/components/Container";
import Card from "@/components/Card";
import { Button } from "@/components/Button";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { 
  Building2, 
  Scissors, 
  Home, 
  BriefcaseBusiness 
} from "lucide-react";

const demos = [
  { 
    icon: Building2, 
    title: "Sites para Advogados", 
    description: "Site institucional dentro das normas da OAB com áreas de atuação claras.",
    href: "/demos/evolvetech-advogados.html"
  },
  { 
    icon: Scissors, 
    title: "Sistema para Barbearias", 
    description: "Sistema de agendamento online, controle de fila e gestão de comissões.",
    href: "/demos/evolvetech-barbearias.html"
  },
  { 
    icon: Home, 
    title: "Landing Pages para Imobiliárias", 
    description: "Páginas de captação por imóvel, formulário direto no WhatsApp.",
    href: "/demos/evolvetech-imobiliarias.html"
  },
  { 
    icon: BriefcaseBusiness, 
    title: "MEI360 - Sistema para MEI", 
    description: "Controle de faturamento em tempo real e alertas de DAS.",
    href: "/demos/evolvetech-mei360.html"
  },
];

export default function Demos() {
  return (
    <section id="demos" className="py-12 md:py-20 bg-brand-surface overflow-hidden">
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-accent/10 px-4 py-2 text-sm font-semibold text-brand-accent mb-4">
            Demos Interativas
          </div>
          <h2 className="text-2xl md:text-h2 font-bold text-brand-text mb-4">
            Veja as soluções em ação
          </h2>
          <p className="text-brand-text-muted text-body max-w-2xl mx-auto">
            Confira demos prontas de soluções que já desenvolvemos para diferentes nichos.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {demos.map((demo, index) => (
            <DemoCard key={index} demo={demo} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function DemoCard({ demo, index }: { demo: typeof demos[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const Icon = demo.icon;
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <Card className="border border-brand-border h-full flex flex-col">
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-accent to-brand-accent-light text-white">
          <Icon className="h-7 w-7" />
        </div>
        <h3 className="text-xl font-semibold text-brand-text mb-3">{demo.title}</h3>
        <p className="text-brand-text-muted mb-6 flex-grow">{demo.description}</p>
        <a href={demo.href} target="_blank" rel="noopener noreferrer">
          <Button variant="secondary" className="w-full">
            Ver Demo
          </Button>
        </a>
      </Card>
    </motion.div>
  );
}
