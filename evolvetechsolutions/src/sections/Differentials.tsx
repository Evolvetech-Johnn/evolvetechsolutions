import { motion } from "framer-motion";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Card from "@/components/Card";

const points = [
  {
    title: "Sistema que aumenta lucro",
    desc: "O foco não é “funcionar”. É reduzir custo invisível, eliminar gargalos e transformar processo em margem."
  },
  {
    title: "Clareza antes de código",
    desc: "Diagnóstico e planejamento para travar escopo e acelerar a entrega com menos risco."
  },
  {
    title: "UX/UI premium",
    desc: "Interface limpa, rápida e óbvia para o usuário — porque o melhor sistema é o que o time usa sem resistência."
  },
  {
    title: "Tecnologia moderna e escalável",
    desc: "Arquitetura pensada para evolução, integrações e manutenção profissional."
  }
];

function IconTarget() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-white/80" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 12m-8 0a8 8 0 1016 0 8 8 0 10-16 0" />
      <path d="M12 8v4l3 3" />
    </svg>
  );
}

export default function Differentials() {
  return (
    <section className="relative border-y border-white/5 bg-ink-950">
      <Container className="py-16 md:py-24">
        <SectionHeading
          eyebrow="Diferencial"
          title={
            <>
              Você investe porque quer{" "}
              <span className="bg-gradient-to-r from-neon-cyan via-neon-green to-neon-purple bg-clip-text text-transparent">
                resultado
              </span>
              . Não porque quer “um sistema”.
            </>
          }
          subtitle="Tickets de R$3.000 a R$15.000+ fazem sentido quando a entrega reduz retrabalho, aumenta produtividade e dá controle gerencial. É isso que colocamos no centro do projeto."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {points.map((p, idx) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20% 0px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.06 }}
            >
              <Card
                icon={<IconTarget />}
                title={p.title}
                description={p.desc}
                className="h-full"
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

