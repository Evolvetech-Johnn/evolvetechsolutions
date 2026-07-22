"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { DiagnosticLanding } from '../../components/diagnostic/DiagnosticLanding';
import { DiagnosticWizard } from '../../components/diagnostic/DiagnosticWizard';
import { useDiagnostic } from '../../hooks/useDiagnostic';

export default function DiagnosticPage() {
  const { session, loading, startNewSession } = useDiagnostic();
  const [started, setStarted] = useState(false);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-ink-950">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleStart = () => {
    setStarted(true);
    if (!session) {
      startNewSession();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-ink-950">
      <Navbar />
      <main className="flex-grow flex flex-col">
        {(session || started) ? <DiagnosticWizard /> : <DiagnosticLanding onStart={handleStart} />}
      </main>
      <Footer />
    </div>
  );
}
