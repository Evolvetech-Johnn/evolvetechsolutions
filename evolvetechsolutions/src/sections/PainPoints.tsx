"use client";

import Container from "@/components/Container";
import Card from "@/components/Card";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { 
  FileSpreadsheet, 
  TrendingDown, 
  RefreshCw, 
  BookOpen, 
  Lock, 
  PlugZap 
} from "lucide-react";

const painPoints = [
  { icon: FileSpreadsheet, title: "Planilhas Descentralizadas", description: "Dados dispersos em múltiplos arquivos dificultam a visão geral do negócio." },
  { icon: TrendingDown, title: "Falta de Indicadores", description: "Não há métricas claras para tomar decisões baseadas em dados reais." },
  { icon: RefreshCw, title: "Retrabalho", description: "Tarefas repetitivas gastam tempo que poderia ser usado em atividades estratégicas." },
  { icon: BookOpen, title: "Manuais de Processos", description: "Processos dependem de pessoas e não de sistemas estruturados." },
  { icon: Lock, title: "Sistemas Limitados", description: "Ferramentas genéricas não atendem às necessidades específicas da sua empresa." },
  { icon: PlugZap, title: "Falta de Integração", description: "Diferentes sistemas não se comunicam, gerando silos de informação." },
];

export default function PainPoints() {
  return (
    <section id="dores" className="py-20 bg-ink-50">
      <Container>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-2 text-sm font-semibold text-brand-700 mb-4">
            Problemas Comuns
          </div>
          <h2 className="text-h2 font-bold text-primary mb-4">
            Sua empresa enfrenta estes problemas?
          </h2>
          <p className="text-text-secondary text-body max-w-2xl mx-auto">
            Identificamos os desafios que impedem o crescimento de empresas como a sua.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {painPoints.map((point, index) => (
            <PainPointCard key={index} point={point} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function PainPointCard({ point, index }: { point: typeof painPoints[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const Icon = point.icon;
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
    >
      <Card className="bg-white border border-border hover:border-brand-200 transition-all">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-semibold text-primary mb-2">{point.title}</h3>
        <p className="text-text-secondary">{point.description}</p>
      </Card>
    </motion.div>
  );
}
