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
    <div className="bg-white/[0.03] ring-1 ring-white/10 shadow-glowStrong rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden backdrop-blur">
      {/* Decorative bg */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 text-white/5 pointer-events-none">
        <Calendar className="w-64 h-64" />
      </div>

      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-8 text-white">Plano Sugerido: Próximos 90 Dias</h3>

        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-neon-blue ring-4 ring-neon-blue/20 shadow-[0_0_10px_rgba(45,110,255,0.5)]"></div>
              <div className="w-0.5 h-full bg-white/10 mt-2"></div>
            </div>
            <div className="pb-8">
              <h4 className="font-bold text-neon-blue text-lg mb-2">0 a 30 dias: Fundação</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                {shortTerm.slice(0, 3).map((item, idx) => (
                  <li key={idx} className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-neon-blue/50 flex-shrink-0" />
                    <span>{item.solucaoRecomendada}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-neon-cyan ring-4 ring-neon-cyan/20 shadow-[0_0_10px_rgba(62,231,255,0.5)]"></div>
              <div className="w-0.5 h-full bg-white/10 mt-2"></div>
            </div>
            <div className="pb-8">
              <h4 className="font-bold text-neon-cyan text-lg mb-2">31 a 60 dias: Implementação</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                {midTerm.slice(0, 3).map((item, idx) => (
                  <li key={idx} className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-neon-cyan/50 flex-shrink-0" />
                    <span>{item.solucaoRecomendada}</span>
                  </li>
                ))}
                <li className="flex gap-2">
                  <CheckCircle2 className="w-5 h-5 text-neon-cyan/50 flex-shrink-0" />
                  <span>Prototipar dashboard ou sistema prioritário</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-neon-purple ring-4 ring-neon-purple/20 shadow-[0_0_10px_rgba(188,45,255,0.5)]"></div>
            </div>
            <div>
              <h4 className="font-bold text-neon-purple text-lg mb-2">61 a 90 dias: Expansão</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li className="flex gap-2">
                  <CheckCircle2 className="w-5 h-5 text-neon-purple/50 flex-shrink-0" />
                  <span>Colocar solução em produção e treinar usuários</span>
                </li>
                {longTerm.slice(0, 2).map((item, idx) => (
                  <li key={idx} className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-neon-purple/50 flex-shrink-0" />
                    <span>{item.solucaoRecomendada}</span>
                  </li>
                ))}
                <li className="flex gap-2">
                  <CheckCircle2 className="w-5 h-5 text-neon-purple/50 flex-shrink-0" />
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
