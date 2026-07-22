import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Container from "@/components/Container";
import Badge from "@/components/Badge";
import { ButtonLink } from "@/components/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";
import TechBackground from "@/components/TechBackground";
import { ArrowRight } from "lucide-react";
import EvolveOSPanel from "@/components/EvolveOSPanel";

export default function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end start"],
  });
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, -28]);
  const mockupRotate = useTransform(scrollYProgress, [0, 1], [0, -2]);

  const wa = buildWhatsAppUrl({
    phoneE164: siteConfig.whatsapp.phoneE164,
    message: siteConfig.whatsapp.defaultMessage,
  });

  return (
    <section ref={rootRef} id="topo" className="relative overflow-hidden">
      <TechBackground />

      <Container className="relative py-16 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* ── Left column — copy ──────────────────────────────────────── */}
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
              De processo manual a máquina de decisão:{" "}
              <span className="bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple bg-clip-text text-transparent">
                sistemas, dashboards e automação sob medida
              </span>
              .
            </motion.h1>

            <motion.p
              className="mt-5 max-w-xl text-balance text-base leading-relaxed text-white/70 md:text-lg"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
            >
              Sistemas sob medida que transformam processos manuais em fluxo inteligente —
              menos retrabalho, mais produtividade, decisões em tempo real.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease: "easeOut" }}
            >
              <ButtonLink href="/diagnostico" aria-label="Quero meu diagnóstico gratuito" size="lg">
                Quero meu diagnóstico gratuito
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
                { k: "ROI", v: "redução de custo invisível e retrabalho" },
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

          {/* ── Right column — animated panel ───────────────────────────── */}
          <div className="relative">
            {/* Glow halo behind the card */}
            <div className="absolute -inset-8 rounded-[40px] bg-gradient-to-r from-neon-cyan/18 via-neon-blue/10 to-neon-purple/18 blur-2xl" />

            {/* Scroll-parallax + hover-tilt wrapper */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              whileHover={{ rotateX: -2, rotateY: 3, scale: 1.01 }}
              style={{ y: mockupY, rotate: mockupRotate, transformStyle: "preserve-3d" }}
            >
              <EvolveOSPanel />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

