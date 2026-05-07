import { motion } from "framer-motion";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Badge from "@/components/Badge";
import { ClipboardList, Route, Hammer, CheckCircle2 } from "lucide-react";

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

export default function Process() {
  return (
    <section id="processo" className="relative bg-ink-950">
      <Container className="py-16 md:py-24">
        <SectionHeading
          eyebrow="Processo"
          title="Fluxo claro. Prazo previsível. Entrega com padrão profissional."
          subtitle="Projetos sob medida dão certo quando existe método. O objetivo é reduzir risco, acelerar a decisão e entregar um produto digital que o time realmente usa."
        />

        <div className="relative mt-12">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-neon-cyan/40 via-white/10 to-neon-purple/40 md:block" />
          <div className="absolute left-1/2 top-6 hidden h-px w-[86%] -translate-x-1/2 bg-gradient-to-r from-neon-cyan/30 via-white/10 to-neon-purple/30 lg:block" />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, idx) => {
              const Icon =
                idx === 0
                  ? ClipboardList
                  : idx === 1
                    ? Route
                    : idx === 2
                      ? Hammer
                      : CheckCircle2;

              return (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20% 0px" }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.06 }}
                  className="relative"
                >
                  <div className="relative h-full overflow-hidden rounded-3xl bg-white/[0.03] p-6 ring-1 ring-white/10 shadow-glow backdrop-blur">
                    <div className="absolute inset-0 opacity-0 transition duration-300 hover:opacity-100">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(62,231,255,0.18),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(167,139,250,0.14),transparent_60%)]" />
                    </div>
                    <div className="relative flex items-start gap-4">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                        <Icon className="h-5 w-5 text-white/80" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <Badge className="text-white/90">{s.n}</Badge>
                          <div className="text-base font-semibold tracking-tight text-white">
                            {s.title}
                          </div>
                        </div>
                        <div className="mt-3 text-sm leading-relaxed text-white/70">
                          {s.desc}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

