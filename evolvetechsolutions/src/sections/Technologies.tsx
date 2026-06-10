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
  BrainCircuit 
} from "lucide-react";

const technologies = [
  { name: "React", icon: Code2, color: "text-cyan-500" },
  { name: "Next.js", icon: Layers, color: "text-gray-900" },
  { name: "Node.js", icon: Server, color: "text-green-600" },
  { name: "Python", icon: Cpu, color: "text-blue-500" },
  { name: "PostgreSQL", icon: Database, color: "text-blue-600" },
  { name: "Docker", icon: Server, color: "text-blue-400" },
  { name: "AWS", icon: Globe, color: "text-orange-500" },
  { name: "Azure", icon: Globe, color: "text-blue-700" },
  { name: "OpenAI", icon: BrainCircuit, color: "text-violet-600" },
  { name: "LangChain", icon: Layers, color: "text-emerald-600" },
];

export default function Technologies() {
  return (
    <section className="py-20 bg-white">
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
      whileHover={{ y: -4, scale: 1.05 }}
      className="group"
    >
      <div className="flex flex-col items-center p-6 rounded-2xl bg-ink-50 border border-border hover:border-brand-200 hover:bg-brand-50 transition-all">
        <Icon className={`h-10 w-10 ${tech.color} mb-3 group-hover:scale-110 transition-transform`} />
        <span className="font-semibold text-primary">{tech.name}</span>
      </div>
    </motion.div>
  );
}
