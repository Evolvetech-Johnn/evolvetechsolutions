import { motion } from "framer-motion";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Card from "@/components/Card";
import Badge from "@/components/Badge";

const testimonials = [
  {
    name: "EletroStart",
    quote:
      "Site institucional focado em SEO e velocidade que passou a gerar contato qualificado via WhatsApp já no primeiro mês de operação."
  },
  {
    name: "Portal Compras Londrina",
    quote:
      "Modernização do portal de licitações: um sistema mais rápido, acessível e otimizado para os buscadores, facilitando o acesso público."
  },
  {
    name: "Start Solar",
    quote:
      "Plataforma desenhada para autoridade e conversão. Reduziu o atrito na comunicação e acelerou a jornada de decisão do cliente final."
  }
];

const results = [
  { k: "Retrabalho", v: "↓ até 50%" },
  { k: "Tempo de operação", v: "↓ até 30%" },
  { k: "Visibilidade", v: "↑ diária" },
  { k: "Decisão", v: "mais rápida" }
];

export default function SocialProof() {
  return (
    <section className="relative bg-ink-950">
      <Container className="py-16 md:py-24">
        <SectionHeading
          eyebrow="Resultados reais"
          title="Autoridade se constrói com clareza, processo e resultado."
          subtitle="Nem toda transformação é “marketing”. É operação bem desenhada e tecnologia aplicada do jeito certo. Abaixo, exemplos do impacto gerado em nossos clientes reais."
        />

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {results.map((r) => (
            <Badge key={r.k}>
              <span className="text-white/60">{r.k}:</span>{" "}
              <span className="text-white">{r.v}</span>
            </Badge>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20% 0px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.06 }}
            >
              <Card className="h-full">
                <div className="text-sm font-semibold text-white">{t.name}</div>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  “{t.quote}”
                </p>
                <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-white/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan/80" />
                  Projeto verificado
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

