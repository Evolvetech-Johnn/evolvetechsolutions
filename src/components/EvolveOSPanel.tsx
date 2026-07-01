"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import Badge from "@/components/Badge";
import { useLiveMetric } from "@/components/useLiveMetric";
import {
  buildBarConfigs,
  barVariants,
  numberTickerVariants,
  numberTickerTransition,
  shimmerTransition,
} from "@/components/EvolveOSPanel.animations";

// ---------------------------------------------------------------------------
// Static data — never declared inside JSX
// ---------------------------------------------------------------------------

/** Bar heights (relative units 1–12). Taller = more dominant in the chart. */
const BAR_HEIGHTS = [9, 6, 10, 7, 11, 5, 8, 4, 9, 6, 10, 7] as const;

const BAR_COLOR_CLASSES: Record<number, string> = {
  0: "from-neon-cyan/40 to-neon-cyan/10",
  1: "from-neon-purple/35 to-neon-purple/10",
  2: "from-neon-blue/35 to-neon-blue/10",
};

/** KPI cards that sit above the bar chart */
const STATIC_KPIS = [
  { label: "Eficiência operacional", value: "+38%",  tone: "from-neon-cyan to-neon-blue" },
  { label: "Retrabalho",             value: "−52%",  tone: "from-neon-green to-neon-cyan" },
] as const;

const BAR_CONFIGS = buildBarConfigs(BAR_HEIGHTS as unknown as number[]);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * EvolveOSPanel — the hero mockup dashboard card.
 *
 * Layout:
 *  • macOS-style window bar (static)
 *  • Two static KPI mini-cards
 *  • Two live-animated metric cards ("Produtividade" / "Tempo Economizado")
 *  • Bar chart "Fluxo de Processos" with breathing bars
 *
 * Animation is powered by:
 *  • EvolveOSPanel.animations.ts  — all Variants / Transition configs
 *  • useLiveMetric.ts             — oscillating number logic
 */
export default function EvolveOSPanel() {

  // Live metrics ——————————————————————————————————————————
  const productivity = useLiveMetric({
    min: 58,
    max: 64,
    initial: 62,
    intervalMs: 2500, // Faster interval so visitors notice the live data
  });

  const timeSaved = useLiveMetric({
    min: 17,
    max: 19,
    initial: 18,
    intervalMs: 4000,
  });

  return (
    <div className="relative overflow-hidden rounded-[32px] bg-white/[0.04] ring-1 ring-white/[0.12] shadow-glowStrong backdrop-blur">

      {/* ── Ambient gradients ──────────────────────────────────────────── */}
      <div className="absolute inset-0 opacity-70 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(62,231,255,0.22),transparent_55%),radial-gradient(circle_at_90%_30%,rgba(167,139,250,0.16),transparent_55%)]" />
        {/* Shimmer sweep */}
        <motion.div
          className="absolute -left-1/2 top-0 h-full w-1/2 bg-white/10 blur-sm"
          animate={{ x: ["0%", "240%"] }}
          transition={shimmerTransition}
          style={{ transform: "skewX(-20deg)" }}
        />
      </div>

      {/* ── Window bar (static — not animated per spec) ────────────────── */}
      <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <div className="h-2.5 w-2.5 rounded-full bg-white/18" />
          <div className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-white/70">
          <Sparkles className="h-4 w-4 text-neon-cyan/90" />
          EvolveOS — Painel de Controle
        </div>
      </div>

      {/* ── Main content ───────────────────────────────────────────────── */}
      <div className="relative p-6 space-y-4">

        {/* ── Static KPI mini-cards ────────────────────────────────────── */}
        <div className="grid gap-3 grid-cols-2">
          {STATIC_KPIS.map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-3xl bg-white/[0.04] p-4 ring-1 ring-white/10"
            >
              <div className="text-xs font-semibold text-white/60">{kpi.label}</div>
              <div
                className={[
                  "mt-2 inline-flex items-center rounded-2xl bg-gradient-to-r px-3 py-1.5 text-base font-semibold text-ink-950 shadow-glow",
                  kpi.tone,
                ].join(" ")}
              >
                {kpi.value}
              </div>
            </div>
          ))}
        </div>

        {/* ── Live metric cards ─────────────────────────────────────────── */}
        <div className="grid gap-3 grid-cols-2">

          {/* — Produtividade — */}
          <div className="rounded-3xl bg-white/[0.04] p-4 ring-1 ring-white/10 overflow-hidden">
            <div className="text-xs font-semibold text-white/60">Produtividade</div>
            <div className="mt-2 h-9 flex items-center">
              <div className="inline-flex items-center rounded-2xl bg-gradient-to-r from-neon-cyan to-neon-blue px-3 py-1.5 text-base font-semibold text-ink-950 shadow-glow overflow-hidden">
                +
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={productivity.key}
                    variants={numberTickerVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={numberTickerTransition}
                    className="tabular-nums inline-block"
                  >
                    {productivity.value}
                  </motion.span>
                </AnimatePresence>
                %
              </div>
            </div>
            <div className="mt-1 text-[10px] text-white/40 leading-tight">
              vs. média anterior
            </div>
          </div>

          {/* — Tempo Economizado — */}
          <div className="rounded-3xl bg-white/[0.04] p-4 ring-1 ring-white/10 overflow-hidden">
            <div className="text-xs font-semibold text-white/60">Tempo economizado</div>
            <div className="mt-2 h-9 flex items-center">
              <div className="inline-flex items-center rounded-2xl bg-gradient-to-r from-neon-purple to-neon-blue px-3 py-1.5 text-base font-semibold text-ink-950 shadow-glow overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={timeSaved.key}
                    variants={numberTickerVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={numberTickerTransition}
                    className="tabular-nums inline-block"
                  >
                    {timeSaved.value}
                  </motion.span>
                </AnimatePresence>
                h/semana
              </div>
            </div>
            <div className="mt-1 text-[10px] text-white/40 leading-tight">
              por colaborador
            </div>
          </div>
        </div>

        {/* ── Bar chart — "Fluxo de Processos" ─────────────────────────── */}
        <div className="rounded-3xl bg-white/[0.04] p-5 ring-1 ring-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-white">Fluxo de Processos</div>
            <Badge className="text-white/90">ao vivo</Badge>
          </div>

          {/* Bar chart — transformOrigin bottom, scaleY breathing */}
          <div className="grid grid-cols-12 gap-2 items-end h-[72px] evolve-bar-chart">
            {(BAR_HEIGHTS as readonly number[]).map((h, idx) => {
              const cfg = BAR_CONFIGS[idx];
              const colorKey = idx % 3 as 0 | 1 | 2;

              return (
                <motion.div
                  key={idx}
                  className={[
                    "col-span-1 rounded-2xl bg-gradient-to-t ring-1 ring-white/10",
                    BAR_COLOR_CLASSES[colorKey],
                  ].join(" ")}
                  style={{
                    height: `${h * 7}px`,
                    transformOrigin: "bottom",
                  }}
                  variants={barVariants}
                  custom={cfg}
                  initial={false}
                  animate="animate"
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
