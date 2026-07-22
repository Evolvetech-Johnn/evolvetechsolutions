"use client";

import React, { useEffect, useState, use } from 'react';
import { DiagnosticResultView } from '../../../../components/diagnostic/DiagnosticResultView';
import { DiagnosticResult } from '../../../../types/diagnostic';
import { diagnosticApi } from '../../../../services/diagnosticApi';
import { notFound } from 'next/navigation';
import { AlertCircle } from 'lucide-react';

export default function DiagnosticResultPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        // Primeiro tenta buscar no backend
        let data = await diagnosticApi.getResult(id);
        
        // Como o backend é mock, tentamos no localStorage se vier nulo
        if (!data) {
          const localData = localStorage.getItem(`@evolvetech:result_${id}`);
          if (localData) {
            data = JSON.parse(localData);
          }
        }

        if (data) {
          setResult(data);
        } else {
          setError(true);
        }
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ink-950 flex-col gap-4">
        <div className="w-8 h-8 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white/60 font-medium">Buscando seu relatório...</p>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ink-950 p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-grid opacity-30 mix-blend-screen pointer-events-none" />
        <div className="relative max-w-md bg-white/[0.03] ring-1 ring-white/10 shadow-glowStrong p-8 rounded-2xl backdrop-blur text-center">
          <div className="w-12 h-12 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto mb-4 ring-1 ring-red-500/30">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Relatório não encontrado</h2>
          <p className="text-white/60 mb-6">Não conseguimos localizar o diagnóstico solicitado. Ele pode ter expirado ou o link é inválido.</p>
          <a href="/diagnostico" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-ink-950 bg-neon-cyan hover:bg-white w-full transition-colors shadow-glow">
            Fazer Novo Diagnóstico
          </a>
        </div>
      </div>
    );
  }

  return <DiagnosticResultView result={result} />;
}
