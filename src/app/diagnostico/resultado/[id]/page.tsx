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
      <div className="min-h-screen flex items-center justify-center bg-slate-50 flex-col gap-4">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium">Buscando seu relatório...</p>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Relatório não encontrado</h2>
          <p className="text-slate-600 mb-6">Não conseguimos localizar o diagnóstico solicitado. Ele pode ter expirado ou o link é inválido.</p>
          <a href="/diagnostico" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 w-full transition-colors">
            Fazer Novo Diagnóstico
          </a>
        </div>
      </div>
    );
  }

  return <DiagnosticResultView result={result} />;
}
