import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { MaturityLevel } from '../../../types/diagnostic';

interface ScoreGaugeProps {
  score: number;
  level: MaturityLevel;
}

export function ScoreGauge({ score, level }: ScoreGaugeProps) {
  const getLevelInfo = (lvl: MaturityLevel) => {
    switch (lvl) {
      case 'Nivel1': return { label: 'Presença Inicial', color: '#ef4444' };
      case 'Nivel2': return { label: 'Operação Reativa', color: '#f97316' };
      case 'Nivel3': return { label: 'Estrutura em Desenvolvimento', color: '#eab308' };
      case 'Nivel4': return { label: 'Gestão Digital', color: '#3b82f6' };
      case 'Nivel5': return { label: 'Operação Inteligente', color: '#22c55e' };
      default: return { label: 'Desconhecido', color: '#94a3b8' };
    }
  };

  const info = getLevelInfo(level);
  const data = [
    { name: 'Score', value: score },
    { name: 'Rest', value: 100 - score },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
      <div className="w-full h-48 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="100%"
              startAngle={180}
              endAngle={0}
              innerRadius="75%"
              outerRadius="100%"
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              <Cell key="cell-0" fill={info.color} />
              <Cell key="cell-1" fill="#f1f5f9" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
          <span className="text-5xl font-extrabold text-slate-900 tracking-tighter">
            {score}
          </span>
          <span className="text-sm font-medium text-slate-500">/ 100</span>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <span 
          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold mb-2"
          style={{ backgroundColor: `${info.color}15`, color: info.color }}
        >
          {info.label}
        </span>
      </div>
    </div>
  );
}
