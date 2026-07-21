import React, { useState } from 'react';
import { Lead } from '../../../types/diagnostic';
import { Lock, ArrowRight, CheckCircle2 } from 'lucide-react';

interface LeadCaptureProps {
  overallScore: number;
  onSubmit: (lead: Lead) => void;
  submitting: boolean;
}

export function LeadCapture({ overallScore, onSubmit, submitting }: LeadCaptureProps) {
  const [formData, setFormData] = useState<Lead>({
    nome: '',
    cargo: '',
    email: '',
    telefone: '',
    autorizacaoContato: true,
    aceitePrivacidade: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof Lead, string>>>({});

  const validate = () => {
    const newErrors: Partial<Record<keyof Lead, string>> = {};
    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!formData.cargo.trim()) newErrors.cargo = 'Cargo é obrigatório';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'E-mail corporativo inválido';
    }
    if (!formData.telefone.trim()) newErrors.telefone = 'Telefone é obrigatório';
    if (!formData.aceitePrivacidade) {
      newErrors.aceitePrivacidade = 'Você deve aceitar a Política de Privacidade';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 text-blue-600 mb-4 ring-8 ring-blue-50/50">
            <span className="text-3xl font-extrabold">{overallScore}</span>
            <span className="text-sm font-medium ml-1">/100</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Seu diagnóstico está pronto!</h2>
          <p className="mt-2 text-slate-600">
            Calculamos sua nota geral. Preencha os dados abaixo para liberar o relatório detalhado,
            os gargalos identificados e seu plano de ação.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nome completo</label>
              <input
                type="text"
                className={`w-full rounded-xl border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 ${errors.nome ? 'border-red-300 ring-red-100' : ''}`}
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              />
              {errors.nome && <p className="mt-1 text-xs text-red-600">{errors.nome}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Cargo</label>
              <input
                type="text"
                className={`w-full rounded-xl border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 ${errors.cargo ? 'border-red-300 ring-red-100' : ''}`}
                value={formData.cargo}
                onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
              />
              {errors.cargo && <p className="mt-1 text-xs text-red-600">{errors.cargo}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">E-mail corporativo</label>
              <input
                type="email"
                className={`w-full rounded-xl border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 ${errors.email ? 'border-red-300 ring-red-100' : ''}`}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Telefone / WhatsApp</label>
              <input
                type="text"
                className={`w-full rounded-xl border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 ${errors.telefone ? 'border-red-300 ring-red-100' : ''}`}
                value={formData.telefone}
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                placeholder="(00) 00000-0000"
              />
              {errors.telefone && <p className="mt-1 text-xs text-red-600">{errors.telefone}</p>}
            </div>
          </div>

          <div className="pt-4 space-y-4">
            <label className="flex items-start">
              <input
                type="checkbox"
                className="mt-1 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                checked={formData.aceitePrivacidade}
                onChange={(e) => setFormData({ ...formData, aceitePrivacidade: e.target.checked })}
              />
              <span className="ml-3 text-sm text-slate-600">
                Li e concordo com a <a href="/privacidade" target="_blank" className="text-blue-600 hover:underline">Política de Privacidade</a>.
              </span>
            </label>
            {errors.aceitePrivacidade && <p className="mt-0 text-xs text-red-600 pl-7">{errors.aceitePrivacidade}</p>}

            <label className="flex items-start">
              <input
                type="checkbox"
                className="mt-1 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                checked={formData.autorizacaoContato}
                onChange={(e) => setFormData({ ...formData, autorizacaoContato: e.target.checked })}
              />
              <span className="ml-3 text-sm text-slate-600">
                Autorizo o contato de um consultor da EVOLVETECH SOLUTIONS para analisar meus resultados.
              </span>
            </label>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center px-6 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all disabled:opacity-70"
            >
              {submitting ? (
                "Gerando relatório..."
              ) : (
                <>
                  Ver Relatório Completo <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </button>
            <p className="mt-4 text-xs text-center text-slate-500 flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" /> Seus dados estão seguros
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
