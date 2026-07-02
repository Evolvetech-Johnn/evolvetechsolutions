# Plano Geral - EvolveTech CRM

## 1. Módulos do CRM e Telas/Rotas

O CRM será composto pelos seguintes módulos principais, mapeados para suas respectivas rotas:

- **Autenticação**
  - `/login` - Tela de login (e-mail e senha).
  - `/esqueci-senha` - Fluxo de recuperação de senha.
- **Dashboard Principal**
  - `/dashboard` (Rota principal) - Visão geral (KPIs, funil, atividades recentes).
- **Leads (Funil de Vendas)**
  - `/leads` - Quadro Kanban interativo com estágios de negociação.
- **Contatos e Clientes**
  - `/contatos` - Tabela de clientes/contatos com busca e filtros.
  - `/contatos/:id` - Detalhes do contato (histórico, dados, anotações).
- **Tarefas e Agenda**
  - `/tarefas` - Lista de pendências e visualização em calendário.
- **Relatórios (BI)**
  - `/relatorios` - Gráficos de desempenho e taxas de conversão.
- **Configurações**
  - `/configuracoes` - Perfil de usuário, preferências de tema e campos do sistema.
- **Styleguide (Desenvolvimento)**
  - `/styleguide` - Catálogo de componentes UI para referência visual.

---

## 2. Estrutura de Pastas Final

A estrutura seguirá um padrão modular, separando lógica, interface e dados:

```text
evolvetech-crm/
├── docs/
│   ├── plano-geral.md
│   └── backend-plan.md
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── routes/
│   │   └── AppRoutes.tsx
│   ├── pages/ (Componentes de Página)
│   ├── components/
│   │   ├── layout/ (Sidebar, Topbar, AppLayout)
│   │   ├── ui/ (Button, Input, Card, Modal, etc.)
│   │   └── [modulo]/ (dashboard, leads, contatos, tarefas, relatorios)
│   ├── context/ (AuthContext, ToastContext)
│   ├── hooks/ (Regras de negócio e chamadas de service: useLeads, useAuth)
│   ├── services/ (Mock de chamadas async, simulando API)
│   ├── types/ (Tipagem global de domínio)
│   ├── data/ (mockData.ts com os dados fictícios)
│   ├── utils/ (formatters.ts, validators.ts)
│   └── styles/
│       └── globals.css
```

---

## 3. Identidade Visual (Design Tokens)

O layout terá uma pegada tecnológica (SaaS moderno), usando um **Tema Escuro** predominante, com bordas suaves (glassmorphism leve) e acentos em cores vibrantes.

**Paleta de Cores (`tailwind.config.ts`):**
- **Background Base:** Escuro profundo (`#0f172a` - slate-900)
- **Superfícies/Cards:** Um pouco mais claro (`#1e293b` - slate-800)
- **Bordas/Divisores:** Sutis (`#334155` - slate-700)
- **Primary:** Roxo neon (`#8b5cf6` - violet-500) - usado em botões principais e destaques.
- **Secondary:** Azul vibrante (`#3b82f6` - blue-500) - usado em links e ações secundárias.
- **Accent:** Ciano tecnológico (`#06b6d4` - cyan-500) - usado em detalhes de gráficos e ícones.
- **Textos:** Títulos em branco neve (`#f8fafc`), corpo em cinza claro (`#94a3b8`).
- **Feedback:** Verde (Sucesso - `#10b981`), Vermelho (Erro - `#ef4444`), Amarelo (Alerta - `#f59e0b`).

**Tipografia:**
- Fonte Principal: **Inter** (moderna, limpa, excelente legibilidade em telas escuras).

---

## 4. Modelagem Inicial dos Tipos (TypeScript)

Definição simplificada das entidades de domínio (`src/types/`):

```typescript
// usuario.ts
export type UserRole = 'admin' | 'seller';
export interface Usuario {
  id: string;
  nome: string;
  email: string;
  avatarUrl?: string;
  role: UserRole;
}

// lead.ts
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

// contato.ts
export interface Contato {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  cargo: string;
  leadId?: string; // Relacionamento opcional com um Lead no funil
}

// tarefa.ts
export type TarefaStatus = 'Pendente' | 'Concluída';
export type TarefaPrioridade = 'Baixa' | 'Média' | 'Alta';
export interface Tarefa {
  id: string;
  titulo: string;
  descricao?: string;
  dataVencimento: string;
  status: TarefaStatus;
  prioridade: TarefaPrioridade;
  responsavelId: string;
  relacionadoA?: {
    tipo: 'lead' | 'contato';
    id: string;
  };
}
```

---

## 5. Lista de Dados Fictícios (Mock Data)

Para que a demo tenha "cara de viva", o `mockData.ts` inicializará o `localStorage` com:
- **3 Usuários:** 1 Admin (usuário logado por padrão) e 2 Vendedores.
- **15 Leads:** Distribuídos pelas etapas do funil para popular o Kanban.
- **20 Contatos:** Clientes e prospects (alguns associados a leads).
- **30 Tarefas:** Misturadas entre atrasadas (vermelhas), de hoje (amarelas) e futuras.
- **Dados de Gráficos:** Histórico de conversões dos últimos 6 meses gerado matematicamente.

---

## 6. Fluxo de Navegação

1. Usuário acessa `/`.
2. Se não houver token/sessão no localStorage, é direcionado para `/login`.
3. Ao logar (validando credenciais contra o `mockData`), ganha sessão e é redirecionado para `/dashboard`.
4. O `AppLayout` engloba todas as páginas internas (Sidebar lateral fixo e Topbar com busca e perfil).
5. O usuário navega clicando na Sidebar. Alterar o status de um lead na página de Leads refletirá imediatamente no dashboard e nos relatórios (os hooks de serviço vão alterar o estado global via re-fetch dos dados mockados no localStorage).
