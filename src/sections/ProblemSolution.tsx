import { motion } from "framer-motion";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Card from "@/components/Card";
import { AlertTriangle, Sparkles } from "lucide-react";

const pains = [
  {
    title: "Falta de controle",
    desc: "Informação espalhada em WhatsApp, planilhas e papel. O resultado: decisões no escuro."
  },
  {
    title: "Processos manuais",
    desc: "Operação depende de pessoas e memória. Um atraso vira efeito dominó."
  },
  {
    title: "Sem dados confiáveis",
    desc: "Você até tem números, mas não tem indicadores que orientam ação e lucro."
  }
];

const solutions = [
  {
    title: "Fluxo sob medida",
    desc: "Sistema desenhado para como sua empresa realmente trabalha — com padrões, aprovações e regras."
  },
  {
    title: "Painéis claros",
    desc: "Dashboards com métricas que mostram o que fazer agora, e não só o que já aconteceu."
  },
  {
    title: "Automação e integração",
    desc: "Tarefas repetitivas viram rotinas automáticas. Menos erro, mais velocidade e previsibilidade."
  }
];

export default function ProblemSolution() {
  return (
    <section className="relative border-y border-white/5 bg-ink-950">
      <Container className="py-16 md:py-24">
        <SectionHeading
          eyebrow="Problema → Solução"
          title={
            <>
              O que trava seu crescimento não é a falta de esforço.
              <span className="text-white/70"> É a falta de sistema.</span>
            </>
          }
          subtitle="Quando processos dependem de planilha e memória, o custo aparece em retrabalho, erro e oportunidades perdidas. A solução é um sistema sob medida com indicadores que orientam a ação."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-white/70">
              <AlertTriangle className="h-4 w-4 text-neon-purple/90" />
              Dores reais
            </div>
            {pains.map((p) => (
              <Card
                key={p.title}
                icon={<AlertTriangle className="h-5 w-5 text-white/80" />}
                title={p.title}
                description={p.desc}
              />
            ))}
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.06 }}
          >
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-white/70">
              <Sparkles className="h-4 w-4 text-neon-cyan/90" />
              Solução direta
            </div>
            {solutions.map((s) => (
              <Card
                key={s.title}
                icon={<Sparkles className="h-5 w-5 text-white/80" />}
                title={s.title}
                description={s.desc}
              />
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

