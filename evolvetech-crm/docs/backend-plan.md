# Plano de Arquitetura de Backend - EvolveCRM

Este documento detalha o planejamento técnico para uma futura implementação de um backend real para o EvolveCRM. Atualmente, a aplicação funciona utilizando dados simulados (`mock`) e persistência via `localStorage` para fins de demonstração (Demo Interativa).

## Stack Tecnológica Recomendada

Para a construção do backend, a EvolveTech Solutions recomenda a seguinte stack, visando alta performance, segurança e escalabilidade:

- **Linguagem / Framework**: Node.js com NestJS (TypeScript) ou Express.js.
- **Banco de Dados (Relacional)**: PostgreSQL (ideal para relacionamentos complexos como Usuários -> Leads -> Contatos -> Tarefas).
- **ORM**: Prisma ORM ou TypeORM.
- **Autenticação**: JWT (JSON Web Tokens) com Refresh Tokens.
- **Hospedagem / Deploy**: AWS (ECS/EC2 + RDS) ou Vercel/Railway.

---

## 1. Modelos de Dados (Schema)

Abaixo está o modelo entidade-relacionamento (MER) simplificado (estilo Prisma schema) que daria suporte aos dados trafegados no CRM.

### Usuário (User)
```prisma
model User {
  id        String   @id @default(uuid())
  nome      String
  email     String   @unique
  senhaHash String
  role      Role     @default(SELLER)
  avatarUrl String?
  
  // Relacionamentos
  leads     Lead[]
  tarefas   Tarefa[]
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  ADMIN
  SELLER
}
```

### Lead
```prisma
model Lead {
  id            String     @id @default(uuid())
  nome          String
  empresa       String
  valorEstimado Decimal
  status        LeadStatus @default(NOVO)
  origem        String
  
  // Relacionamentos
  responsavel   User       @relation(fields: [responsavelId], references: [id])
  responsavelId String
  contatos      Contato[]
  tarefas       Tarefa[]
  
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
}

enum LeadStatus {
  NOVO
  QUALIFICADO
  PROPOSTA
  NEGOCIACAO
  GANHO
  PERDIDO
}
```

### Contato (Contact)
```prisma
model Contato {
  id        String   @id @default(uuid())
  nome      String
  email     String
  telefone  String
  empresa   String
  cargo     String
  
  // Relacionamentos
  lead      Lead?    @relation(fields: [leadId], references: [id])
  leadId    String?
  tarefas   Tarefa[]
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Tarefa (Task)
```prisma
model Tarefa {
  id             String           @id @default(uuid())
  titulo         String
  descricao      String?
  dataVencimento DateTime
  status         TarefaStatus     @default(PENDENTE)
  prioridade     TarefaPrioridade @default(MEDIA)
  
  // Relacionamentos Polimórficos Simulados
  responsavel    User             @relation(fields: [responsavelId], references: [id])
  responsavelId  String
  lead           Lead?            @relation(fields: [leadId], references: [id])
  leadId         String?
  contato        Contato?         @relation(fields: [contatoId], references: [id])
  contatoId      String?
  
  createdAt      DateTime         @default(now())
  updatedAt      DateTime         @updatedAt
}

enum TarefaStatus {
  PENDENTE
  CONCLUIDA
}

enum TarefaPrioridade {
  BAIXA
  MEDIA
  ALTA
}
```

---

## 2. Endpoints REST (API)

A API seguirá o padrão RESTful. Todos os endpoints abaixo (exceto login) requerem um token JWT válido enviado no header `Authorization: Bearer <token>`.

### Autenticação
- `POST /api/auth/login`: Autentica o usuário e retorna o Token JWT.
- `GET /api/auth/me`: Retorna os dados do usuário autenticado atual.

### Leads
- `GET /api/leads`: Lista os leads (suporta paginação, busca e filtros via query params).
- `POST /api/leads`: Cria um novo lead.
- `GET /api/leads/:id`: Retorna os detalhes de um lead específico.
- `PATCH /api/leads/:id`: Atualiza dados parciais de um lead (ex: mover de estágio no Kanban).
- `DELETE /api/leads/:id`: Exclui um lead (apenas Admin).

### Contatos
- `GET /api/contatos`: Lista os contatos (suporta paginação e busca).
- `POST /api/contatos`: Cria um contato.
- `GET /api/contatos/:id`: Retorna os detalhes de um contato (incluindo histórico).
- `PATCH /api/contatos/:id`: Atualiza um contato.
- `DELETE /api/contatos/:id`: Remove um contato.

### Tarefas
- `GET /api/tarefas`: Lista tarefas do usuário atual.
- `POST /api/tarefas`: Cria nova tarefa associada a um Lead/Contato.
- `PATCH /api/tarefas/:id`: Atualiza status/dados de uma tarefa.
- `DELETE /api/tarefas/:id`: Remove a tarefa.

### Relatórios / Dashboard
- `GET /api/dashboard/kpis`: Retorna receita, quantidade de leads, conversão, etc.
- `GET /api/dashboard/funil`: Retorna o count de leads agrupado por status.
- `GET /api/dashboard/evolucao-mensal`: Retorna a receita agregada mês a mês.
- `GET /api/reports/export?type=pdf`: Gera arquivo do relatório.

---

*Fim da Especificação de Backend.*
