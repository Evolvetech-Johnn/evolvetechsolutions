"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLiveMetric } from "./useLiveMetric";
import {
  barVariants,
  numberTickerVariants,
  numberTickerTransition,
} from "./EvolveOSPanel.animations";

const BASE_BAR_HEIGHTS = [30, 55, 40, 75, 60, 85, 70];

export default function EvolveOSPanel() {
  const productivity = useLiveMetric({
    min: 58,
    max: 64,
    initial: 62,
    intervalMs: 2500,
  });

  const timeSaved = useLiveMetric({
    min: 17,
    max: 19,
    initial: 18,
    intervalMs: 4000,
  });

  return (
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
        <div className="bg-brand-surface-alt rounded-xl p-4 border border-brand-border overflow-hidden">
          <div className="text-xs text-brand-text-muted mb-1">Produtividade</div>
          <div className="text-xl font-bold font-mono-custom text-brand-accent flex">
            +
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={productivity.key}
                variants={numberTickerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={numberTickerTransition}
                className="inline-block"
              >
                {productivity.value}
              </motion.span>
            </AnimatePresence>
            %
          </div>
        </div>

        <div className="bg-brand-surface-alt rounded-xl p-4 border border-brand-border overflow-hidden">
          <div className="text-xs text-brand-text-muted mb-1">Tempo Economizado</div>
          <div className="text-xl font-bold font-mono-custom text-brand-action flex">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={timeSaved.key}
                variants={numberTickerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={numberTickerTransition}
                className="inline-block"
              >
                {timeSaved.value}
              </motion.span>
            </AnimatePresence>
            h/semana
          </div>
        </div>
      </div>

      {/* Gráfico visual simplificado (assinatura) */}
      <div className="bg-brand-surface-alt rounded-xl p-4 border border-brand-border">
        <div className="text-xs text-brand-text-muted mb-3">Fluxo de Processos</div>
        <div className="flex items-end justify-between gap-2 h-24">
          {BASE_BAR_HEIGHTS.map((height, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={barVariants}
              initial="initial"
              animate="animate"
              style={{ height: `${height}%`, transformOrigin: "bottom" }}
              className="flex-1 rounded-t-lg bg-gradient-to-t from-brand-accent to-brand-accent-light opacity-80"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
