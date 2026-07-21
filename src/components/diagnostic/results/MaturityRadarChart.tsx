import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { DiagnosticDimension, DimensionScore } from '../../../types/diagnostic';
import { dimensionsConfig } from '../../../config/diagnosticQuestions';

interface MaturityRadarChartProps {
  scores: Record<DiagnosticDimension, DimensionScore>;
}

export function MaturityRadarChart({ scores }: MaturityRadarChartProps) {
  const data = Object.values(dimensionsConfig).map((config) => {
    const dimScore = scores[config.id];
    return {
      subject: config.label,
      Atual: dimScore ? Math.round(dimScore.percentage) : 0,
      Potencial: 100,
    };
  });

  return (
    <div className="w-full h-80 bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
      <h3 className="text-lg font-semibold text-slate-800 mb-2 text-center">Desempenho por Dimensão</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 11 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
          
          <Radar
            name="Potencial Recomendado"
            dataKey="Potencial"
            stroke="#94a3b8"
            fill="#cbd5e1"
            fillOpacity={0.1}
          />
          <Radar
            name="Situação Atual"
            dataKey="Atual"
            stroke="#2563eb"
            fill="#3b82f6"
            fillOpacity={0.5}
          />
          <Tooltip 
            formatter={(value: any) => [`${value}%`, '']}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
