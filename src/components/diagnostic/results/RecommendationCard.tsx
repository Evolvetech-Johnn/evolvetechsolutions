import React from 'react';
import { Recommendation } from '../../../types/diagnostic';
import { ArrowRight, Lightbulb, Target, Clock, Zap } from 'lucide-react';

interface RecommendationCardProps {
  recommendation: Recommendation;
  index: number;
}

export function RecommendationCard({ recommendation, index }: RecommendationCardProps) {
  const getPriorityColor = (prio: string) => {
    switch (prio) {
      case 'Crítica': return 'bg-red-100 text-red-700';
      case 'Alta': return 'bg-orange-100 text-orange-700';
      case 'Média': return 'bg-blue-100 text-blue-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="bg-white/[0.03] ring-1 ring-white/10 rounded-2xl shadow-glow overflow-hidden flex flex-col md:flex-row backdrop-blur">
      <div className="bg-white/5 p-6 md:w-1/3 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-3">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-white text-xs font-bold ring-1 ring-white/20">
            {index}
          </span>
          <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider ${getPriorityColor(recommendation.prioridade)}`}>
            Prioridade {recommendation.prioridade}
          </span>
        </div>
        <h4 className="text-lg font-bold text-white leading-tight mb-2">
          {recommendation.solucaoRecomendada}
        </h4>
        <p className="text-sm text-white/50 flex items-center gap-1 mt-auto pt-4">
          <Target className="w-4 h-4" /> Impacto: {recommendation.impacto}
        </p>
      </div>
      
      <div className="p-6 md:w-2/3 flex flex-col gap-4">
        <div>
          <p className="text-sm font-semibold text-white/80 uppercase tracking-wide mb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)]"></span> O Problema
          </p>
          <p className="text-white/60 text-sm">{recommendation.problema}</p>
        </div>
        
        <div>
          <p className="text-sm font-semibold text-white/80 uppercase tracking-wide mb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-green shadow-[0_0_8px_rgba(59,255,182,0.8)]"></span> O Benefício Esperado
          </p>
          <p className="text-white/60 text-sm">{recommendation.beneficioEsperado}</p>
        </div>

        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs font-medium text-white/50 flex items-center gap-1">
            <Clock className="w-4 h-4" /> Horizonte: {recommendation.horizonte}
          </span>
          <button className="text-sm font-semibold text-neon-cyan hover:text-white flex items-center gap-1 transition-colors">
            Saber mais <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
