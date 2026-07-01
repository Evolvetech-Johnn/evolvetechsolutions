"use client";

import Container from "@/components/Container";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { 
  Code2, 
  Layers, 
  Cpu, 
  Database, 
  Server, 
  Globe, 
  BrainCircuit,
  Cloud,
  CloudRain,
  Image,
  Sparkles
} from "lucide-react";

const technologies = [
  { 
    name: "React", 
    icon: Code2, 
    color: "text-cyan-500", 
    description: "Biblioteca para interfaces rápidas e interativas" 
  },
  { 
    name: "Next.js", 
    icon: Layers, 
    color: "text-gray-900", 
    description: "Framework React com SSR e otimizações de performance" 
  },
  { 
    name: "Node.js", 
    icon: Server, 
    color: "text-green-600", 
    description: "Servidor JavaScript para APIs rápidas e escaláveis" 
  },
  { 
    name: "Python", 
    icon: Cpu, 
    color: "text-blue-500", 
    description: "Versátil para automações, dados e IA" 
  },
  { 
    name: "PostgreSQL", 
    icon: Database, 
    color: "text-blue-600", 
    description: "Banco relacional robusto e seguro para dados críticos" 
  },
  { 
    name: "MongoDB Atlas", 
    icon: Database, 
    color: "text-green-500", 
    description: "Banco NoSQL gerenciado, escalável e flexível" 
  },
  { 
    name: "Docker", 
    icon: Server, 
    color: "text-blue-400", 
    description: "Contêineres para consistência em todos os ambientes" 
  },
  { 
    name: "AWS", 
    icon: Globe, 
    color: "text-orange-500", 
    description: "Infraestrutura escalável e segura na nuvem" 
  },
  { 
    name: "Azure", 
    icon: Cloud, 
    color: "text-blue-700", 
    description: "Plataforma de cloud empresarial com serviços completos" 
  },
  { 
    name: "Render", 
    icon: CloudRain, 
    color: "text-cyan-600", 
    description: "Deploy rápido e fácil para aplicativos modernos" 
  },
  { 
    name: "OpenAI", 
    icon: BrainCircuit, 
    color: "text-violet-600", 
    description: "IA para automações inteligentes e chatbots" 
  },
  { 
    name: "LangChain", 
    icon: Sparkles, 
    color: "text-emerald-600", 
    description: "Orquestração de IA para apps complexos" 
  },
  { 
    name: "Cloudinary", 
    icon: Image, 
    color: "text-indigo-500", 
    description: "Gerenciamento e otimização de imagens e vídeos na cloud" 
  },
];

export default function Technologies() {
  return (
    <section className="py-20 bg-base">
      <Container>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-ink-100 px-4 py-2 text-sm font-semibold text-ink-700 mb-4">
            Tecnologias
          </div>
          <h2 className="text-h2 font-bold text-primary mb-4">
            Usamos as melhores ferramentas do mercado
          </h2>
          <p className="text-text-secondary text-body max-w-2xl mx-auto">
            Stack moderna e robusta para garantir performance, segurança e escalabilidade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <TechCard key={index} tech={tech} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function TechCard({ tech, index }: { tech: typeof technologies[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const Icon = tech.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="group"
    >
      <div className="flex flex-col items-start p-6 rounded-2xl bg-ink-50 border border-border hover:border-brand-200 hover:bg-brand-50 transition-all">
        <div className="flex items-center gap-3 mb-3">
          <Icon className={`h-10 w-10 ${tech.color} group-hover:scale-110 transition-transform flex-shrink-0`} />
          <span className="font-bold text-lg text-primary">{tech.name}</span>
        </div>
        <p className="text-sm text-ink-500 leading-relaxed">{tech.description}</p>
      </div>
    </motion.div>
  );
}
