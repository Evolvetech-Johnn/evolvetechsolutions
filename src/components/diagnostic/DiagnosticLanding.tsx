import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock, ShieldCheck, Target, ArrowRight, BadgeCheck, Zap, LineChart } from 'lucide-react';

interface DiagnosticLandingProps {
  onStart: () => void;
}

export function DiagnosticLanding({ onStart }: DiagnosticLandingProps) {
  return (
    <div className="min-h-screen bg-ink-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-grid opacity-40 mix-blend-screen pointer-events-none" />
      <div className="absolute inset-0 bg-soft-noise opacity-30 pointer-events-none mix-blend-overlay" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full bg-white/[0.03] ring-1 ring-white/10 shadow-glowStrong rounded-3xl p-8 md:p-12 text-center backdrop-blur relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan text-sm font-semibold mb-6">
          <BadgeCheck className="w-4 h-4" />
          Diagnóstico Gratuito
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          Sua empresa está perdendo dinheiro por falta de 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple block mt-2">
            automação e controle?
          </span>
        </h1>

        <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
          Descubra em 3 minutos o seu nível de maturidade digital, identifique gargalos operacionais 
          e veja quanto a falta de sistemas adequados está custando para o seu negócio.
        </p>

        <div className="grid sm:grid-cols-3 gap-6 text-left mb-10">
          <div className="bg-white/[0.03] ring-1 ring-white/10 p-5 rounded-2xl">
            <div className="w-10 h-10 bg-neon-cyan/10 rounded-xl flex items-center justify-center text-neon-cyan mb-4 ring-1 ring-neon-cyan/20">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-white mb-2">Rápido e Prático</h3>
            <p className="text-sm text-white/60">Apenas 3 minutos para responder perguntas de múltipla escolha.</p>
          </div>
          <div className="bg-white/[0.03] ring-1 ring-white/10 p-5 rounded-2xl">
            <div className="w-10 h-10 bg-neon-blue/10 rounded-xl flex items-center justify-center text-neon-blue mb-4 ring-1 ring-neon-blue/20">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-white mb-2">Diagnóstico Preciso</h3>
            <p className="text-sm text-white/60">Análise de 6 dimensões vitais da sua operação.</p>
          </div>
          <div className="bg-white/[0.03] ring-1 ring-white/10 p-5 rounded-2xl">
            <div className="w-10 h-10 bg-neon-purple/10 rounded-xl flex items-center justify-center text-neon-purple mb-4 ring-1 ring-neon-purple/20">
              <LineChart className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-white mb-2">Relatório Acionável</h3>
            <p className="text-sm text-white/60">Receba recomendações de melhorias imediatas e estimativa de perdas.</p>
          </div>
        </div>

        <button
          onClick={onStart}
          className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-neon-cyan text-ink-950 font-bold text-lg rounded-xl transition-all shadow-glow hover:shadow-glowStrong hover:bg-white w-full sm:w-auto"
        >
          Iniciar diagnóstico
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="mt-8 flex items-center justify-center gap-4 text-sm text-white/50">
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 3 a 5 minutos</span>
          <span>•</span>
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /> Dados protegidos</span>
        </div>
        <p className="mt-4 text-xs text-white/40">
          * As estimativas apresentadas ao final são indicativas e dependem das informações fornecidas.
        </p>
      </motion.div>
    </div>
  );
}
