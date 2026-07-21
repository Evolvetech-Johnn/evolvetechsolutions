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
    <div className="bg-slate-50 min-h-screen py-10 print:bg-white print:py-0">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-200 print:hidden">
          <div>
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-1">Diagnóstico Concluído</p>
            <h1 className="text-3xl font-bold text-slate-900">
              Maturidade Digital: {result.companyProfile.nomeEmpresa || 'Sua Empresa'}
            </h1>
            <p className="text-slate-500 mt-2">
              Gerado em {new Date(result.createdAt).toLocaleDateString('pt-BR')} para {result.lead?.nome}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handlePrint}
              className="inline-flex items-center px-4 py-2 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Salvar PDF
            </button>
            <a 
              href={whatsappLink}
              target="_blank" rel="noreferrer"
              className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
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
          <div className="md:col-span-2 bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col justify-center">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Resumo Executivo</h3>
            <p className="text-slate-600 leading-relaxed">
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
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Recomendações Prioritárias</h2>
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
        <div className="bg-blue-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden print:hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-10 -mt-10"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl -ml-10 -mb-10"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Transforme este diagnóstico em um plano de evolução</h2>
            <p className="text-blue-100 text-lg mb-8">
              Converse com um especialista da EVOLVETECH SOLUTIONS para validar as oportunidades, 
              estimar o retorno e definir a melhor solução para sua empresa.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href={whatsappLink}
                target="_blank" rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-xl shadow-lg hover:bg-slate-50 transition-all hover:scale-105"
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
