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
    <div className="bg-white/[0.03] ring-1 ring-white/10 shadow-glow rounded-3xl p-6 flex flex-col items-center justify-center backdrop-blur h-full">
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 500 }} 
            />
            <Radar
              name="Potencial Recomendado"
              dataKey="Potencial"
              stroke="rgba(255,255,255,0.2)"
              fill="rgba(255,255,255,0.1)"
              fillOpacity={0.1}
            />
            <Radar
              name="Situação Atual"
              dataKey="Atual"
              stroke="#3EE7FF"
              strokeWidth={2}
              fill="#3EE7FF"
              fillOpacity={0.2}
            />
            <Tooltip 
              formatter={(value: any) => [`${value}%`, '']}
              contentStyle={{ backgroundColor: '#0B1020', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', boxShadow: '0 0 20px rgba(62,231,255,0.15)' }}
              itemStyle={{ color: '#3EE7FF' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
