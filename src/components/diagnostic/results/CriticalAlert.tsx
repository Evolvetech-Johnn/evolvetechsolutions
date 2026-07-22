import React from 'react';
import { AlertOctagon } from 'lucide-react';

interface CriticalAlertProps {
  alerts: string[];
}

export function CriticalAlert({ alerts }: CriticalAlertProps) {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="bg-red-500/10 border-l-4 border-red-500 p-5 sm:p-6 rounded-r-xl mb-8 ring-1 ring-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 text-red-500 mt-1 shadow-[0_0_10px_rgba(239,68,68,0.5)] rounded-full">
          <AlertOctagon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-red-400 mb-2">Atenção Crítica Necessária</h3>
          <p className="text-red-200/90 text-sm mb-4 leading-relaxed">
            Identificamos pontos de falha que colocam a continuidade ou a segurança do seu negócio em risco:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-red-300/90">
            {alerts.map((alert, idx) => (
              <li key={idx}>{alert}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
