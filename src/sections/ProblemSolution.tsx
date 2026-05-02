import { motion } from "framer-motion";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Card from "@/components/Card";

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

function IconAlert() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-white/80" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 9v4m0 4h.01" />
      <path d="M10.29 3.86l-8.4 14.52A2 2 0 003.62 21h16.76a2 2 0 001.73-2.62l-8.4-14.52a2 2 0 00-3.42 0z" />
    </svg>
  );
}

function IconSpark() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-white/80" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2l1.2 4.2L17 7.4l-3.8 1.2L12 13l-1.2-4.4L7 7.4l3.8-1.2L12 2z" />
      <path d="M5 13l.7 2.5L8 16.2l-2.3.7L5 19l-.7-2.1L2 16.2l2.3-.7L5 13z" />
      <path d="M19 13l.7 2.5 2.3.7-2.3.7L19 19l-.7-2.1-2.3-.7 2.3-.7L19 13z" />
    </svg>
  );
}

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
            <div className="text-sm font-semibold text-white/60">DORES REAIS</div>
            {pains.map((p) => (
              <Card
                key={p.title}
                icon={<IconAlert />}
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
            <div className="text-sm font-semibold text-white/60">SOLUÇÃO DIRETA</div>
            {solutions.map((s) => (
              <Card
                key={s.title}
                icon={<IconSpark />}
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

