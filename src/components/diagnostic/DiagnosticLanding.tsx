import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock, ShieldCheck, Target, ArrowRight } from 'lucide-react';

interface DiagnosticLandingProps {
  onStart: () => void;
}

export function DiagnosticLanding({ onStart }: DiagnosticLandingProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <main className="flex-grow flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
            <Activity className="w-4 h-4" />
            Ferramenta Exclusiva
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Descubra o nível de maturidade digital da sua empresa
          </h1>
          
          <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto mb-10">
            Em poucos minutos, identifique gargalos, oportunidades e perdas causadas por processos manuais, 
            falta de dados, sistemas desconectados e presença digital insuficiente.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 text-left max-w-3xl mx-auto mb-12">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Diagnóstico Preciso</h3>
              <p className="text-slate-600 text-sm">Avalie 6 dimensões cruciais do seu negócio e descubra seu score de 0 a 100.</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Plano de Ação</h3>
              <p className="text-slate-600 text-sm">Receba recomendações práticas e um roadmap de 90 dias para evolução.</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">100% Gratuito</h3>
              <p className="text-slate-600 text-sm">Sem compromisso, com total privacidade e segurança dos seus dados.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStart}
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all hover:scale-105"
            >
              Iniciar diagnóstico
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <a 
              href="https://wa.me/5511999999999" // TODO: Add real whatsapp
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 border border-slate-200 text-lg font-medium rounded-xl text-slate-700 bg-white hover:bg-slate-50 transition-colors"
            >
              Falar com especialista
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 5 a 8 minutos</span>
            <span>•</span>
            <span>Dados protegidos</span>
          </div>
          <p className="mt-4 text-xs text-slate-400">
            * As estimativas apresentadas ao final são indicativas e dependem das informações fornecidas.
          </p>
        </motion.div>
      </main>
    </div>
  );
}
