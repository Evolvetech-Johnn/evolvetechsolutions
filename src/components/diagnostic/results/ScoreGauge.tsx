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
    <div className="flex flex-col items-center justify-center p-6 bg-white/[0.03] rounded-3xl ring-1 ring-white/10 shadow-glow relative overflow-hidden backdrop-blur h-full">
      <div className="w-full h-48 relative z-10">
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
              <Cell key="cell-0" fill={info.color} style={{ filter: `drop-shadow(0 0 10px ${info.color}66)` }} />
              <Cell key="cell-1" fill="rgba(255,255,255,0.05)" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
          <span className="text-5xl font-extrabold text-white tracking-tighter" style={{ textShadow: `0 0 20px ${info.color}40` }}>
            {score}
          </span>
          <span className="text-sm font-medium text-white/50">/ 100</span>
        </div>
      </div>
      
      <div className="mt-4 text-center relative z-10">
        <span 
          className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold mb-2 ring-1"
          style={{ backgroundColor: `${info.color}15`, color: info.color, boxShadow: `0 0 0 1px ${info.color}30` }}
        >
          {info.label}
        </span>
      </div>
    </div>
  );
}
