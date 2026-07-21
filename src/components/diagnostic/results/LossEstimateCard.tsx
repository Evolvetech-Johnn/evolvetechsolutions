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
    <div className="bg-red-50 rounded-2xl border border-red-100 p-6 sm:p-8">
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 bg-red-100 rounded-xl text-red-600">
          <TrendingDown className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-red-900">O custo de permanecer como está</h3>
          <p className="text-red-700/80 text-sm mt-1">
            Esta é uma projeção indicativa baseada nas respostas fornecidas. O valor real depende da 
            operação, das margens e do contexto da empresa.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl border border-red-100 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-1">Horas Manuais/Mês</p>
          <p className="text-2xl font-bold text-slate-900">~{Math.round(estimate.horasManuaisMensais)}h</p>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-red-100 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-1">Custo Operacional Extra</p>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(estimate.perdaManualAjustada + estimate.perdaRetrabalho + estimate.custoRelatoriosMensais)}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-red-100 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-1">Receita Não Capturada</p>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(estimate.receitaPotencialPerdida + estimate.receitaFollowUpPerdida)}</p>
        </div>

        <div className="bg-red-600 p-4 rounded-xl shadow-md text-white">
          <p className="text-sm font-medium text-red-100 mb-1">Impacto Anual Estimado</p>
          <p className="text-2xl font-bold">{formatCurrency(estimate.impactoAnual)}</p>
        </div>
      </div>

      <div className="flex items-start gap-3 text-sm text-red-800 bg-red-100/50 p-4 rounded-lg">
        <AlertTriangle className="w-5 h-5 flex-shrink-0" />
        <p>
          A falta de sistemas integrados e automações adequadas pode estar custando à sua empresa até 
          <strong> {formatCurrency(estimate.impactoAnual)} por ano</strong> entre desperdício operacional 
          e oportunidades comerciais perdidas.
        </p>
      </div>
    </div>
  );
}
