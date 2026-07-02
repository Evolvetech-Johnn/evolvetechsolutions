export type TarefaStatus = 'Pendente' | 'Concluída';
export type TarefaPrioridade = 'Baixa' | 'Média' | 'Alta';

export interface Tarefa {
  id: string;
  titulo: string;
  descricao?: string;
  dataVencimento: string; // formato YYYY-MM-DD
  status: TarefaStatus;
  prioridade: TarefaPrioridade;
  responsavelId: string;
  relacionadoA?: {
    tipo: 'lead' | 'contato';
    id: string;
  };
}
