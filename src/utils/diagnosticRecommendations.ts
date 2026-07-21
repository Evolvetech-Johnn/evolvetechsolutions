import { DiagnosticDimension, DimensionScore, Recommendation } from "../types/diagnostic";

export function generateRecommendations(
  answers: Record<string, number | string | null>,
  scores: Record<DiagnosticDimension, DimensionScore>
): Recommendation[] {
  const recs: Recommendation[] = [];

  const getNum = (id: string) => Number(answers[id]) || 0;

  // 1. Sistemas sob medida
  const dependPlanilhas = getNum("pr8") <= 2;
  if ((scores.sistemas && scores.sistemas.percentage < 60) || dependPlanilhas) {
    recs.push({
      id: "rec-sistemas",
      problema: "Operação dependente de ferramentas desconectadas ou planilhas isoladas.",
      consequencia: "Retrabalho, dificuldade de escalar e processos lentos.",
      solucaoRecomendada: "Desenvolvimento de sistema sob medida ou portal integrado.",
      beneficioEsperado: "Centralização de informações, eliminação de retrabalho e ganho de escala.",
      prioridade: "Alta",
      servicoAssociado: "Sistemas Web Sob Medida",
      impacto: "Alto",
      esforco: "Alto",
      horizonte: "3 a 6 meses",
    });
  }

  // 2. Dashboards e BI
  const faltaDados = getNum("d1") <= 2 || getNum("d4") <= 2;
  if ((scores.dados && scores.dados.percentage < 65) || faltaDados) {
    recs.push({
      id: "rec-dashboards",
      problema: "Liderança sem visibilidade em tempo real e relatórios manuais demorados.",
      consequencia: "Decisões baseadas em intuição, lentidão e risco financeiro não mapeado.",
      solucaoRecomendada: "Implementação de Dashboards automatizados de Business Intelligence.",
      beneficioEsperado: "Gestão orientada a dados, visão 360 e identificação rápida de desvios.",
      prioridade: "Alta",
      servicoAssociado: "Dashboards e Integração de Dados",
      impacto: "Alto",
      esforco: "Médio",
      horizonte: "30 a 90 dias",
    });
  }

  // 3. Automação de Processos
  if (scores.processos && scores.processos.percentage < 65) {
    recs.push({
      id: "rec-automacao",
      problema: "Muitas horas dedicadas a tarefas repetitivas, administrativas e de digitação.",
      consequencia: "Alto custo operacional invisível e equipe subaproveitada.",
      solucaoRecomendada: "Automação de rotinas repetitivas e integrações via API (ex: Make/Zapier).",
      beneficioEsperado: "Redução de custos operacionais e aumento imediato de produtividade.",
      prioridade: "Média",
      servicoAssociado: "Automações de Processos",
      impacto: "Alto",
      esforco: "Médio",
      horizonte: "Ação imediata",
    });
  }

  // 4. Integração de Sistemas
  const ferramentasDiferentes = getNum("ferramentasDiferentes");
  const semIntegracao = getNum("ferramentasSemIntegracao");
  if (ferramentasDiferentes >= 3 && semIntegracao >= 2) {
    recs.push({
      id: "rec-integracao",
      problema: "Múltiplas ferramentas utilizadas no dia a dia que não conversam entre si.",
      consequencia: "Inconsistência de dados e perda de informações ao longo do fluxo.",
      solucaoRecomendada: "Projeto de Integração de Sistemas e APIs.",
      beneficioEsperado: "Fluxo de informações contínuo e confiável, sem interferência humana.",
      prioridade: "Média",
      servicoAssociado: "Integrações",
      impacto: "Médio",
      esforco: "Médio",
      horizonte: "30 a 90 dias",
    });
  }

  // 5. Posicionamento e Site
  if (scores.presenca && scores.presenca.percentage < 65) {
    recs.push({
      id: "rec-posicionamento",
      problema: "Presença digital fraca ou site desatualizado que não atrai clientes.",
      consequencia: "Perda de oportunidades comerciais e percepção de baixo valor da marca.",
      solucaoRecomendada: "Criação de um novo Site Institucional ou Landing Pages otimizadas.",
      beneficioEsperado: "Maior autoridade no digital e aumento na geração de leads qualificados.",
      prioridade: "Média",
      servicoAssociado: "Sites Institucionais de Alta Performance",
      impacto: "Médio",
      esforco: "Baixo",
      horizonte: "30 a 90 dias",
    });
  }

  // 6. Risco de Segurança (Alerta Crítico)
  if (scores.seguranca && scores.seguranca.percentage < 50) {
    recs.push({
      id: "rec-seguranca",
      problema: "Falhas básicas em segurança de dados e governança de acessos.",
      consequencia: "Risco grave de vazamento de dados (LGPD) e paralisação da operação.",
      solucaoRecomendada: "Revisão emergencial de acessos, rotinas de backup e adequação à LGPD.",
      beneficioEsperado: "Mitigação de riscos operacionais e proteção de dados sensíveis.",
      prioridade: "Crítica",
      servicoAssociado: "Consultoria em Tecnologia",
      impacto: "Alto",
      esforco: "Baixo",
      horizonte: "Ação imediata",
    });
  }

  // Ordenar por prioridade: Crítica > Alta > Média > Baixa
  const prioridadeWeight: Record<string, number> = {
    Crítica: 4,
    Alta: 3,
    Média: 2,
    Baixa: 1,
  };

  recs.sort((a, b) => prioridadeWeight[b.prioridade] - prioridadeWeight[a.prioridade]);

  // Retornar no máximo as 5 principais recomendações
  return recs.slice(0, 5);
}

export function getCriticalAlerts(answers: Record<string, number | string | null>): string[] {
  const alerts: string[] = [];
  const getNum = (id: string) => Number(answers[id]) || 0;

  if (getNum("seg4") <= 1) { // Backups testados
    alerts.push("Sem rotina estruturada de backup. Risco extremo de perda de dados.");
  }
  if (getNum("seg5") <= 1) { // Dados sensíveis seguros
    alerts.push("Dados sensíveis estão expostos ou sem proteção adequada.");
  }
  if (getNum("d3") <= 1) { // Dados confiáveis
    alerts.push("Liderança não confia nos próprios dados da empresa.");
  }
  if (getNum("pr1") <= 1) { // Processos documentados
    alerts.push("Operação altamente dependente do conhecimento de pessoas específicas (risco de continuidade).");
  }

  return alerts;
}
