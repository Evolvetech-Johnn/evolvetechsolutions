"use client";

import Container from "@/components/Container";
import { Button, ButtonLink } from "@/components/Button";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Clock, Users, Zap } from "lucide-react";
import {
  CONTAINER_VARIANTS,
  FADE_UP_VARIANTS,
  useMotionConfig,
  EASINGS,
} from "@/lib/motion";
import EvolveOSPanel from "@/components/EvolveOSPanel";

const STATS = [
  { label: "Horas Economizadas", value: "12.400", icon: Clock },
  { label: "Clientes Atendidos", value: "+50", icon: Users },
  { label: "Processos Automatizados", value: "+120", icon: Zap },
];

export default function Hero() {
  const { enabled } = useMotionConfig();

  return (
    <section className="relative overflow-hidden py-12 md:py-20 lg:py-32">
      {/* Background sutil */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#0EA5E9,transparent_50%),radial-gradient(circle_at_70%_80%,#38BDF8,transparent_50%)]" />
      </div>

      <Container>
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-2 lg:items-center">
          {/* Coluna Esquerda: Conteúdo */}
          <div className="section-signature pl-4 md:pl-6 lg:pl-10">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-surface px-4 py-2 text-sm font-medium text-brand-text-muted border border-brand-border">
                <span className="h-2 w-2 rounded-full bg-brand-action animate-pulse" />
                Automatize. Escale. Evolua.
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-h1 text-balance font-bold font-display text-brand-text mb-6 leading-tight">
              Pare de perder tempo com{" "}
              <span className="text-brand-accent">processos manuais</span>
            </h1>

            <p className="text-body text-brand-text-muted mb-8 max-w-xl">
              Criamos sistemas sob medida que automatizam tarefas repetitivas, organizam dados e dão
              a você controle total sobre o crescimento da sua empresa.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-12">
              <Button size="lg" className="w-full sm:w-auto">
                Quero automatizar meu negócio
                <ArrowRight className="h-5 w-5" />
              </Button>

              <ButtonLink href="#casos" variant="secondary" size="lg" className="w-full sm:w-auto">
                Ver projetos reais
                <ArrowUpRight className="h-4 w-4" />
              </ButtonLink>
            </div>

            <div className="grid grid-cols-3 gap-4 md:gap-8">
              {STATS.map((stat, i) => (
                <div key={i}>
                  <div className="text-xl md:text-2xl font-bold font-mono-custom text-brand-action mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-brand-text-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Coluna Direita: Card Visual */}
          <div className="relative">
            <EvolveOSPanel />
          </div>
        </div>
      </Container>
    </section>
  );
}