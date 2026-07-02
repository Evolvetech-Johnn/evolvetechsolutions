export type LeadStatus = 'Novo' | 'Qualificado' | 'Proposta' | 'Negociação' | 'Ganho' | 'Perdido';

export interface Lead {
  id: string;
  nome: string;
  empresa: string;
  valorEstimado: number;
  status: LeadStatus;
  origem: string;
  responsavelId: string;
  dataCriacao: string;
}
