import { motion } from "framer-motion";
import Container from "@/components/Container";
import Badge from "@/components/Badge";
import { ButtonLink } from "@/components/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";

export default function Hero() {
  const wa = buildWhatsAppUrl({
    phoneE164: siteConfig.whatsapp.phoneE164,
    message: siteConfig.whatsapp.defaultMessage
  });

  return (
    <section id="topo" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-grid" />
      <div className="pointer-events-none absolute inset-0 bg-soft-noise opacity-[0.18]" />
      <div className="absolute left-1/2 top-[-220px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-neon-cyan/12 blur-3xl" />
      <div className="absolute bottom-[-240px] right-[-120px] h-[520px] w-[520px] rounded-full bg-neon-purple/12 blur-3xl" />

      <Container className="relative py-16 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge>Software sob medida</Badge>
              <Badge className="text-white/90">Foco em lucro e controle</Badge>
              <Badge className="text-white/90">Dashboards + automação</Badge>
            </div>

            <motion.h1
              className="mt-6 text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Transforme sua operação em{" "}
              <span className="bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple bg-clip-text text-transparent">
                dados, controle e lucro
              </span>
              — com um sistema feito para o seu negócio.
            </motion.h1>

            <motion.p
              className="mt-5 max-w-xl text-balance text-base leading-relaxed text-white/70 md:text-lg"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
            >
              Chega de planilhas e retrabalho. A EVOLVETECH SOLUTIONS desenvolve
              sistemas personalizados, dashboards e automações para aumentar
              produtividade, reduzir erros e dar previsibilidade ao crescimento.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease: "easeOut" }}
            >
              <ButtonLink href="#contato" aria-label="Solicitar orçamento" size="lg">
                Solicitar orçamento
                <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M3 10a1 1 0 011-1h9.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L13.586 11H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </ButtonLink>

              <ButtonLink
                href={wa}
                target="_blank"
                rel="noreferrer"
                variant="secondary"
                size="lg"
                aria-label="Falar no WhatsApp"
              >
                Falar no WhatsApp
              </ButtonLink>
            </motion.div>

            <div className="mt-7 grid max-w-xl grid-cols-2 gap-3 text-sm text-white/70 md:grid-cols-3">
              {[
                { k: "Prazo claro", v: "escopo validado antes de construir" },
                { k: "Ticket alto", v: "justificado por impacto real" },
                { k: "Entrega premium", v: "UX/UI + performance" }
              ].map((i) => (
                <div
                  key={i.k}
                  className="rounded-2xl bg-white/3 px-4 py-3 ring-1 ring-white/10 backdrop-blur"
                >
                  <div className="font-semibold text-white">{i.k}</div>
                  <div className="mt-1 text-xs text-white/60">{i.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[32px] bg-gradient-to-r from-neon-cyan/15 via-neon-blue/10 to-neon-purple/15 blur-2xl" />
            <motion.div
              className="relative overflow-hidden rounded-[28px] bg-white/3 ring-1 ring-white/10 shadow-glow backdrop-blur"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                </div>
                <div className="text-xs font-semibold text-white/60">
                  Dashboard Operacional
                </div>
              </div>
              <div className="p-6">
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    { label: "Pedidos processados", value: "+38%", tone: "from-neon-cyan to-neon-blue" },
                    { label: "Retrabalho", value: "-52%", tone: "from-neon-green to-neon-cyan" },
                    { label: "Tempo por operação", value: "-31%", tone: "from-neon-purple to-neon-blue" },
                    { label: "Visibilidade do caixa", value: "Diária", tone: "from-neon-cyan to-neon-purple" }
                  ].map((m) => (
                    <div
                      key={m.label}
                      className="rounded-2xl bg-white/3 p-5 ring-1 ring-white/10"
                    >
                      <div className="text-xs font-semibold text-white/60">
                        {m.label}
                      </div>
                      <div
                        className={[
                          "mt-3 inline-flex items-center rounded-xl bg-gradient-to-r px-3 py-2 text-lg font-semibold text-ink-950",
                          m.tone
                        ].join(" ")}
                      >
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl bg-white/3 p-5 ring-1 ring-white/10">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-white">
                      Indicadores em tempo real
                    </div>
                    <Badge className="text-white/90">Automação + integrações</Badge>
                  </div>
                  <div className="mt-4 grid grid-cols-12 gap-2">
                    {[9, 6, 10, 7, 11, 5, 8, 4, 9, 6, 10, 7].map((h, idx) => (
                      <div
                        key={idx}
                        className={[
                          "col-span-1 rounded-xl bg-gradient-to-t from-white/5 to-white/0 ring-1 ring-white/10",
                          idx % 3 === 0 ? "from-neon-cyan/30" : idx % 3 === 1 ? "from-neon-purple/25" : "from-neon-green/25"
                        ].join(" ")}
                        style={{ height: `${h * 10}px` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

