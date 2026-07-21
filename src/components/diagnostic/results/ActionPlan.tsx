import React from 'react';
import { Recommendation } from '../../../types/diagnostic';
import { Calendar, CheckCircle2 } from 'lucide-react';

interface ActionPlanProps {
  recommendations: Recommendation[];
}

export function ActionPlan({ recommendations }: ActionPlanProps) {
  // Simula um plano baseado no horizonte das recomendações
  const shortTerm = recommendations.filter(r => r.horizonte === 'Ação imediata' || r.horizonte === '30 a 90 dias');
  const midTerm = recommendations.filter(r => r.horizonte === '3 a 6 meses');
  const longTerm = recommendations.filter(r => r.horizonte === '6 a 12 meses');

  // Adiciona itens genéricos se não houver suficientes
  if (shortTerm.length === 0) shortTerm.push({ solucaoRecomendada: "Validar gargalos levantados", beneficioEsperado: "" } as any);
  if (midTerm.length === 0) midTerm.push({ solucaoRecomendada: "Implementar integrações e automações básicas", beneficioEsperado: "" } as any);
  if (longTerm.length === 0) longTerm.push({ solucaoRecomendada: "Escalar melhorias e treinar equipe", beneficioEsperado: "" } as any);

  return (
    <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 text-slate-800 opacity-50">
        <Calendar className="w-64 h-64" />
      </div>

      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-8">Plano Sugerido: Próximos 90 Dias</h3>

        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-blue-500 ring-4 ring-blue-500/20"></div>
              <div className="w-0.5 h-full bg-slate-800 mt-2"></div>
            </div>
            <div className="pb-8">
              <h4 className="font-bold text-blue-400 text-lg mb-2">0 a 30 dias: Fundação</h4>
              <ul className="space-y-2 text-slate-300 text-sm">
                {shortTerm.slice(0, 3).map((item, idx) => (
                  <li key={idx} className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-slate-500 flex-shrink-0" />
                    <span>{item.solucaoRecomendada}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20"></div>
              <div className="w-0.5 h-full bg-slate-800 mt-2"></div>
            </div>
            <div className="pb-8">
              <h4 className="font-bold text-emerald-400 text-lg mb-2">31 a 60 dias: Implementação</h4>
              <ul className="space-y-2 text-slate-300 text-sm">
                {midTerm.slice(0, 3).map((item, idx) => (
                  <li key={idx} className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-slate-500 flex-shrink-0" />
                    <span>{item.solucaoRecomendada}</span>
                  </li>
                ))}
                <li className="flex gap-2">
                  <CheckCircle2 className="w-5 h-5 text-slate-500 flex-shrink-0" />
                  <span>Prototipar dashboard ou sistema prioritário</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-purple-500 ring-4 ring-purple-500/20"></div>
            </div>
            <div>
              <h4 className="font-bold text-purple-400 text-lg mb-2">61 a 90 dias: Expansão</h4>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li className="flex gap-2">
                  <CheckCircle2 className="w-5 h-5 text-slate-500 flex-shrink-0" />
                  <span>Colocar solução em produção e treinar usuários</span>
                </li>
                {longTerm.slice(0, 2).map((item, idx) => (
                  <li key={idx} className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-slate-500 flex-shrink-0" />
                    <span>{item.solucaoRecomendada}</span>
                  </li>
                ))}
                <li className="flex gap-2">
                  <CheckCircle2 className="w-5 h-5 text-slate-500 flex-shrink-0" />
                  <span>Medir ganhos e planejar próxima fase</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
