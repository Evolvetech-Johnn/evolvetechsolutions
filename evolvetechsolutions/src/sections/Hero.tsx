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
            <div className="relative rounded-2xl bg-brand-surface border border-brand-border p-6 shadow-medium overflow-hidden">
              {/* Detalhe do card */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              
              {/* Cabeçalho do card */}
              <div className="flex items-center justify-between mb-6 relative">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-brand-accent flex items-center justify-center">
                    <img 
                      src="/LogoVF.png" 
                      alt="EvolveOS" 
                      className="h-6 w-6 object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-brand-text">EvolveOS</div>
                    <div className="text-xs text-brand-text-muted">Painel de Controle</div>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
                </div>
              </div>

              {/* Grid de métricas */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { label: "Produtividade", value: "+62%", color: "text-brand-accent" },
                  { label: "Tempo Economizado", value: "18h/semana", color: "text-brand-action" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-brand-surface-alt rounded-xl p-4 border border-brand-border"
                  >
                    <div className="text-xs text-brand-text-muted mb-1">{item.label}</div>
                    <div className={`text-xl font-bold font-mono-custom ${item.color}`}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Gráfico visual simplificado (assinatura) */}
              <div className="bg-brand-surface-alt rounded-xl p-4 border border-brand-border">
                <div className="text-xs text-brand-text-muted mb-3">Fluxo de Processos</div>
                <div className="flex items-end justify-between gap-2 h-24">
                  {[30, 55, 40, 75, 60, 85, 70].map((height, i) => (
                    <div
                      key={i}
                      style={{ height: `${height}%` }}
                      className="flex-1 rounded-t-lg bg-gradient-to-t from-brand-accent to-brand-accent-light opacity-80"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}