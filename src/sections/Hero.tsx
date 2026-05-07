import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Container from "@/components/Container";
import Badge from "@/components/Badge";
import { ButtonLink } from "@/components/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";
import TechBackground from "@/components/TechBackground";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end start"]
  });
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, -28]);
  const mockupRotate = useTransform(scrollYProgress, [0, 1], [0, -2]);

  const wa = buildWhatsAppUrl({
    phoneE164: siteConfig.whatsapp.phoneE164,
    message: siteConfig.whatsapp.defaultMessage
  });

  return (
    <section ref={rootRef} id="topo" className="relative overflow-hidden">
      <TechBackground />

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
              Uma operação que cresce com{" "}
              <span className="bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple bg-clip-text text-transparent">
                controle, dados e margem
              </span>
              .
            </motion.h1>

            <motion.p
              className="mt-5 max-w-xl text-balance text-base leading-relaxed text-white/70 md:text-lg"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
            >
              Sistemas sob medida, dashboards e automações para transformar processos
              manuais em fluxo inteligente — reduzindo retrabalho, aumentando
              produtividade e dando visibilidade em tempo real para decisões melhores.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease: "easeOut" }}
            >
              <ButtonLink href="#contato" aria-label="Solicitar orçamento" size="lg">
                Solicitar orçamento
                <ArrowRight className="h-5 w-5" />
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
                { k: "Diagnóstico", v: "entendemos o fluxo antes de construir" },
                { k: "Entrega premium", v: "UX/UI + performance + clareza" },
                { k: "ROI", v: "redução de custo invisível e retrabalho" }
              ].map((i) => (
                <div
                  key={i.k}
                  className="rounded-3xl bg-white/[0.04] px-4 py-3 ring-1 ring-white/10 shadow-glow backdrop-blur"
                >
                  <div className="font-semibold text-white">{i.k}</div>
                  <div className="mt-1 text-xs text-white/60">{i.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 rounded-[40px] bg-gradient-to-r from-neon-cyan/18 via-neon-blue/10 to-neon-purple/18 blur-2xl" />
            <motion.div
              className="relative overflow-hidden rounded-[32px] bg-white/[0.04] ring-1 ring-white/[0.12] shadow-glowStrong backdrop-blur"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              whileHover={{ rotateX: -2, rotateY: 3, scale: 1.01 }}
              style={{ y: mockupY, rotate: mockupRotate, transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 opacity-70">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(62,231,255,0.22),transparent_55%),radial-gradient(circle_at_90%_30%,rgba(167,139,250,0.16),transparent_55%)]" />
                <motion.div
                  className="absolute -left-1/2 top-0 h-full w-1/2 bg-white/10 blur-sm"
                  animate={{ x: ["0%", "240%"] }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transform: "skewX(-20deg)" }}
                />
              </div>

              <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-white/25" />
                  <div className="h-2.5 w-2.5 rounded-full bg-white/18" />
                  <div className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-white/70">
                  <Sparkles className="h-4 w-4 text-neon-cyan/90" />
                  Dashboard futurista
                </div>
              </div>

              <div className="relative p-6">
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    { label: "Eficiência operacional", value: "+38%", tone: "from-neon-cyan to-neon-blue" },
                    { label: "Retrabalho", value: "-52%", tone: "from-neon-green to-neon-cyan" },
                    { label: "Tempo por operação", value: "-31%", tone: "from-neon-purple to-neon-blue" },
                    { label: "Visibilidade do caixa", value: "Diária", tone: "from-neon-cyan to-neon-purple" }
                  ].map((m) => (
                    <div
                      key={m.label}
                      className="rounded-3xl bg-white/[0.04] p-5 ring-1 ring-white/10"
                    >
                      <div className="text-xs font-semibold text-white/60">{m.label}</div>
                      <div
                        className={[
                          "mt-3 inline-flex items-center rounded-2xl bg-gradient-to-r px-4 py-2 text-lg font-semibold text-ink-950 shadow-glow",
                          m.tone
                        ].join(" ")}
                      >
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-3xl bg-white/[0.04] p-5 ring-1 ring-white/10">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-white">Indicadores em tempo real</div>
                    <Badge className="text-white/90">Automação + integrações</Badge>
                  </div>
                  <div className="mt-4 grid grid-cols-12 gap-2">
                    {[9, 6, 10, 7, 11, 5, 8, 4, 9, 6, 10, 7].map((h, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ height: 12, opacity: 0.4 }}
                        animate={{ height: `${h * 10}px`, opacity: 1 }}
                        transition={{ delay: 0.08 + idx * 0.02, duration: 0.7, ease: "easeOut" }}
                        className={[
                          "col-span-1 rounded-2xl bg-gradient-to-t from-white/5 to-white/0 ring-1 ring-white/10",
                          idx % 3 === 0 ? "from-neon-cyan/30" : idx % 3 === 1 ? "from-neon-purple/25" : "from-neon-green/25"
                        ].join(" ")}
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

