import { motion } from "framer-motion";
import Image from "next/image";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { ArrowUpRight } from "lucide-react";

const items = [
  {
    name: "EletroStart",
    desc: "Site e presença digital para conversão e autoridade.",
    href: "https://eletrostart.com.br",
    preview: "/portfolio/eletrostart.svg"
  },
  {
    name: "Start Solar",
    desc: "Institucional focado em captação e credibilidade no segmento.",
    href: "https://startsolar.com.br",
    preview: "/portfolio/startsolar.svg"
  },
  {
    name: "Compras Londrina",
    desc: "Plataforma para negócios locais: descoberta, demanda e visibilidade.",
    href: "https://compraslondrina.com.br",
    preview: "/portfolio/compraslondrina.svg"
  }
];

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
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="group block overflow-hidden rounded-3xl bg-white/[0.03] ring-1 ring-white/10 shadow-glow backdrop-blur transition hover:-translate-y-1 hover:ring-white/20"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.preview}
                    alt={`Preview ${p.name}`}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    priority={idx === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent opacity-90" />
                  <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(62,231,255,0.18),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(167,139,250,0.14),transparent_60%)]" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="text-xs font-semibold text-white/70">
                      {p.href.replace("https://", "")}
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-2xl bg-white/[0.06] px-3 py-2 text-xs font-semibold text-white ring-1 ring-white/10">
                      Ver projeto <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-lg font-semibold tracking-tight text-white">
                    {p.name}
                  </div>
                  <div className="mt-2 text-sm leading-relaxed text-white/70">
                    {p.desc}
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

