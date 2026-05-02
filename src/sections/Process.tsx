import { motion } from "framer-motion";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Card from "@/components/Card";
import Badge from "@/components/Badge";

const steps = [
  {
    n: "01",
    title: "Diagnóstico",
    desc: "Entendemos seu processo, dores e objetivos. Mapeamos gargalos, riscos e oportunidades de lucro."
  },
  {
    n: "02",
    title: "Planejamento",
    desc: "Definimos escopo, prioridades e jornadas. Você aprova antes de construir. Sem surpresa no final."
  },
  {
    n: "03",
    title: "Desenvolvimento",
    desc: "Entrega incremental com validação. Performance, segurança e UX/UI no padrão premium."
  },
  {
    n: "04",
    title: "Entrega",
    desc: "Treinamento, ajustes finos e handoff profissional. Seu time usa, sua operação evolui."
  }
];

function IconRoadmap() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-white/80" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19V5" />
      <path d="M20 19V5" />
      <path d="M9 7h6" />
      <path d="M9 12h6" />
      <path d="M9 17h6" />
    </svg>
  );
}

export default function Process() {
  return (
    <section id="processo" className="relative bg-ink-950">
      <Container className="py-16 md:py-24">
        <SectionHeading
          eyebrow="Processo"
          title="Fluxo claro. Prazo previsível. Entrega com padrão profissional."
          subtitle="Projetos sob medida dão certo quando existe método. O objetivo é reduzir risco, acelerar a decisão e entregar um produto digital que o time realmente usa."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {steps.map((s, idx) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20% 0px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.06 }}
            >
              <Card
                icon={<IconRoadmap />}
                title={
                  <div className="flex items-center gap-3">
                    <Badge className="text-white/90">{s.n}</Badge>
                    <span>{s.title}</span>
                  </div>
                }
                description={s.desc}
                className="h-full"
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

