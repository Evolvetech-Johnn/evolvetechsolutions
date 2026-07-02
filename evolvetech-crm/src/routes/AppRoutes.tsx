import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import StyleguidePage from '../pages/StyleguidePage';
import LoginPage from '../pages/LoginPage';
import EsqueciSenhaPage from '../pages/EsqueciSenhaPage';
import DashboardPage from '../pages/DashboardPage';
import LeadsPage from '../pages/LeadsPage';
import ContatosPage from '../pages/ContatosPage';
import ContatoDetalhePage from '../pages/ContatoDetalhePage';
import TarefasPage from '../pages/TarefasPage';
import RelatoriosPage from '../pages/RelatoriosPage';
import ConfiguracoesPage from '../pages/ConfiguracoesPage';
import { ProtectedRoute } from './ProtectedRoute';
import { useAuth } from '../hooks/useAuth';

export default function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route path="/esqueci-senha" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <EsqueciSenhaPage />} />
      
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="leads" element={<LeadsPage />} />
          <Route path="contatos" element={<ContatosPage />} />
          <Route path="contatos/:id" element={<ContatoDetalhePage />} />
          <Route path="tarefas" element={<TarefasPage />} />
          <Route path="relatorios" element={<RelatoriosPage />} />
          <Route path="configuracoes" element={<ConfiguracoesPage />} />
          <Route path="styleguide" element={<StyleguidePage />} />
        </Route>
      </Route>
    </Routes>
  );
}
