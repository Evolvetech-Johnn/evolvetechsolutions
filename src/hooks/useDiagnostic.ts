import { useState, useEffect, useCallback } from "react";
import { diagnosticSteps } from "../config/diagnosticQuestions";
import { DiagnosticSession, DiagnosticResult, DiagnosticDimension } from "../types/diagnostic";
import { diagnosticApi } from "../services/diagnosticApi";
import { calculateDimensionScore, calculateOverallScore, calculateLossEstimate, calculateMaturityLevel } from "../utils/diagnosticScoring";
import { generateRecommendations, getCriticalAlerts } from "../utils/diagnosticRecommendations";

const STORAGE_KEY = "@evolvetech:diagnostic_session";

export function useDiagnostic() {
  const [session, setSession] = useState<DiagnosticSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Initialize session from localStorage or start new
  useEffect(() => {
    const init = async () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setSession(parsed);
        } catch (e) {
          console.error("Failed to parse stored session", e);
          startNewSession();
        }
      } else {
        // We do not start automatically unless explicitly asked
        setSession(null);
      }
      setLoading(false);
    };
    init();
  }, []);

  const startNewSession = useCallback(async () => {
    setLoading(true);
    try {
      const { id } = await diagnosticApi.startSession();
      const newSession: DiagnosticSession = {
        id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        currentStep: 0,
        companyProfile: {},
        answers: {},
      };
      setSession(newSession);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSession));
      diagnosticApi.trackEvent("diagnostic_started", { sessionId: id });
    } catch (e) {
      console.error("Error starting session", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveSession = useCallback((updatedSession: DiagnosticSession) => {
    setSession(updatedSession);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSession));
    // Optional: send to backend periodically
    // diagnosticApi.updateSession(updatedSession.id, updatedSession);
  }, []);

  const answerQuestion = useCallback((questionId: string, value: number | string | null) => {
    if (!session) return;
    const updated = {
      ...session,
      answers: { ...session.answers, [questionId]: value },
      updatedAt: new Date().toISOString(),
    };
    saveSession(updated);
  }, [session, saveSession]);

  const nextStep = useCallback(() => {
    if (!session) return;
    if (session.currentStep < diagnosticSteps.length) { // Allowing one extra step for Lead capture
      const updated = {
        ...session,
        currentStep: session.currentStep + 1,
        updatedAt: new Date().toISOString(),
      };
      saveSession(updated);
      diagnosticApi.trackEvent("diagnostic_step_completed", { step: session.currentStep });
    }
  }, [session, saveSession]);

  const prevStep = useCallback(() => {
    if (!session) return;
    if (session.currentStep > 0) {
      const updated = {
        ...session,
        currentStep: session.currentStep - 1,
        updatedAt: new Date().toISOString(),
      };
      saveSession(updated);
    }
  }, [session, saveSession]);

  const generateResult = useCallback((): DiagnosticResult | null => {
    if (!session) return null;

    // Calc dimension scores
    const dimensions: DiagnosticDimension[] = ["presenca", "processos", "dados", "sistemas", "comercial", "seguranca"];
    const dimensionScores = {} as Record<DiagnosticDimension, any>;
    
    dimensions.forEach(dim => {
      dimensionScores[dim] = calculateDimensionScore(dim, session.answers);
    });

    const overallScore = calculateOverallScore(dimensionScores);
    const maturityLevel = calculateMaturityLevel(overallScore);
    const lossEstimate = calculateLossEstimate(session.answers, dimensionScores);
    const recommendations = generateRecommendations(session.answers, dimensionScores);
    const criticalAlerts = getCriticalAlerts(session.answers);

    const result: DiagnosticResult = {
      id: session.id,
      createdAt: new Date().toISOString(),
      companyProfile: session.companyProfile as any,
      answers: session.answers,
      lead: session.lead as any,
      scores: dimensionScores,
      overallScore,
      maturityLevel,
      lossEstimate,
      recommendations,
      criticalAlerts,
    };

    return result;
  }, [session]);

  const submitDiagnostic = useCallback(async (leadData: Partial<any>) => {
    if (!session) return null;
    setSubmitting(true);
    
    try {
      const updatedSession = {
        ...session,
        lead: leadData,
        updatedAt: new Date().toISOString(),
      };
      saveSession(updatedSession);

      await diagnosticApi.submitSession(session.id, updatedSession);
      
      const result = generateResult();
      if (result) {
        // Store result temporarily to retrieve on result page
        localStorage.setItem(`@evolvetech:result_${result.id}`, JSON.stringify(result));
        localStorage.removeItem(STORAGE_KEY); // Clear current session
        diagnosticApi.trackEvent("diagnostic_completed", { sessionId: result.id, overallScore: result.overallScore });
        return result.id;
      }
    } catch (e) {
      console.error("Error submitting diagnostic", e);
    } finally {
      setSubmitting(false);
    }
    return null;
  }, [session, saveSession, generateResult]);

  return {
    session,
    loading,
    submitting,
    startNewSession,
    answerQuestion,
    nextStep,
    prevStep,
    submitDiagnostic,
    generatePreviewScore: generateResult, // To show a preview before lead form
  };
}
