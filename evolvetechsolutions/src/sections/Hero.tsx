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
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background sutil */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#6366F1,transparent_50%),radial-gradient(circle_at_70%_80%,#818CF8,transparent_50%)]" />
      </div>

      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Coluna Esquerda: Conteúdo */}
          <div className="section-signature pl-6 md:pl-10">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-medium text-text-secondary border border-border">
                <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                Automatize. Escale. Evolua.
              </div>
            </div>

            <h1 className="text-display md:text-h1 text-balance font-bold font-display text-text-primary mb-6 leading-tight">
              Pare de perder tempo com{" "}
              <span className="text-accent">processos manuais</span>
            </h1>

            <p className="text-body text-text-secondary mb-8 max-w-xl">
              Criamos sistemas sob medida que automatizam tarefas repetitivas, organizam dados e dão
              a você controle total sobre o crescimento da sua empresa.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button size="lg">
                Quero automatizar meu negócio
                <ArrowRight className="h-5 w-5" />
              </Button>

              <ButtonLink href="#casos" variant="secondary" size="lg">
                Ver projetos reais
                <ArrowUpRight className="h-4 w-4" />
              </ButtonLink>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {STATS.map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold font-mono-custom text-accent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-text-secondary">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Coluna Direita: Card Visual */}
          <div className="relative">
            <div className="relative rounded-2xl bg-surface border border-border p-6 shadow-medium overflow-hidden">
              {/* Detalhe do card */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              
              {/* Cabeçalho do card */}
              <div className="flex items-center justify-between mb-6 relative">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
                    <img 
                      src="/LogoVF.png" 
                      alt="EvolveOS" 
                      className="h-6 w-6 object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-text-primary">EvolveOS</div>
                    <div className="text-xs text-text-secondary">Painel de Controle</div>
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
                  { label: "Produtividade", value: "+62%", color: "text-accent" },
                  { label: "Tempo Economizado", value: "18h/semana", color: "text-success" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-surface-2 rounded-xl p-4 border border-border"
                  >
                    <div className="text-xs text-text-secondary mb-1">{item.label}</div>
                    <div className={`text-xl font-bold font-mono-custom ${item.color}`}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Gráfico visual simplificado (assinatura) */}
              <div className="bg-surface-2 rounded-xl p-4 border border-border">
                <div className="text-xs text-text-secondary mb-3">Fluxo de Processos</div>
                <div className="flex items-end justify-between gap-2 h-24">
                  {[30, 55, 40, 75, 60, 85, 70].map((height, i) => (
                    <div
                      key={i}
                      style={{ height: `${height}%` }}
                      className="flex-1 rounded-t-lg bg-gradient-to-t from-accent to-accent-light opacity-80"
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