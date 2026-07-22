import React from 'react';
import { DiagnosticDimension, DimensionScore } from '../../../types/diagnostic';
import { dimensionsConfig } from '../../../config/diagnosticQuestions';
import { motion } from 'framer-motion';

interface DimensionScoreCardProps {
  scores: Record<DiagnosticDimension, DimensionScore>;
}

export function DimensionScoreCard({ scores }: DimensionScoreCardProps) {
  const data = Object.values(dimensionsConfig).map(config => {
    const score = scores[config.id];
    return {
      label: config.label,
      percentage: score ? Math.round(score.percentage) : 0,
    };
  });

  return (
    <div className="bg-white/[0.03] ring-1 ring-white/10 shadow-glow rounded-3xl p-6 md:p-8 backdrop-blur">
      <h3 className="text-xl font-bold text-white mb-6">Detalhamento por Área</h3>
      <div className="space-y-6">
        {data.map((item, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-sm font-medium mb-2">
              <span className="text-white/80">{item.label}</span>
              <span className={item.percentage < 50 ? 'text-neon-orange' : 'text-neon-cyan'}>
                {item.percentage}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full rounded-full ${item.percentage < 50 ? 'bg-neon-orange shadow-[0_0_10px_rgba(255,142,62,0.5)]' : 'bg-neon-cyan shadow-[0_0_10px_rgba(62,231,255,0.5)]'}`}
                initial={{ width: 0 }}
                animate={{ width: `${item.percentage}%` }}
                transition={{ duration: 1, delay: idx * 0.1 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
