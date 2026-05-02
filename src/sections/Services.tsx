import { motion } from "framer-motion";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Card from "@/components/Card";
import { ButtonLink } from "@/components/Button";

type Service = {
  title: string;
  tagline: string;
  bullets: string[];
};

const services: Service[] = [
  {
    title: "Desenvolvimento de Sistemas",
    tagline: "O sistema certo vira margem: menos custo oculto, mais previsibilidade.",
    bullets: [
      "Fluxos sob medida: do orçamento ao pós-venda",
      "Perfis, permissões e trilha de auditoria",
      "Indicadores que mostram gargalos e oportunidades",
      "Base escalável para crescer sem reescrever"
    ]
  },
  {
    title: "Websites (alto padrão)",
    tagline: "Site institucional pensado para vender: autoridade + lead qualificado.",
    bullets: [
      "Copy orientada a resultado (não “bonito por bonito”)",
      "Seções e CTAs estruturados para conversão",
      "Performance e SEO base prontos para tráfego",
      "Design premium com hierarquia e clareza"
    ]
  },
  {
    title: "Automação",
    tagline: "Quando o processo vira rotina automática, o time volta a produzir.",
    bullets: [
      "Integrações entre ferramentas e sistemas",
      "Robôs de tarefas repetitivas e validações",
      "Alertas e notificações com regra de negócio",
      "Redução de erros e retrabalho no dia a dia"
    ]
  }
];

function IconBrackets() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-white/80" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h2" />
      <path d="M16 4h2a2 2 0 012 2v12a2 2 0 01-2 2h-2" />
      <path d="M12 6v12" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-white/80" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path d="M3.6 9h16.8" />
      <path d="M3.6 15h16.8" />
      <path d="M12 3a12 12 0 010 18" />
      <path d="M12 3a12 12 0 000 18" />
    </svg>
  );
}

function IconBolt() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-white/80" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
    </svg>
  );
}

const icons = [<IconBrackets key="a" />, <IconGlobe key="b" />, <IconBolt key="c" />];

export default function Services() {
  return (
    <section id="servicos" className="relative bg-ink-950">
      <Container className="py-16 md:py-24">
        <SectionHeading
          eyebrow="Serviços"
          title={
            <>
              Tecnologia com foco em{" "}
              <span className="bg-gradient-to-r from-neon-green via-neon-cyan to-neon-purple bg-clip-text text-transparent">
                impacto no negócio
              </span>
            </>
          }
          subtitle="Você não precisa de “mais um sistema”. Precisa de um produto digital que reduza custo, acelere a operação e entregue controle em tempo real."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((s, idx) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20% 0px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.06 }}
            >
              <Card
                icon={icons[idx]}
                title={s.title}
                description={s.tagline}
                className="h-full"
              >
                <ul className="space-y-2 text-sm text-white/70">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-neon-cyan/80" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <ButtonLink href="#contato" variant="secondary" size="sm">
                    Quero uma proposta
                  </ButtonLink>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

