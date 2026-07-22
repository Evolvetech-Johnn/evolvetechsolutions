import React from 'react';
import { DiagnosticResult as ResultType } from '../../types/diagnostic';
import { ScoreGauge } from './results/ScoreGauge';
import { DimensionScoreCard } from './results/DimensionScoreCard';
import { MaturityRadarChart } from './results/MaturityRadarChart';
import { LossEstimateCard } from './results/LossEstimateCard';
import { RecommendationCard } from './results/RecommendationCard';
import { ActionPlan } from './results/ActionPlan';
import { CriticalAlert } from './results/CriticalAlert';
import { Calendar, Download, MessageSquare } from 'lucide-react';

interface DiagnosticResultViewProps {
  result: ResultType;
}

export function DiagnosticResultView({ result }: DiagnosticResultViewProps) {
  const getLevelDescription = (lvl: string) => {
    switch (lvl) {
      case 'Nivel1': return 'A empresa possui pouca estrutura digital e depende fortemente de atividades manuais, conhecimento informal e ferramentas isoladas. Hoje, a tecnologia ainda não atua como um motor de crescimento. Há oportunidades básicas que podem gerar ganhos rápidos.';
      case 'Nivel2': return 'Existem ferramentas e iniciativas digitais, porém sem integração, padronização ou acompanhamento consistente. Sua empresa já iniciou a transformação digital, mas ainda perde eficiência por falta de conexão e método.';
      case 'Nivel3': return 'A empresa possui processos e ferramentas relevantes, mas ainda há gargalos que limitam produtividade, controle e escala. Você já possui uma base importante. O próximo salto depende de integrar dados, automatizar rotinas e fortalecer a gestão.';
      case 'Nivel4': return 'A tecnologia apoia boa parte da operação e das decisões, com oportunidades pontuais de integração, previsibilidade e otimização. Sua empresa apresenta boa maturidade digital. O foco agora deve ser aumentar inteligência, eficiência e escalabilidade.';
      case 'Nivel5': return 'A empresa utiliza tecnologia, dados e automação de forma estratégica, integrada e orientada a resultados. Sua estrutura digital é avançada. As maiores oportunidades estão em inovação, inteligência preditiva e diferenciação.';
      default: return '';
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const whatsappLink = `https://wa.me/5511999999999?text=Ol%C3%A1!%20Fiz%20o%20diagn%C3%B3stico%20e%20gostaria%20de%20falar%20sobre%20meus%20resultados.%20Minha%20nota%20foi%20${result.overallScore}.`;

  return (
    <div className="bg-ink-950 min-h-screen py-10 relative overflow-hidden print:bg-white print:py-0">
      
      {/* Decorative background */}
      <div className="absolute inset-0 bg-hero-grid opacity-30 mix-blend-screen pointer-events-none print:hidden" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[120px] pointer-events-none print:hidden" />
      <div className="absolute bottom-1/2 left-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-[120px] pointer-events-none print:hidden" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10 print:hidden">
          <div>
            <p className="text-sm font-semibold text-neon-cyan uppercase tracking-wider mb-1">Diagnóstico Concluído</p>
            <h1 className="text-3xl font-bold text-white">
              Maturidade Digital: {result.companyProfile.nomeEmpresa || 'Sua Empresa'}
            </h1>
            <p className="text-white/60 mt-2">
              Gerado em {new Date(result.createdAt).toLocaleDateString('pt-BR')} para {result.lead?.nome}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handlePrint}
              className="inline-flex items-center px-4 py-2 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition-colors shadow-sm"
            >
              <Download className="w-4 h-4 mr-2" />
              Salvar PDF
            </button>
            <a 
              href={whatsappLink}
              target="_blank" rel="noreferrer"
              className="inline-flex items-center px-4 py-2 bg-neon-green/10 border border-neon-green/20 text-neon-green font-medium rounded-xl hover:bg-neon-green/20 transition-colors shadow-[0_0_15px_rgba(59,255,182,0.15)]"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Falar no WhatsApp
            </a>
          </div>
        </div>

        {/* Print Header */}
        <div className="hidden print:block mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Diagnóstico de Maturidade Digital</h1>
          <p className="text-slate-600">Empresa: {result.companyProfile.nomeEmpresa || 'Não informado'} | Data: {new Date(result.createdAt).toLocaleDateString('pt-BR')}</p>
        </div>

        <CriticalAlert alerts={result.criticalAlerts} />

        {/* Top Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="md:col-span-1">
            <ScoreGauge score={result.overallScore} level={result.maturityLevel} />
          </div>
          <div className="md:col-span-2 bg-white/[0.03] ring-1 ring-white/10 rounded-3xl p-6 md:p-8 shadow-glow flex flex-col justify-center backdrop-blur">
            <h3 className="text-xl font-bold text-white mb-3">Resumo Executivo</h3>
            <p className="text-white/70 leading-relaxed text-lg">
              {getLevelDescription(result.maturityLevel)}
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <DimensionScoreCard scores={result.scores} />
          <MaturityRadarChart scores={result.scores} />
        </div>

        {/* Losses */}
        <div className="mb-12">
          <LossEstimateCard estimate={result.lossEstimate} />
        </div>

        {/* Recommendations */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Recomendações Prioritárias</h2>
          <div className="space-y-4">
            {result.recommendations.map((rec, idx) => (
              <RecommendationCard key={rec.id} recommendation={rec} index={idx + 1} />
            ))}
          </div>
        </div>

        {/* Action Plan */}
        <div className="mb-16">
          <ActionPlan recommendations={result.recommendations} />
        </div>

        {/* CTA Footer */}
        <div className="relative overflow-hidden rounded-[32px] bg-white/[0.03] ring-1 ring-white/10 shadow-glowStrong backdrop-blur p-8 md:p-12 text-center print:hidden">
          <div className="absolute inset-0 opacity-60">
            <div className="absolute -top-24 right-[-80px] h-56 w-56 rounded-full bg-neon-cyan/[0.14] blur-3xl" />
            <div className="absolute -bottom-28 left-[-80px] h-64 w-64 rounded-full bg-neon-purple/[0.14] blur-3xl" />
          </div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">Transforme este diagnóstico em um <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple">plano de evolução</span></h2>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Converse com um especialista da EVOLVETECH SOLUTIONS para validar as oportunidades, 
              estimar o retorno e definir a melhor solução para sua empresa.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href={whatsappLink}
                target="_blank" rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-neon-cyan text-ink-950 font-bold text-lg rounded-xl shadow-glow hover:shadow-glowStrong hover:bg-white transition-all hover:scale-105"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Agendar diagnóstico consultivo
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
