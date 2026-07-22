"use client";

import React, { useState } from 'react';
import { DiagnosticLanding } from '../../components/diagnostic/DiagnosticLanding';
import { DiagnosticWizard } from '../../components/diagnostic/DiagnosticWizard';
import { useDiagnostic } from '../../hooks/useDiagnostic';

export default function DiagnosticPage() {
  const { session, loading, startNewSession } = useDiagnostic();
  const [started, setStarted] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ink-950">
        <div className="w-8 h-8 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleStart = () => {
    setStarted(true);
    if (!session) {
      startNewSession();
    }
  };

  // Se já tiver uma sessão em andamento no localStorage, ou o usuário clicou em iniciar
  if (session || started) {
    return <DiagnosticWizard />;
  }

  return <DiagnosticLanding onStart={handleStart} />;
}
