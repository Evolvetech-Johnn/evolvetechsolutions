"use client";

import Container from "@/components/Container";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "Quanto tempo leva para desenvolver um sistema?",
    answer: "O prazo varia de acordo com a complexidade do projeto. Projetos simples levam em média 4 a 8 semanas, enquanto projetos mais complexos podem levar de 3 a 6 meses. Durante o diagnóstico gratuito, definimos um cronograma detalhado.",
  },
  {
    question: "Vocês oferecem suporte após a implantação?",
    answer: "Sim! Oferecemos planos de suporte contínuo com diferentes níveis de atendimento, desde suporte básico até suporte dedicado 24/7. Todos os nossos projetos incluem um período de garantia inicial.",
  },
  {
    question: "Posso integrar o novo sistema com ferramentas que já uso?",
    answer: "Absolutamente! Nossas soluções são desenvolvidas para se integrar perfeitamente com as ferramentas que você já utiliza, como ERP's, CRM's, plataformas de e-commerce, entre outras.",
  },
  {
    question: "Qual o investimento necessário para um sistema sob medida?",
    answer: "O investimento depende do escopo do projeto. Oferecemos soluções para empresas de todos os tamanhos, com opções de pagamento flexíveis. Entre em contato para um diagnóstico gratuito e orçamento personalizado.",
  },
  {
    question: "Vocês atendem empresas de qualquer setor?",
    answer: "Sim! Já atendemos clientes de diversos setores como varejo, manufatura, serviços, saúde, educação, entre outros. Nossa metodologia se adapta às particularidades de cada negócio.",
  },
  {
    question: "Como funciona o diagnóstico gratuito?",
    answer: "O diagnóstico é uma consultoria inicial onde analisamos seus processos, identificamos oportunidades de melhoria e apresentamos uma proposta de solução personalizada. É 100% gratuito e sem compromisso.",
  },
  {
    question: "Os dados da minha empresa estarão seguros?",
    answer: "Segurança é nossa prioridade! Utilizamos as melhores práticas de segurança da informação, criptografia de dados, servidores seguros (AWS/Azure) e seguimos rigorosamente a LGPD.",
  },
  {
    question: "Posso fazer alterações no projeto durante o desenvolvimento?",
    answer: "Sim! Trabalhamos com metodologias ágeis que permitem ajustes ao longo do desenvolvimento. Mantemos comunicação constante para garantir que o resultado final seja exatamente o que você precisa.",
  },
  {
    question: "Vocês oferecem treinamento para a equipe?",
    answer: "Sim! Todos os nossos projetos incluem treinamento completo para sua equipe aprender a usar a nova solução. Também oferecemos materiais de apoio como manuais e videoaulas.",
  },
  {
    question: "Por que escolher a EvolveTech ao invés de uma solução pronta?",
    answer: "Soluções prontas muitas vezes exigem que você adapte seu negócio ao software. Nós fazemos o contrário: adaptamos o software ao seu negócio, garantindo máxima eficiência e adoção pela equipe.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-12 md:py-20 bg-brand-surface overflow-hidden">
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-accent/10 px-4 py-2 text-sm font-semibold text-brand-accent mb-4">
            Dúvidas Frequentes
          </div>
          <h2 className="text-2xl md:text-h2 font-bold text-brand-text mb-4">
            Respostas para suas perguntas
          </h2>
          <p className="text-brand-text-muted text-body max-w-2xl mx-auto">
            Aqui estão as dúvidas mais comuns dos nossos clientes.
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
