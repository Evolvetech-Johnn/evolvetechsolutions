"use client";

import Container from "@/components/Container";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "Quanto tempo leva para desenvolver um sistema sob medida?",
    answer: "O prazo varia de acordo com a complexidade, mas projetos iniciais costumam levar de 4 a 8 semanas. Após entendermos sua necessidade, definimos um cronograma claro e entregamos em etapas funcionais.",
  },
  {
    question: "Qual a diferença entre um sistema sob medida e um SaaS pronto?",
    answer: "Um SaaS pronto obriga sua empresa a adaptar seus processos ao software. Já o sistema sob medida é construído exatamente para o seu fluxo de trabalho, garantindo 100% de aderência e sem taxas mensais por usuário.",
  },
  {
    question: "Como funciona o suporte depois da entrega?",
    answer: "Oferecemos um período de garantia para qualquer correção necessária e planos de manutenção flexíveis. Nossa equipe continua à disposição para evoluir o sistema conforme seu negócio cresce.",
  },
  {
    question: "Quais tecnologias vocês usam?",
    answer: "Trabalhamos com as stacks mais modernas e consolidadas do mercado, como React, Next.js, Node.js e bancos de dados em nuvem. Isso garante que seu sistema seja rápido, seguro e escalável.",
  },
  {
    question: "Como funciona o orçamento (ticket de R$3k–R$15k+)?",
    answer: "Nosso orçamento é baseado no escopo e nas funcionalidades necessárias, variando tipicamente de R$ 3 mil a R$ 15 mil+ para projetos maiores. Dividimos o valor conforme as entregas para facilitar o investimento.",
  },
];

export default function FAQ() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="faq" className="py-12 md:py-20 bg-brand-surface overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-accent/10 px-4 py-2 text-sm font-semibold text-brand-accent mb-4">
            Dúvidas Frequentes
          </div>
          <h2 className="text-2xl md:text-h2 font-bold text-brand-text mb-4">
            Respostas para suas perguntas
          </h2>
          <p className="text-brand-text-muted text-body max-w-2xl mx-auto">
            Aqui estão as dúvidas mais comuns de quem avalia nossos serviços.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="border border-brand-border rounded-2xl overflow-hidden bg-brand-surface"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-brand-surface-alt transition-colors"
      >
        <span className="font-semibold text-brand-text text-lg">{faq.question}</span>
        {isOpen ? (
          <ChevronUp className="h-6 w-6 text-brand-accent flex-shrink-0" />
        ) : (
          <ChevronDown className="h-6 w-6 text-brand-accent flex-shrink-0" />
        )}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6 pt-0 text-brand-text-muted">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
