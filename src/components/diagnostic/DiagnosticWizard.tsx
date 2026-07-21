import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDiagnostic } from '../../hooks/useDiagnostic';
import { diagnosticSteps } from '../../config/diagnosticQuestions';
import { ProgressBar } from './form/ProgressBar';
import { QuestionRenderer } from './form/FormInputs';
import { LeadCapture } from './form/LeadCapture';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function DiagnosticWizard() {
  const { 
    session, 
    answerQuestion, 
    nextStep, 
    prevStep, 
    submitDiagnostic, 
    generatePreviewScore,
    submitting
  } = useDiagnostic();
  
  const router = useRouter();

  const isLeadStep = session && session.currentStep === diagnosticSteps.length;

  const currentStepData = useMemo(() => {
    if (!session || isLeadStep) return null;
    return diagnosticSteps[session.currentStep];
  }, [session, isLeadStep]);

  // Validação simples: exigir resposta para perguntas obrigatórias (todas menos "observacoes")
  const canGoNext = useMemo(() => {
    if (!session || !currentStepData) return false;
    
    // Check se todas as perguntas do step atual têm resposta
    return currentStepData.questions.every(q => {
      if (q.id === 'observacoes') return true; // Opcional
      if (q.type === 'scale' && q.allowDontKnow && session.answers[q.id] === 'nao_sei') return true;
      if (q.type === 'scale' && q.allowNotApplicable && session.answers[q.id] === 'N/A') return true;
      return session.answers[q.id] !== undefined && session.answers[q.id] !== null && session.answers[q.id] !== '';
    });
  }, [session, currentStepData]);

  const handleNext = () => {
    if (canGoNext) nextStep();
  };

  const handleLeadSubmit = async (lead: any) => {
    const resultId = await submitDiagnostic(lead);
    if (resultId) {
      router.push(`/diagnostico/resultado/${resultId}`);
    }
  };

  if (!session) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {!isLeadStep && (
          <div className="mb-8">
            <ProgressBar currentStep={session.currentStep} totalSteps={diagnosticSteps.length} />
          </div>
        )}

        <AnimatePresence mode="wait">
          {isLeadStep ? (
            <motion.div
              key="lead-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <LeadCapture 
                overallScore={generatePreviewScore()?.overallScore || 0} 
                onSubmit={handleLeadSubmit} 
                submitting={submitting} 
              />
            </motion.div>
          ) : currentStepData ? (
            <motion.div
              key={`step-${session.currentStep}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">{currentStepData.title}</h2>
                {currentStepData.description && (
                  <p className="text-slate-600 text-lg">{currentStepData.description}</p>
                )}
              </div>

              <div className="space-y-6">
                {currentStepData.questions.map((q) => (
                  <QuestionRenderer
                    key={q.id}
                    question={q}
                    value={session.answers[q.id]}
                    onChange={(val) => answerQuestion(q.id, val)}
                  />
                ))}
              </div>

              <div className="mt-10 flex items-center justify-between border-t border-slate-200 pt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={session.currentStep === 0}
                  className="inline-flex items-center px-5 py-3 border border-slate-300 shadow-sm text-sm font-medium rounded-xl text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50 transition-colors"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" /> Voltar
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canGoNext}
                  className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {session.currentStep === diagnosticSteps.length - 1 ? 'Finalizar e Ver Resultado' : 'Próxima Etapa'}
                  {session.currentStep === diagnosticSteps.length - 1 ? <Check className="ml-2 w-5 h-5" /> : <ArrowRight className="ml-2 w-5 h-5" />}
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
