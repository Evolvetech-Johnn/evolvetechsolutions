"use client";

import Container from "@/components/Container";
import Card from "@/components/Card";
import { ButtonLink } from "@/components/Button";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { 
  Code2, 
  BarChart3, 
  Building2, 
  Users, 
  Brain, 
  Smartphone, 
  Zap 
} from "lucide-react";

const services = [
  { icon: Code2, title: "Desenvolvimento de Sistemas", description: "Sob medida para atender exatamente às necessidades da sua empresa.", cta: "Saiba mais" },
  { icon: BarChart3, title: "Painéis de BI", description: "Dashboards interativos com dados em tempo real para decisões assertivas.", cta: "Ver exemplo" },
  { icon: Building2, title: "ERP Sob Medida", description: "Sistema integrado que centraliza todos os processos do seu negócio.", cta: "Conhecer" },
  { icon: Users, title: "CRM Personalizado", description: "Gestão de relacionamento com clientes adaptada ao seu fluxo de trabalho.", cta: "Entender melhor" },
  { icon: Brain, title: "IA Corporativa", description: "Inteligência Artificial para automatizar tarefas e gerar insights.", cta: "Explorar" },
  { icon: Smartphone, title: "Aplicativos para Celular", description: "Apps nativos ou híbridos para Android e iOS.", cta: "Ver casos" },
  { icon: Zap, title: "Automação Empresarial", description: "Automatize processos repetitivos e foque no que realmente importa.", cta: "Automatizar" },
];

export default function Services() {
  return (
    <section id="servicos" className="py-20 bg-ink-50">
      <Container>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-2 text-sm font-semibold text-brand-700 mb-4">
            Nossos Serviços
          </div>
          <h2 className="text-h2 font-bold text-primary mb-4">
            Soluções que impulsionam o crescimento
          </h2>
          <p className="text-text-secondary text-body max-w-2xl mx-auto">
            Oferecemos um portfólio completo de serviços de tecnologia para transformar sua empresa.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const Icon = service.icon;
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <Card className="bg-white border border-border h-full flex flex-col">
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent text-white">
          <Icon className="h-7 w-7" />
        </div>
        <h3 className="text-xl font-semibold text-primary mb-3">{service.title}</h3>
        <p className="text-text-secondary mb-6 flex-grow">{service.description}</p>
        <ButtonLink href="#contato" variant="ghost" className="text-brand-600 hover:text-brand-700 p-0 h-auto font-semibold">
          {service.cta} →
        </ButtonLink>
      </Card>
    </motion.div>
  );
}
