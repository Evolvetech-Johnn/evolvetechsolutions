export type DiagnosticDimension =
  | "presenca"
  | "processos"
  | "dados"
  | "sistemas"
  | "comercial"
  | "seguranca";

export interface DimensionConfig {
  id: DiagnosticDimension;
  label: string;
  weight: number;
}

export type MaturityLevel = "Nivel1" | "Nivel2" | "Nivel3" | "Nivel4" | "Nivel5";

export interface CompanyProfile {
  nomeEmpresa?: string;
  segmento?: string;
  cidadeEstado?: string;
  colaboradores?: string;
  faturamentoMensal?: string;
  modeloNegocio?: string;
  objetivoPrincipal?: string;
}

export interface DiagnosticAnswer {
  questionId: string;
  value: number | string | null;
}

export interface DimensionScore {
  dimension: DiagnosticDimension;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface LossAssumptions {
  custoHoraMedio: number;
  fatorIneficiencia: number;
  percentualRetrabalho: number;
  leadsMensais: number;
  percentualSemRetorno: number;
  taxaConversaoLead: number;
  ticketMedio: number;
  propostasMensais: number;
  percentualSemFollowUp: number;
  taxaConversaoProposta: number;
  horasRelatorios: number;
  custoHoraRelatorios: number;
}

export interface LossEstimate {
  horasManuaisMensais: number;
  perdaManualMensal: number;
  perdaManualAjustada: number;
  perdaRetrabalho: number;
  receitaPotencialPerdida: number;
  receitaFollowUpPerdida: number;
  custoRelatoriosMensais: number;
  impactoMensal: number;
  impactoAnual: number;
  assumptions: LossAssumptions;
}

export interface Recommendation {
  id: string;
  problema: string;
  consequencia: string;
  solucaoRecomendada: string;
  beneficioEsperado: string;
  prioridade: "Baixa" | "Média" | "Alta" | "Crítica";
  servicoAssociado: string;
  impacto: "Baixo" | "Médio" | "Alto";
  esforco: "Baixo" | "Médio" | "Alto";
  horizonte: "Ação imediata" | "30 a 90 dias" | "3 a 6 meses" | "6 a 12 meses";
}

export interface Lead {
  nome: string;
  cargo: string;
  email: string;
  telefone: string;
  autorizacaoContato: boolean;
  aceitePrivacidade: boolean;
}

export interface DiagnosticResult {
  id: string;
  createdAt: string;
  companyProfile: CompanyProfile;
  answers: Record<string, number | string | null>;
  lead?: Lead;
  scores: Record<DiagnosticDimension, DimensionScore>;
  overallScore: number;
  maturityLevel: MaturityLevel;
  lossEstimate: LossEstimate;
  recommendations: Recommendation[];
  criticalAlerts: string[];
}

export interface DiagnosticSession {
  id: string;
  createdAt: string;
  updatedAt: string;
  currentStep: number;
  companyProfile: Partial<CompanyProfile>;
  answers: Record<string, number | string | null>;
  lead?: Partial<Lead>;
}

// Question Configurations Types
export type QuestionType = "text" | "select" | "scale" | "number" | "currency" | "percentage" | "textarea";

export interface QuestionOption {
  value: string | number;
  label: string;
}

export interface BaseQuestion {
  id: string;
  title: string;
  description?: string;
  type: QuestionType;
  dimension?: DiagnosticDimension;
}

export interface SelectQuestion extends BaseQuestion {
  type: "select";
  options: QuestionOption[];
}

export interface ScaleQuestion extends BaseQuestion {
  type: "scale";
  min: number;
  max: number;
  minLabel: string;
  maxLabel: string;
  allowDontKnow?: boolean; // Se verdadeiro, permite "Não sei" (vale 1 ponto)
  allowNotApplicable?: boolean; // Se verdadeiro, permite "N/A" (remove do denominador)
}

export interface NumberQuestion extends BaseQuestion {
  type: "number" | "currency" | "percentage";
  placeholder?: string;
}

export interface TextQuestion extends BaseQuestion {
  type: "text" | "textarea";
  placeholder?: string;
}

export type AnyQuestion = SelectQuestion | ScaleQuestion | NumberQuestion | TextQuestion;

export interface DiagnosticStep {
  id: string;
  title: string;
  description?: string;
  questions: AnyQuestion[];
}
