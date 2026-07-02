import { Usuario } from '../types/usuario';
import { Lead } from '../types/lead';
import { Contato } from '../types/contato';
import { Tarefa } from '../types/tarefa';

export const mockUsers: Usuario[] = [
  {
    id: 'u-1',
    nome: 'Admin User',
    email: 'admin@evolvetech.com.br',
    role: 'admin',
    avatarUrl: 'https://i.pravatar.cc/150?u=u-1',
  },
  {
    id: 'u-2',
    nome: 'Carlos Vendedor',
    email: 'carlos@evolvetech.com.br',
    role: 'seller',
    avatarUrl: 'https://i.pravatar.cc/150?u=u-2',
  },
  {
    id: 'u-3',
    nome: 'Marina Vendas',
    email: 'marina@evolvetech.com.br',
    role: 'seller',
    avatarUrl: 'https://i.pravatar.cc/150?u=u-3',
  },
];

export const mockLeads: Lead[] = [
  { id: 'l-1', nome: 'Contato Comercial', empresa: 'TechCorp', valorEstimado: 15000, status: 'Novo', origem: 'Site', responsavelId: 'u-1', dataCriacao: '2023-10-01' },
  { id: 'l-2', nome: 'Orçamento Sistema', empresa: 'SoftSys', valorEstimado: 8500, status: 'Qualificado', origem: 'Indicação', responsavelId: 'u-2', dataCriacao: '2023-10-02' },
  { id: 'l-3', nome: 'Renovação Contrato', empresa: 'MegaStore', valorEstimado: 32000, status: 'Proposta', origem: 'Linkedin', responsavelId: 'u-1', dataCriacao: '2023-10-03' },
  { id: 'l-4', nome: 'Integração API', empresa: 'FinanceApp', valorEstimado: 12000, status: 'Negociação', origem: 'Google', responsavelId: 'u-3', dataCriacao: '2023-10-04' },
  { id: 'l-5', nome: 'App Mobile', empresa: 'DeliveryTop', valorEstimado: 45000, status: 'Ganho', origem: 'Site', responsavelId: 'u-1', dataCriacao: '2023-10-05' },
  { id: 'l-6', nome: 'Suporte Técnico', empresa: 'AutoParts', valorEstimado: 2500, status: 'Perdido', origem: 'Telefone', responsavelId: 'u-2', dataCriacao: '2023-10-06' },
  { id: 'l-7', nome: 'Novo ERP', empresa: 'SuperMarket', valorEstimado: 85000, status: 'Novo', origem: 'Evento', responsavelId: 'u-3', dataCriacao: '2023-10-07' },
  { id: 'l-8', nome: 'Consultoria Cloud', empresa: 'TechStart', valorEstimado: 18000, status: 'Qualificado', origem: 'Linkedin', responsavelId: 'u-1', dataCriacao: '2023-10-08' },
  { id: 'l-9', nome: 'Migração Servidor', empresa: 'OldTech', valorEstimado: 9000, status: 'Proposta', origem: 'Google', responsavelId: 'u-2', dataCriacao: '2023-10-09' },
  { id: 'l-10', nome: 'Sistema PDV', empresa: 'Padaria Central', valorEstimado: 5500, status: 'Novo', origem: 'Indicação', responsavelId: 'u-1', dataCriacao: '2023-10-10' },
];

export const mockContatos: Contato[] = [
  { id: 'c-1', nome: 'João Silva', email: 'joao.silva@techcorp.com', telefone: '(11) 98765-4321', empresa: 'TechCorp', cargo: 'CTO', leadId: 'l-1' },
  { id: 'c-2', nome: 'Maria Souza', email: 'maria@softsys.com', telefone: '(11) 91234-5678', empresa: 'SoftSys', cargo: 'Diretora de TI', leadId: 'l-2' },
  { id: 'c-3', nome: 'Pedro Álvares', email: 'pedro@megastore.com.br', telefone: '(21) 99999-1111', empresa: 'MegaStore', cargo: 'Gerente Comercial', leadId: 'l-3' },
  { id: 'c-4', nome: 'Ana Clara', email: 'ana@financeapp.io', telefone: '(31) 98888-2222', empresa: 'FinanceApp', cargo: 'CEO', leadId: 'l-4' },
  { id: 'c-5', nome: 'Roberto Alves', email: 'roberto.a@semempresa.com', telefone: '(41) 97777-3333', empresa: 'Consultor Independente', cargo: 'Consultor' },
];

const hoje = new Date().toISOString().split('T')[0];

export const mockTarefas: Tarefa[] = [
  { id: 't-1', titulo: 'Ligar para João da TechCorp', descricao: 'Apresentar nova proposta de valores', dataVencimento: hoje, status: 'Pendente', prioridade: 'Alta', responsavelId: 'u-1', relacionadoA: { tipo: 'lead', id: 'l-1' } },
  { id: 't-2', titulo: 'Enviar e-mail para Maria', descricao: 'Enviar material de marketing', dataVencimento: hoje, status: 'Concluída', prioridade: 'Média', responsavelId: 'u-1', relacionadoA: { tipo: 'contato', id: 'c-2' } },
  { id: 't-3', titulo: 'Reunião com FinanceApp', descricao: 'Demonstração do sistema ERP', dataVencimento: '2023-12-01', status: 'Pendente', prioridade: 'Alta', responsavelId: 'u-3', relacionadoA: { tipo: 'lead', id: 'l-4' } },
  { id: 't-4', titulo: 'Elaborar proposta SuperMarket', descricao: '', dataVencimento: '2023-12-05', status: 'Pendente', prioridade: 'Média', responsavelId: 'u-3' },
];

// As senhas mockadas (apenas para a demo). Todas são 'senha123'
export const MOCK_PASSWORD = '123';
