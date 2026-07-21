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
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-6">Detalhamento por Área</h3>
      <div className="space-y-5">
        {data.map((item, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-sm font-medium mb-1">
              <span className="text-slate-700">{item.label}</span>
              <span className={item.percentage < 50 ? 'text-orange-600' : 'text-blue-600'}>
                {item.percentage}%
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full rounded-full ${item.percentage < 50 ? 'bg-orange-500' : 'bg-blue-600'}`}
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
