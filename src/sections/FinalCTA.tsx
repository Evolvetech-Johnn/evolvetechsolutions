import { motion } from "framer-motion";
import Container from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import Badge from "@/components/Badge";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";

export default function FinalCTA() {
  const wa = buildWhatsAppUrl({
    phoneE164: siteConfig.whatsapp.phoneE164,
    message: siteConfig.whatsapp.defaultMessage
  });

  return (
    <section id="contato" className="relative overflow-hidden bg-ink-950">
      <div className="absolute inset-0">
        <div className="absolute -top-28 left-1/4 h-72 w-72 rounded-full bg-neon-cyan/[0.12] blur-3xl" />
        <div className="absolute -bottom-28 right-1/4 h-72 w-72 rounded-full bg-neon-purple/[0.12] blur-3xl" />
      </div>

      <Container className="relative py-16 md:py-24">
        <div className="relative overflow-hidden rounded-[32px] bg-white/[0.03] ring-1 ring-white/10 shadow-glowStrong backdrop-blur">
          <div className="absolute inset-0 opacity-60">
            <div className="absolute -top-24 right-[-80px] h-56 w-56 rounded-full bg-neon-green/[0.14] blur-3xl" />
            <div className="absolute -bottom-28 left-[-80px] h-64 w-64 rounded-full bg-neon-cyan/[0.14] blur-3xl" />
          </div>

          <div className="relative p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>Orçamento rápido</Badge>
              <Badge className="text-white/90">Diagnóstico + proposta</Badge>
              <Badge className="text-white/90">Tickets R$3k–R$15k+</Badge>
            </div>

            <motion.h3
              className="mt-6 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20% 0px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Se você quer crescimento com controle, o próximo passo é simples:
              <span className="text-white/70"> conversar com a gente.</span>
            </motion.h3>

            <p className="mt-4 max-w-2xl text-balance text-base leading-relaxed text-white/70 md:text-lg">
              Em poucos minutos, entendemos seu cenário e apontamos o caminho: o que
              automatizar, quais indicadores priorizar e qual escopo entrega o melhor
              retorno.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={wa} target="_blank" rel="noreferrer" size="lg">
                Falar no WhatsApp agora
              </ButtonLink>
              <ButtonLink href="#servicos" variant="secondary" size="lg">
                Ver serviços
              </ButtonLink>
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {[
                { t: "Resposta rápida", d: "WhatsApp com direcionamento e perguntas certas." },
                { t: "Escopo validado", d: "Planejamento antes de construir para reduzir risco." },
                { t: "Entrega premium", d: "UX/UI, performance e padrão de engenharia." }
              ].map((i) => (
                <div
                  key={i.t}
                  className="rounded-3xl bg-white/[0.03] p-5 ring-1 ring-white/10"
                >
                  <div className="text-sm font-semibold text-white">{i.t}</div>
                  <div className="mt-2 text-sm text-white/70">{i.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

