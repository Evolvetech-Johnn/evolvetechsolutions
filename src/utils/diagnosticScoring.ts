import {
  DiagnosticDimension,
  DimensionScore,
  LossAssumptions,
  LossEstimate,
  MaturityLevel,
} from "../types/diagnostic";
import { dimensionsConfig, diagnosticSteps } from "../config/diagnosticQuestions";

export function calculateMaturityLevel(score: number): MaturityLevel {
  if (score <= 20) return "Nivel1";
  if (score <= 40) return "Nivel2";
  if (score <= 60) return "Nivel3";
  if (score <= 80) return "Nivel4";
  return "Nivel5";
}

export function calculateDimensionScore(
  dimensionId: DiagnosticDimension,
  answers: Record<string, number | string | null>
): DimensionScore {
  let score = 0;
  let maxScore = 0;

  // Encontrar todas as perguntas dessa dimensão
  diagnosticSteps.forEach((step) => {
    step.questions.forEach((q) => {
      if (q.dimension === dimensionId && q.type === "scale") {
        const answer = answers[q.id];
        
        // Se a resposta for nula ou não aplicável (N/A) -> ignorar no maxScore
        if (answer === null || answer === undefined || answer === "N/A") {
          return;
        }

        maxScore += 4; // Cada pergunta vale até 4

        // Se respondeu "Não sei"
        if (answer === "nao_sei") {
          score += 1;
        } else if (typeof answer === "number") {
          score += answer;
        } else {
          score += Number(answer) || 0;
        }
      }
    });
  });

  const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;

  return {
    dimension: dimensionId,
    score,
    maxScore,
    percentage,
  };
}

export function calculateOverallScore(dimensionScores: Record<DiagnosticDimension, DimensionScore>): number {
  let totalScore = 0;

  Object.values(dimensionsConfig).forEach((config) => {
    const dimScore = dimensionScores[config.id as DiagnosticDimension];
    if (dimScore) {
      // O peso é 20% = 0.2
      totalScore += dimScore.percentage * (config.weight / 100);
    }
  });

  return Math.round(totalScore);
}

export function calculateLossEstimate(
  answers: Record<string, number | string | null>,
  dimensionScores: Record<DiagnosticDimension, DimensionScore>
): LossEstimate {
  // Extrair valores das respostas (com fallback para 0 se não preenchido)
  const getNum = (id: string) => Number(answers[id]) || 0;

  const assumptions: LossAssumptions = {
    custoHoraMedio: getNum("custoMedioColaborador") / 176 || 20, // Falta de resposta: R$20/h
    fatorIneficiencia: getInefficiencyFactor(dimensionScores.processos?.percentage || 0),
    percentualRetrabalho: getNum("percentualRetrabalho") / 100,
    leadsMensais: getNum("leadsMensais"),
    percentualSemRetorno: getNum("leadsSemRetorno") / 100,
    taxaConversaoLead: getNum("taxaConversao") / 100 || 0.1, // Falta de resposta: 10%
    ticketMedio: getNum("ticketMedio"),
    propostasMensais: getNum("propostasMensais"),
    percentualSemFollowUp: getNum("propostasSemFollowUp") / 100,
    taxaConversaoProposta: 0.3, // Hipótese conservadora (30%) caso não seja do lead geral
    horasRelatorios: getNum("horasRelatorios"),
    custoHoraRelatorios: (getNum("custoMedioColaborador") || 3500) / 176,
  };

  // 1. Perdas por horas manuais
  const pessoasEnvolvidas = getNum("pessoasTarefasRepetitivas");
  const horasSemanais = getNum("horasSemanaTarefas");
  const horasManuaisMensais = pessoasEnvolvidas * horasSemanais * 4.33;
  const perdaManualMensal = horasManuaisMensais * assumptions.custoHoraMedio;
  const perdaManualAjustada = perdaManualMensal * assumptions.fatorIneficiencia;

  // 2. Perda por retrabalho
  const custoTotalEquipe = pessoasEnvolvidas * (getNum("custoMedioColaborador") || 3500);
  const perdaRetrabalho = custoTotalEquipe * assumptions.percentualRetrabalho;

  // 3. Perda de oportunidades
  const leadsPerdidos = assumptions.leadsMensais * assumptions.percentualSemRetorno;
  const vendasPerdidas = leadsPerdidos * assumptions.taxaConversaoLead;
  const receitaPotencialPerdida = vendasPerdidas * assumptions.ticketMedio;

  // 4. Perda por falta de follow-up
  const propostasSemFollowup = assumptions.propostasMensais * assumptions.percentualSemFollowUp;
  const receitaFollowUpPerdida = propostasSemFollowup * assumptions.taxaConversaoProposta * assumptions.ticketMedio;

  // 5. Custo de relatórios manuais
  const custoRelatoriosMensais = assumptions.horasRelatorios * assumptions.custoHoraRelatorios;

  // Total
  const impactoMensal = perdaManualAjustada + perdaRetrabalho + receitaPotencialPerdida + receitaFollowUpPerdida + custoRelatoriosMensais;
  const impactoAnual = impactoMensal * 12;

  return {
    horasManuaisMensais,
    perdaManualMensal,
    perdaManualAjustada,
    perdaRetrabalho,
    receitaPotencialPerdida,
    receitaFollowUpPerdida,
    custoRelatoriosMensais,
    impactoMensal,
    impactoAnual,
    assumptions,
  };
}

function getInefficiencyFactor(processosScore: number): number {
  if (processosScore <= 20) return 0.8; // 80%
  if (processosScore <= 40) return 0.6; // 60%
  if (processosScore <= 60) return 0.4; // 40%
  if (processosScore <= 80) return 0.2; // 20%
  return 0.1; // 10%
}
