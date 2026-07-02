export interface Contato {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  cargo: string;
  leadId?: string; // Opcional: associação com um Lead
}
