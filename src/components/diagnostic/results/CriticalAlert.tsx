import React from 'react';
import { AlertOctagon } from 'lucide-react';

interface CriticalAlertProps {
  alerts: string[];
}

export function CriticalAlert({ alerts }: CriticalAlertProps) {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="bg-red-50 border-l-4 border-red-600 p-4 sm:p-6 rounded-r-xl mb-8">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 text-red-600 mt-1">
          <AlertOctagon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-red-900 mb-2">Atenção Crítica Necessária</h3>
          <p className="text-red-700 text-sm mb-4">
            Identificamos pontos de falha que colocam a continuidade ou a segurança do seu negócio em risco:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-red-800">
            {alerts.map((alert, idx) => (
              <li key={idx}>{alert}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
