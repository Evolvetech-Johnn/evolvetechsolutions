import React, { useState } from 'react';
import { Lead } from '../../../types/diagnostic';
import { Lock, ArrowRight, CheckCircle2 } from 'lucide-react';

interface LeadCaptureProps {
  overallScore: number;
  onSubmit: (data: LeadData) => void;
  submitting?: boolean;
}

export function LeadCapture({ overallScore, onSubmit, submitting = false }: LeadCaptureProps) {
  const [formData, setFormData] = useState<LeadData>({
    nome: '',
    nomeEmpresa: '',
    email: '',
    telefone: '',
    cargo: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.email || !formData.telefone || !formData.cargo || !formData.nomeEmpresa) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    setError('');
    onSubmit(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-[60vh] relative">
      <div className="max-w-xl w-full bg-white/[0.03] ring-1 ring-white/10 shadow-glowStrong p-8 md:p-12 rounded-3xl backdrop-blur relative overflow-hidden">

        {/* Glow halo */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan opacity-[0.05] rounded-full blur-3xl -mr-20 -mt-20"></div>

        <div className="text-center mb-8 relative z-10">
          <div className="w-16 h-16 bg-neon-green/10 text-neon-green rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-neon-green/30 shadow-[0_0_20px_rgba(59,255,182,0.2)]">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white">Seu diagnóstico está pronto!</h2>
          <p className="text-white/60 mt-3">
            Sua nota prévia é <strong>{overallScore}/100</strong>. Para acessar o relatório completo com estimativa de perdas
            financeiras e plano de ação de 90 dias, informe seus dados:
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">Nome Completo *</label>
            <input
              type="text"
              required
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/30 shadow-sm focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan focus:outline-none p-3.5 transition-all"
              placeholder="Ex: João da Silva"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">Nome da Empresa *</label>
            <input
              type="text"
              required
              value={formData.nomeEmpresa}
              onChange={(e) => setFormData({ ...formData, nomeEmpresa: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/30 shadow-sm focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan focus:outline-none p-3.5 transition-all"
              placeholder="Sua Empresa LTDA"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">E-mail Corporativo *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/30 shadow-sm focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan focus:outline-none p-3.5 transition-all"
                placeholder="joao@empresa.com.br"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">WhatsApp *</label>
              <input
                type="tel"
                required
                value={formData.telefone}
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/30 shadow-sm focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan focus:outline-none p-3.5 transition-all"
                placeholder="(11) 99999-9999"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">Cargo *</label>
            <select
              required
              value={formData.cargo}
              onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-ink-950 text-white shadow-sm focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan focus:outline-none p-3.5 transition-all"
            >
              <option value="" disabled className="text-white/40">Selecione seu cargo</option>
              <option value="Sócio/Fundador">Sócio / Fundador</option>
              <option value="Diretor">Diretor / C-Level</option>
              <option value="Gerente">Gerente / Coordenador</option>
              <option value="Analista">Analista / Especialista</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center px-6 py-4 rounded-xl text-ink-950 font-bold bg-neon-cyan hover:bg-white transition-all shadow-glow hover:shadow-glowStrong disabled:opacity-50"
            >
              {submitting ? 'Gerando relatório...' : 'Ver meu Diagnóstico e Perdas Financeiras'}
              {!submitting && <Lock className="ml-2 w-4 h-4 opacity-70" />}
            </button>
          </div>

          <div className="mt-4 text-xs text-white/40 flex items-start gap-2 leading-relaxed">
            <Lock className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p>
              Garantimos 100% de sigilo sobre os dados inseridos. Ao continuar, você concorda com
              nossa Política de Privacidade e em receber contatos comerciais da EVOLVETECH SOLUTIONS.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
