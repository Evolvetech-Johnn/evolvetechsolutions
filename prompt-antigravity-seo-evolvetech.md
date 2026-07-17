# Prompt para Antigravity — Implementar plano de SEO e visibilidade para IA

Cole o conteúdo abaixo no Antigravity, dentro do repositório do site **evolvetechsolutions.com.br**.

---

## CONTEXTO

Você vai trabalhar no código-fonte do site institucional da **EvolveTech Solutions**
(www.evolvetechsolutions.com.br), uma software house de Londrina-PR que desenvolve
sistemas sob medida, dashboards, automações e sites institucionais de alto padrão.

Antes de qualquer alteração, **investigue o projeto e confirme**:
1. O stack real (há indícios fortes de que é **Next.js** — confirme pela estrutura de
   pastas, `package.json`, presença de `app/` ou `pages/`, e pelo uso do componente
   de metadata/Head). Se for Next.js, use a **Metadata API** (`generateMetadata` /
   objeto `metadata`) e não tags manuais no `<head>`.
2. Se o roteamento é SSR/SSG (Server/Static) ou CSR puro. Isso é crítico: a página
   `/crm` hoje está sendo renderizada **sem conteúdo visível para crawlers** (título
   presente, mas sem meta description, sem Open Graph e sem corpo de texto extraível).
   Se ela depender de client-side rendering sem pré-renderização, esse é o bug
   raiz a corrigir primeiro.
3. Se existe `sitemap.xml`, `robots.txt` e algum arquivo de configuração de SEO
   (ex: `next-sitemap.config.js`, `next-seo.config.js`). Se não existir, você vai criar.

Não assuma nada sobre design ou copy sem necessidade — o objetivo aqui é **SEO técnico,
dados estruturados e legibilidade por IA**, não redesenhar o site.

---

## OBJETIVO GERAL

Corrigir problemas técnicos de indexação, adicionar dados estruturados (schema.org),
dar conteúdo real à página `/crm`, e preparar o site para ser lido corretamente tanto
por crawlers de busca (Google) quanto por IAs generativas que respondem com base em
busca ao vivo (ChatGPT, Perplexity, Gemini, Claude, Copilot).

Trabalhe em fases, na ordem abaixo. Ao final de cada fase, rode o build
(`npm run build` ou equivalente) para garantir que nada quebrou, e liste o que foi
alterado.

---

## FASE 1 — Correções críticas

1. **Página `/crm` sem conteúdo indexável**
   - Investigue por que a página renderiza sem body extraível para crawlers
     (provável causa: componente client-only sem fallback SSR, ou conteúdo
     carregado via `useEffect`/fetch no client).
   - Adicione conteúdo real e renderizado no servidor: H1 claro, parágrafo
     explicando o que é o EvolveTech CRM, para quem é indicado, principais
     funcionalidades e um CTA (WhatsApp ou formulário).
   - Adicione metadata completa para essa rota: `title`, `description`, Open Graph
     (`og:title`, `og:description`, `og:image`, `og:url`) e Twitter Card, seguindo
     o mesmo padrão já usado na home.
   - Garanta que o title tenha entre 50–60 caracteres e a description entre
     140–160 caracteres, em pt-BR, com foco em intenção de busca comercial.

2. **Title tag da home muito longo**
   - Atual: "EVOLVETECH SOLUTIONS | Sistemas sob medida que aumentam lucro e controle" (~74 caracteres).
   - Reduza para no máximo 60 caracteres, mantendo marca + benefício principal.
     Sugestão de direção (ajuste ao tom da marca, não copie literalmente):
     algo como "EvolveTech Solutions | Sistemas sob medida com foco em lucro".

3. **Sitemap e robots.txt**
   - Se não existir `sitemap.xml`, gere um (via `next-sitemap` se for Next.js,
     ou manualmente) incluindo todas as rotas reais do site: `/`, `/crm`, e
     quaisquer outras páginas existentes ou que forem criadas nas fases seguintes.
   - Verifique/crie `robots.txt` liberando o crawling de todas as páginas públicas
     e apontando para o sitemap (`Sitemap: https://www.evolvetechsolutions.com.br/sitemap.xml`).
   - Não bloqueie nenhuma rota que deva ser indexada.

---

## FASE 2 — Dados estruturados (schema.org / JSON-LD)

Implemente os seguintes blocos de JSON-LD (via `<script type="application/ld+json">`,
injetado pelo mecanismo de metadata do framework):

1. **`LocalBusiness`** (ou `ProfessionalService`) na home, contendo:
   - `name`: EvolveTech Solutions
   - `url`: https://www.evolvetechsolutions.com.br
   - `areaServed`: Londrina, PR e Brasil (ajuste conforme escopo real de atuação)
   - `address` (se houver endereço formal a divulgar; se não, pode omitir o campo
     `streetAddress` e manter só `addressLocality`/`addressRegion`)
   - `telephone`/`contactPoint` com o WhatsApp já usado no site
   - `sameAs`: links de redes sociais/perfis oficiais da empresa, se existirem

2. **`Service`** para cada serviço listado na seção "Serviços" (Desenvolvimento de
   Sistemas, Websites, Automação, Aplicativos e Sistemas Embarcados, Suporte com
   Infraestrutura), cada um com `name`, `description` (pode reaproveitar os bullets
   já existentes no site) e `provider` apontando para a organização.

3. **`FAQPage`** — ver Fase 3 (a marcação depende do conteúdo de FAQ a ser criado).

4. **`Organization`** no layout raiz do site (aplicado a todas as páginas), com
   `name`, `logo`, `url` e `sameAs`.

Depois de implementar, valide os blocos usando o **Rich Results Test do Google**
(https://search.google.com/test/rich-results) — descreva no changelog final se a
validação passou ou quais erros restaram.

---

## FASE 3 — Conteúdo novo (FAQ e páginas de case)

1. **Seção de FAQ na home** (ou página dedicada `/faq`), com 5 a 8 perguntas reais
   de quem está avaliando contratar, por exemplo:
   - Quanto tempo leva para desenvolver um sistema sob medida?
   - Qual a diferença entre um sistema sob medida e um SaaS pronto?
   - Como funciona o suporte depois da entrega?
   - Quais tecnologias vocês usam?
   - Como funciona o orçamento (ticket de R$3k–R$15k+)?
   Escreva as respostas em texto direto e objetivo (2–4 frases cada), sem enrolação —
   esse é o formato que motores de busca com IA mais reaproveitam em respostas.
   Marque a seção com JSON-LD `FAQPage`.

2. **Páginas de case próprias**, uma para cada projeto do portfólio (EletroStart,
   Start Solar, Compras Londrina — e outras que existirem):
   - Rota própria (ex: `/portfolio/eletrostart`)
   - Contexto do cliente/problema, o que foi entregue, e resultado (pode usar os
     números já mencionados no site: redução de retrabalho, tempo de operação etc.,
     desde que sejam representativos do case específico — não generalize números
     de um cliente para outro sem confirmação)
   - Metadata própria (title/description) e o link externo para o site do cliente
     como complemento, não como substituto do conteúdo.
   - Adicione essas rotas ao sitemap.

---

## FASE 4 — Ajustes finos

1. Confirme que todas as imagens relevantes (logo, banner, ícones de serviço) têm
   atributo `alt` descritivo em pt-BR.
2. Confirme hierarquia de headings: um único `<h1>` por página, `<h2>` para seções
   principais, `<h3>` para subitens — corrija qualquer pulo de nível encontrado.
3. Adicione `canonical` explícito em todas as páginas (a home já tem; replique nas
   novas rotas).
4. Se a seção de depoimentos continuar usando textos rotulados como
   "Depoimento representativo", isso é uma decisão de conteúdo/negócio, não técnica —
   **não decida sozinho por remover ou trocar por dados fictícios como se fossem
   reais**. Apenas sinalize claramente no changelog final que esse ponto ficou
   pendente de decisão humana (trocar por depoimentos reais de clientes).

---

## ENTREGÁVEL FINAL

Ao terminar, gere um changelog resumido com:
- O que foi implementado em cada fase
- Quais rotas passaram a ter metadata/schema completos
- Resultado da validação no Rich Results Test
- Qualquer pendência que exija decisão humana (ex.: depoimentos reais, endereço
  formal para o schema LocalBusiness, imagens de case que faltam)

Não faça deploy automático — deixe as mudanças prontas em uma branch para revisão.
