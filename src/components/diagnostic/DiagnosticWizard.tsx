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
    <div className="min-h-screen bg-ink-950 flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-grid opacity-30 mix-blend-screen pointer-events-none" />
      <div className="flex-grow flex items-center justify-center p-4 relative z-10">
        <div className="max-w-3xl w-full bg-white/[0.03] ring-1 ring-white/10 shadow-glowStrong rounded-3xl p-6 md:p-10 backdrop-blur">
          {!isLeadStep && (
            <div className="mb-8">
              <ProgressBar currentStep={session.currentStep} totalSteps={diagnosticSteps.length} />
            </div>
          )}

          <AnimatePresence mode="wait">
            {isLeadStep ? (
              <motion.div
                key="lead-step"
                initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
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
                initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">{currentStepData.title}</h2>
                  {currentStepData.description && (
                    <p className="text-white/60 text-lg">{currentStepData.description}</p>
                  )}
                </div>

                <div className="space-y-8">
                  {currentStepData.questions.map((q) => (
                    <QuestionRenderer
                      key={q.id}
                      question={q}
                      value={session.answers[q.id]}
                      onChange={(val) => answerQuestion(q.id, val)}
                    />
                  ))}
                </div>

                <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={session.currentStep === 0}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-colors ${
                      session.currentStep === 0 
                        ? 'text-white/20 cursor-not-allowed' 
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" /> Voltar
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!canGoNext}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-glow ${
                      !canGoNext 
                        ? 'bg-white/5 text-white/30 cursor-not-allowed shadow-none' 
                        : 'bg-neon-cyan text-ink-950 hover:bg-white hover:shadow-glowStrong hover:-translate-y-0.5'
                    }`}
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
    </div>
  );
}
