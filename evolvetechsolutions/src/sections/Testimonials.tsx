"use client";

import Container from "@/components/Container";
import Card from "@/components/Card";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "A EvolveTech transformou completamente nossos processos. A produtividade aumentou 60% e temos total controle do negócio.",
    name: "Marcos Gusmão",
    role: "Diretor de Marketing",
    company: "Compras Londrina",
  },
  {
    quote: "O dashboard que desenvolveram nos deu visibilidade em tempo real. As decisões agora são baseadas em dados, não em suposições.",
    name: "Julio Cesar Gomes",
    role: "Diretor Executivo",
    company: "Eletrostart",
  },
  {
    quote: "Suporte impecável e resultado acima das expectativas. Recomendo fortemente para qualquer empresa que queira crescer com tecnologia.",
    name: "Julio Cesar Gomes",
    role: "Proprietário",
    company: "Start Solar",
  },
  {
    quote: "Automatizamos tarefas que levavam dias. Agora nossa equipe foca no que realmente importa: o cliente.",
    name: "Ana Costa",
    role: "Gerente Geral",
    company: "Tech Solutions",
  },
  {
    quote: "Sistema sob medida perfeito para as nossas necessidades. Não imaginávamos que poderíamos ter uma ferramenta tão alinhada ao nosso negócio.",
    name: "Wanderlei Olavo",
    role: "Diretor Executivo",
    company: "Inova Londrina Estruturas Metalicas",
  },
  {
    quote: "Processo de implantação suave e equipe super capacitada. Melhor investimento que fizemos nos últimos anos.",
    name: "Carla Ferreira",
    role: "Presidente",
    company: "Future Tech",
  },
];

export default function Testimonials() {
  return (
    <section className="py-12 md:py-20 bg-brand-surface overflow-hidden">
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-action/10 px-4 py-2 text-sm font-semibold text-brand-action mb-4">
            Depoimentos
          </div>
          <h2 className="text-2xl md:text-h2 font-bold text-brand-text mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-brand-text-muted text-body max-w-2xl mx-auto">
            Empresas que confiaram na EvolveTech para transformar seus negócios.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <Card className="border border-brand-border">
        <Quote className="h-8 w-8 text-brand-accent/30 mb-4" />
        <p className="text-brand-text-muted mb-6 italic">"{testimonial.quote}"</p>
        
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-brand-accent to-brand-accent-light flex items-center justify-center text-white font-bold text-lg">
            {testimonial.name.charAt(0)}
          </div>
          <div>
            <div className="font-semibold text-brand-text">{testimonial.name}</div>
            <div className="text-sm text-brand-text-muted">
              {testimonial.role}, {testimonial.company}
            </div>
          </div>
        </div>
        
        <div className="flex gap-1 mt-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
