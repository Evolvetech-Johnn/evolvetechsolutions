import { motion } from "framer-motion";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Card from "@/components/Card";

const items = [
  {
    name: "EletroStart",
    desc: "Site e presença digital para conversão e autoridade.",
    href: "https://eletrostart.com.br"
  },
  {
    name: "Start Solar",
    desc: "Institucional focado em captação e credibilidade no segmento.",
    href: "https://startsolar.com.br"
  },
  {
    name: "Compras Londrina",
    desc: "Plataforma para negócios locais: descoberta, demanda e visibilidade.",
    href: "https://compraslondrina.com.br"
  }
];

function IconArrow() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M12.293 2.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 11-1.414-1.414L14.586 8H9a6 6 0 000 12h.5a1 1 0 110 2H9A8 8 0 019 6h5.586l-2.293-2.293a1 1 0 010-1.414z" />
    </svg>
  );
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative border-y border-white/5 bg-ink-950">
      <Container className="py-16 md:py-24">
        <SectionHeading
          eyebrow="Portfólio"
          title="Projetos reais. Layouts limpos. Conversão como prioridade."
          subtitle="Aqui vão alguns trabalhos que mostram estética, performance e clareza. Para sistemas sob medida, o portfólio fica ainda mais forte com seu caso e seus números."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((p, idx) => (
            <motion.div
              key={p.href}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20% 0px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.06 }}
            >
              <a href={p.href} target="_blank" rel="noreferrer" className="block">
                <Card
                  className="h-full"
                  title={p.name}
                  description={p.desc}
                  icon={
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-neon-cyan/25 to-neon-purple/25 ring-1 ring-white/10">
                      <IconArrow />
                    </div>
                  }
                >
                  <div className="mt-5 rounded-2xl bg-white/3 p-4 ring-1 ring-white/10">
                    <div className="text-xs font-semibold text-white/60">Link</div>
                    <div className="mt-1 break-words text-sm font-semibold text-white">
                      {p.href.replace("https://", "")}
                    </div>
                  </div>

                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition group-hover:text-white">
                    Abrir projeto
                    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                      <path d="M12.293 2.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 11-1.414-1.414L14.586 8H10a5 5 0 000 10h1a1 1 0 110 2h-1A7 7 0 0110 6h4.586l-2.293-2.293a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </Card>
              </a>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

