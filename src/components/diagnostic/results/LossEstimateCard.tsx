import React from 'react';
import { LossEstimate } from '../../../types/diagnostic';
import { AlertTriangle, TrendingDown } from 'lucide-react';

interface LossEstimateCardProps {
  estimate: LossEstimate;
}

export function LossEstimateCard({ estimate }: LossEstimateCardProps) {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  if (estimate.impactoMensal === 0) {
    return null; // Não exibe se não houver estimativas
  }

  return (
    <div className="bg-gradient-to-br from-[#1a0f14] to-[#261118] rounded-3xl ring-1 ring-red-500/20 p-6 md:p-8 shadow-[0_0_30px_rgba(255,0,0,0.05)]">
      <div className="flex items-start gap-4 mb-8">
        <div className="p-3 bg-red-500/10 rounded-xl text-red-400 ring-1 ring-red-500/30">
          <TrendingDown className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">O custo de permanecer como está</h3>
          <p className="text-white/60 text-sm leading-relaxed max-w-3xl">
            Esta é uma projeção indicativa baseada nas respostas fornecidas. O valor real depende da 
            operação, das margens e do contexto da empresa.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white/5 p-5 rounded-2xl ring-1 ring-white/10 backdrop-blur">
          <p className="text-sm font-medium text-white/50 mb-2">Horas Manuais/Mês</p>
          <p className="text-2xl font-bold text-white">~{Math.round(estimate.horasManuaisMensais)}h</p>
        </div>
        
        <div className="bg-white/5 p-5 rounded-2xl ring-1 ring-white/10 backdrop-blur">
          <p className="text-sm font-medium text-white/50 mb-2">Custo Operacional Extra</p>
          <p className="text-2xl font-bold text-white">{formatCurrency(estimate.perdaManualAjustada + estimate.perdaRetrabalho + estimate.custoRelatoriosMensais)}</p>
        </div>

        <div className="bg-white/5 p-5 rounded-2xl ring-1 ring-white/10 backdrop-blur">
          <p className="text-sm font-medium text-white/50 mb-2">Receita Não Capturada</p>
          <p className="text-2xl font-bold text-white">{formatCurrency(estimate.receitaPotencialPerdida + estimate.receitaFollowUpPerdida)}</p>
        </div>

        <div className="bg-red-500/20 p-5 rounded-2xl ring-1 ring-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
          <p className="text-sm font-medium text-red-200/80 mb-2">Impacto Anual Estimado</p>
          <p className="text-2xl font-bold text-red-400">{formatCurrency(estimate.impactoAnual)}</p>
        </div>
      </div>

      <div className="flex items-start gap-4 text-sm text-red-200/90 bg-red-500/10 ring-1 ring-red-500/20 p-5 rounded-xl">
        <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-400 mt-0.5" />
        <p className="leading-relaxed">
          A falta de sistemas integrados e automações adequadas pode estar custando à sua empresa até 
          <strong className="text-red-400 font-bold"> {formatCurrency(estimate.impactoAnual)} por ano</strong> entre desperdício operacional 
          e oportunidades comerciais perdidas.
        </p>
      </div>
    </div>
  );
}
