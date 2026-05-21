# PRD — KanbanIA

> Projeto teste de Kanban com workspaces customizáveis
> Versão: MVP 1.0 · Data: 17/05/2026 · Owner: Marcos

---

## 📋 CABEÇALHO DO PROJETO

| Campo | Valor |
|-------|-------|
| **Nome do Produto** | KanbanIA |
| **Versão** | MVP 1.0 |
| **Ferramenta de Build** | Cursor |
| **Stack** | Next.js 14 (App Router) + Supabase + Tailwind |
| **Data** | 17/05/2026 |
| **Owner** | Marcos |

---

## 1. PROBLEMA & OPORTUNIDADE

### O Problema
Ferramentas de gestão de tarefas no estilo Kanban (Trello, Jira, Asana) ou são pesadas e cheias de funcionalidades que pequenos times não usam, ou são simples demais e não permitem customização básica de fluxo. Quem só quer um quadro limpo, rápido e com colunas personalizadas acaba pagando por features que nunca toca.

### A Solução
Um Kanban minimalista e rápido onde o usuário cria um workspace, define suas próprias colunas e move tarefas por drag-and-drop — sem ruído, sem onboarding longo, sem features de relatório/automação que não importam no início.

### Por que agora?
Este é um projeto teste para praticar desenvolvimento de produto digital com IA (Cursor + Next.js + Supabase). O foco é entregar um MVP funcional com qualidade de produção que sirva de baseline para futuras iterações.

---

## 2. PERSONA PRIMÁRIA

**Nome:** Camila, 29 anos
**Perfil:** Designer freelancer que coordena 2-3 projetos paralelos com clientes diferentes. Já tentou Trello, achou ok, mas quer algo mais leve e bonito pra usar no dia a dia.
**Problema principal:** Precisa visualizar status de tarefas por projeto sem precisar configurar 15 coisas antes de começar a usar.
**Como encontra o produto:** Indicação de outro designer / link compartilhado.
**Métrica de sucesso para ela:** Criar primeiro workspace, adicionar 5 tarefas e mover entre colunas em menos de 3 minutos.

---

## 3. PROPOSTA DE VALOR

> Para freelancers e times pequenos que precisam organizar tarefas visualmente, o **KanbanIA** é um app de Kanban minimalista que permite criar workspaces com colunas customizadas e mover tarefas por drag-and-drop em segundos. Diferente do Trello (complexo) ou Notion (genérico), o KanbanIA faz uma coisa só e faz bem feita.

---

## 4. ESCOPO DO MVP

### ✅ ESTÁ NO MVP (obrigatório v1)

#### Feature 1: Cadastro e Login de Usuário
- **O que faz:** Permite criar conta com nome, email e senha; depois acessar com email e senha.
- **Comportamento:**
  - Usuário sem conta acessa `/signup`, preenche nome + email + senha, clica em "Create account" → sistema cria conta no Supabase Auth, gera workspace inicial vazio e redireciona para `/workspace`.
  - Usuário com conta acessa `/login`, preenche email + senha, clica em "Log in" → sistema autentica e redireciona para o último workspace acessado.
  - Link "Sign up" / "Log in" alterna entre as duas telas.
  - Campo de senha tem botão de "olho" para mostrar/esconder texto.
  - Link "Forgot password?" presente na tela de login mas pode ficar inativo no MVP (apenas link visual).
- **Critério de aceite:** Usuário consegue criar conta, sair, e voltar a entrar com as mesmas credenciais.

#### Feature 2: Criação e Gestão de Workspaces (Boards)
- **O que faz:** Usuário pode ter múltiplos boards dentro do workspace, navegáveis por tabs no topo.
- **Comportamento:**
  - Ao logar pela primeira vez, sistema cria automaticamente um board vazio.
  - Tab ativa fica destacada visualmente.
  - Botão "+" ao lado das tabs cria um novo board (modal pede só o nome).
  - Cada board tem título editável no canto superior esquerdo da área de conteúdo.
  - Badge "Private" é decorativa no MVP (não há compartilhamento).
- **Critério de aceite:** Usuário cria pelo menos 2 boards, navega entre eles e cada um mantém suas próprias colunas e tarefas.

#### Feature 3: Colunas Customizáveis por Board
- **O que faz:** Cada board tem colunas que o usuário cria, renomeia e exclui.
- **Comportamento:**
  - Ao criar um board novo, sistema sugere 4 colunas padrão: Backlog, Todo, In Progress, Done.
  - Cada coluna mostra o nome e o contador de tarefas ao lado.
  - Botão "+" no header de cada coluna abre o formulário de nova tarefa daquela coluna.
  - Botão "..." no header de cada coluna abre menu com: renomear coluna, excluir coluna.
  - À direita do quadro existe placeholder "+ Add Column" para criar nova coluna.
- **Critério de aceite:** Usuário consegue criar coluna nova, renomear coluna existente e excluir coluna (com confirmação se tiver tarefas dentro).

#### Feature 4: Criação, Edição e Exclusão de Tarefas
- **O que faz:** CRUD completo de tarefas dentro das colunas.
- **Comportamento — criar:**
  - Clicar em "+" no header da coluna OU em "+ New Task" no topo direito abre um card inline na coluna com campo "Task title…", ícone de tag e ícone de prioridade (bandeira), e botões "Cancel" / "Save".
  - Ao salvar, sistema atribui ID sequencial (KAN-XX, contador global do board) e card aparece na coluna.
- **Comportamento — editar:**
  - Clicar em um card existente abre modal de edição com: título, tag, prioridade, descrição (opcional), e botão de excluir.
  - Mudanças são salvas ao clicar em "Save"; modal fecha e card atualiza no quadro.
- **Comportamento — excluir:**
  - Dentro do modal de edição, botão "Delete" abre confirmação ("Tem certeza?") antes de excluir.
- **Critério de aceite:** Usuário cria, edita e exclui tarefas — ações persistem após refresh.

#### Feature 5: Drag and Drop de Tarefas
- **O que faz:** Mover tarefas entre colunas e reordenar dentro da mesma coluna arrastando.
- **Comportamento:**
  - Usuário pressiona e segura um card → card fica com sombra/elevação.
  - Ao arrastar sobre outra coluna, espaço se abre indicando onde o card vai cair.
  - Ao soltar, card muda de coluna e contador da coluna se atualiza.
  - Dentro da mesma coluna, drag reordena cards verticalmente.
  - Ordem e coluna persistem no banco.
- **Critério de aceite:** Drag funciona em desktop. Mover card entre colunas atualiza estado e contador imediatamente, sem reload.

#### Feature 6: Metadados Visuais do Card
- **O que faz:** Cada card mostra: título, ID (KAN-XX), indicador de prioridade e tag/label.
- **Comportamento:**
  - **Título:** texto principal do card, máximo ~2 linhas visíveis com truncamento.
  - **ID:** "KAN-XX" em cinza pequeno.
  - **Prioridade:** ícone de seta:
    - `↑` vermelha = alta
    - `—` cinza = média
    - `↓` (adicionar) = baixa
  - **Tag:** badge cinza claro (ex: `tech-debt`, `design`, `feature`, `bug`, `a11y`, `frontend`).
- **Critério de aceite:** Card renderiza corretamente todos os 4 elementos. Tags e prioridade são editáveis pelo modal.

### ❌ FORA DO ESCOPO (não construir no MVP)

> **Importante:** mesmo que o nome do produto seja "KanbanIA", **não há features de IA no MVP**. IA fica para v2 e o Cursor não deve adicionar nada nesse sentido.

- ❌ Qualquer feature de IA (sugestão de tarefas, resumo automático, geração de descrição, etc.)
- ❌ Compartilhamento de workspace/board com outros usuários (badge "Private" é só visual)
- ❌ Comentários em tarefas
- ❌ Anexos / upload de arquivos
- ❌ Notificações (email, push, in-app)
- ❌ Datas de vencimento / deadlines em tarefas
- ❌ Atribuição de tarefa a outro usuário
- ❌ Subtarefas / checklists
- ❌ Filtros e busca avançada de tarefas
- ❌ Múltiplas views (lista, calendário, gantt) — botão "View" pode existir mas só com Kanban no MVP
- ❌ Histórico/atividade do board
- ❌ Exportação (CSV, PDF)
- ❌ Pagamentos / planos / billing
- ❌ Recuperação de senha funcional (link "Forgot password?" é decorativo)
- ❌ Dark mode
- ❌ Responsividade mobile completa (foco em desktop; mobile pode ser "usável" mas não polido)
- ❌ Testes automatizados (estrutura de pastas criada, mas testes não escritos no MVP)

---

## 5. FLUXOS PRINCIPAIS

### Fluxo 1: Onboarding (cadastro + primeiro board) — FLUXO MAIS CRÍTICO

```
1. Usuário acessa /signup
2. Preenche Name, Email, Password
3. Clica em "Create account"
4. Sistema cria usuário no Supabase Auth + cria workspace padrão + cria board inicial com 4 colunas (Backlog, Todo, In Progress, Done)
5. Usuário é redirecionado para /workspace
6. Vê o board vazio com as 4 colunas e botão "+ New Task" no canto superior direito
7. Pode imediatamente criar a primeira tarefa
```

**Estados de erro:**
- Email já cadastrado → mensagem inline "Esse email já está em uso. Faça login."
- Senha muito curta (<8 caracteres) → mensagem inline "Senha precisa ter pelo menos 8 caracteres."
- Campos vazios → mensagem inline em cada campo.

### Fluxo 2: Criar e mover uma tarefa

```
1. Usuário logado está no board
2. Clica em "+" no header da coluna "Todo" (ou em "+ New Task" no topo direito e seleciona coluna)
3. Aparece card inline com campo "Task title...", ícones de tag e prioridade, botões Cancel/Save
4. Digita título → opcionalmente clica em ícone de tag para adicionar tag e ícone de bandeira para prioridade
5. Clica em "Save"
6. Card aparece na coluna com ID KAN-XX gerado automaticamente
7. Usuário arrasta o card para a coluna "In Progress"
8. Card muda de coluna, contador da coluna "Todo" diminui e da "In Progress" aumenta
9. Estado persiste no banco
```

**Estados de erro:**
- Título vazio ao salvar → botão Save fica desabilitado.
- Falha de rede ao salvar → toast "Erro ao salvar. Tente novamente."

### Fluxo 3: Editar e excluir tarefa

```
1. Usuário clica em um card existente
2. Modal abre centralizado com: campo título (editável), campo descrição (textarea), seletor de tag, seletor de prioridade, e dois botões: "Delete" e "Save"
3a. Usuário edita campos e clica em "Save" → modal fecha, card atualiza no quadro
3b. Usuário clica em "Delete" → aparece confirmação "Excluir esta tarefa? Esta ação não pode ser desfeita." com botões "Cancelar" e "Excluir"
4. Se confirmado → tarefa some do quadro e contador da coluna atualiza
```

### Fluxo 4: Login de usuário existente

```
1. Usuário acessa /login
2. Preenche email e senha
3. Clica em "Log in"
4. Sistema autentica e redireciona para /workspace (último board acessado, ou primeiro board se não houver histórico)
```

**Estados de erro:**
- Credenciais inválidas → mensagem inline "Email ou senha incorretos."

---

## 6. DESIGN E UX

### Referência Visual
As **telas de referência fornecidas pelo Marcos** (4 imagens: signup, login, workspace, criação de tarefa inline) são a fonte de verdade visual deste projeto. O styleguide (rota `/styleguide` em MDX) é construído na Fase 1 com base nessas imagens e serve como contrato visual para todas as telas subsequentes.

### Inspirações de Tom
- **Linear** — pelo minimalismo e velocidade
- **Notion** — pela clareza tipográfica

### Tom de Voz
Direto, minimalista, sem floreios. Microcopy curta. MVP em inglês (alinhado às telas de referência).

### Princípios de UI
- Espaçamento generoso
- Sombras sutis
- Cantos arredondados consistentes
- Ícones funcionais apenas (tag, bandeira, olho, "+", "...", avatar)
- Animações suaves (~150ms) em drag-and-drop e modais

> Detalhes específicos (paleta exata, tokens, escala tipográfica, componentes) ficam no styleguide. Ver `docs/architecture.md` para a estrutura do design system.

---

## 7. FASES DE CONSTRUÇÃO

> Ordem definida pelo Marcos: **Styleguide → Front estático → Backend → Drag-and-drop**.
> Passe uma fase por vez para o Cursor. Não passe tudo de uma vez.

### Fase 0 — Setup do projeto
**Objetivo:** Repositório pronto com estrutura de pastas e ferramentas configuradas.
**Entregáveis:**
- [ ] Projeto Next.js 14 (App Router) + TypeScript estrito + Tailwind
- [ ] Estrutura de pastas conforme `docs/architecture.md`
- [ ] `.cursor/rules/` configurado com regra base do Marcos
- [ ] shadcn/ui inicializado
- [ ] Dependências instaladas: `@supabase/supabase-js`, `@supabase/ssr`, `zod`, `react-hook-form`, `@hookform/resolvers`, `lucide-react`, `@dnd-kit/core`, `@dnd-kit/sortable`, `@next/mdx`
- [ ] `.env.example` com placeholders documentados
- [ ] README.md inicial com instruções de setup

**Critério de conclusão:** `npm run dev` roda sem erro e a página inicial mostra "Hello KanbanIA".

### Fase 1 — Styleguide e Design System
**Objetivo:** Sistema de design completo construído antes de qualquer tela de produto.
**Entregáveis:**
- [ ] Design tokens definidos em `src/styles/tokens.ts` ou via Tailwind config (cores, espaçamentos, raios, sombras, tipografia)
- [ ] Componentes base em `src/components/ui/` (Button, Input, Label, Card, Badge, Modal, Dropdown, IconButton, Tabs)
- [ ] Componentes de formulário em `src/components/forms/` (FormField, FormError)
- [ ] Componentes de layout em `src/components/layout/` (Header, PageContainer)
- [ ] Rota `/styleguide` em MDX mostrando todos os componentes e tokens em uso, com exemplos e variantes
- [ ] Cada componente da rota `/styleguide` documenta: props, variantes, estados (hover, focus, disabled, loading)

**Critério de conclusão:** Marcos acessa `/styleguide` e vê todos os componentes que serão usados nas telas, com visual alinhado às imagens de referência. **Não há lógica de produto ainda — só design system.**

### Fase 2 — Telas de Frontend (sem backend)
**Objetivo:** Telas montadas com componentes do styleguide, ainda sem persistência. Estado em memória / mock.
**Entregáveis:**
- [ ] `src/features/auth/` — tela `/signup` e `/login` (UI completa, validação Zod, submit faz console.log)
- [ ] `src/features/workspace/` — tela `/workspace/[boardId]` com header, tabs, colunas e cards (dados mockados em `src/features/workspace/mocks.ts`)
- [ ] Componente `TaskCard` renderizando todos os 4 elementos (título, ID, prioridade, tag)
- [ ] Componente `TaskCardInline` (formulário inline de criar tarefa)
- [ ] Modal de edição de tarefa (`TaskModal`) com todos os campos
- [ ] Estados visuais: vazio (empty state da coluna), loading (skeleton), erro (mensagem)

**Critério de conclusão:** Marcos navega pelas 3 telas (signup, login, workspace) e vê visual idêntico às imagens de referência. **Nada salva — tudo é mock.**

### Fase 3 — Backend e Integração
**Objetivo:** Telas conectadas ao Supabase. Tudo persiste.
**Entregáveis:**
- [ ] Schema SQL aplicado no Supabase (ver `TechDesign.md` seção 2)
- [ ] RLS policies configuradas e testadas com 2 contas
- [ ] Triggers de banco (criar workspace inicial, gerar KAN-XX) funcionando
- [ ] `src/services/supabase/` com clients browser e server
- [ ] `src/features/auth/services/` com Server Actions de signup, login, logout
- [ ] `src/features/workspace/services/` com Server Actions de board, column, task (CRUD completo)
- [ ] `src/validations/` com schemas Zod compartilhados
- [ ] Middleware de auth em `src/middleware.ts`
- [ ] Tratamento de erros (toasts) e estados de loading nos botões

**Critério de conclusão:** Marcos cria conta, sai, entra de novo, cria 5 tarefas, edita 1, exclui 1, cria 1 board novo, cria 1 coluna nova — tudo persiste após refresh.

### Fase 4 — Drag and Drop e Polimento
**Objetivo:** Produto completo, pronto pra primeiro uso real.
**Entregáveis:**
- [ ] `@dnd-kit/core` integrado no `KanbanBoard`
- [ ] Drag entre colunas funcional, com otimistic update
- [ ] Drag reordena dentro da mesma coluna
- [ ] Persistência da nova posição usando float em `position`
- [ ] Contadores das colunas atualizam em tempo real
- [ ] Polimento de UX: animações finas, feedback de drag (sombra/elevação), espaço aberto na coluna de destino
- [ ] Deploy na Vercel + variáveis de ambiente configuradas

**Critério de conclusão:** 3 pessoas externas conseguem se cadastrar, criar um board, adicionar 5 tarefas e mover entre colunas sem ajuda.

---

## 8. MÉTRICAS DE SUCESSO DO MVP

| Métrica | Meta | Como medir |
|---------|------|-----------|
| Tempo até primeira tarefa criada | < 60 segundos pós-signup | Log de timestamp `user.created_at` vs `first_task.created_at` |
| Taxa de retorno em 7 dias | > 30% | Supabase Auth — last_sign_in_at |
| Bugs críticos abertos | 0 | Issue tracker manual |
| Latência de drag-and-drop | < 200ms (perceptível como instantâneo) | DevTools / observação manual |

**Definição de "MVP validado":** 5 usuários externos criam conta, usam o produto por pelo menos 1 sessão completa (criar board + 5 tarefas + mover) e voltam pelo menos 1 vez na semana seguinte.

---

## 9. RISCOS E DEPENDÊNCIAS

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| Styleguide ficar incompleto e gerar retrabalho na Fase 2 | Média | Alto | Listar todos os componentes necessários ANTES de começar a Fase 1. Não avançar para Fase 2 sem todos catalogados em `/styleguide`. |
| Drag-and-drop com bugs de performance ou comportamento | Média | Alto | Usar `@dnd-kit/core` (battle-tested). Implementar só na Fase 4, com tarefas e colunas já estáveis. |
| RLS do Supabase mal configurado (vazamento de dados entre usuários) | Média | Alto | Configurar policies no schema desde a Fase 3. Testar manualmente com 2 contas antes de marcar fase como concluída. |
| Cursor "enfeitar" o produto com features fora do escopo (especialmente IA) | Alta | Médio | Reforçar no ruler base que IA está FORA do MVP. Repetir em cada prompt de fase. |
| Ordem de cards após drag-and-drop ficar inconsistente | Média | Médio | Usar campo `order` numérico (float) para permitir inserção entre cards sem renumeração em cascata. |

---

## 10. REFERÊNCIAS DE DOCUMENTAÇÃO INTERNA

- `docs/architecture.md` — Estrutura de pastas detalhada, decisões de arquitetura, padrões de código
- `docs/security.md` — RLS policies, gestão de secrets, headers de segurança, autenticação
- `docs/testing.md` — Estratégia de testes (estrutura criada no MVP, implementação pós-MVP)
- `docs/TechDesign.md` — Stack, modelo de dados, server actions, fluxos técnicos
- `src/app/styleguide` — Design system vivo (rota MDX)
- `.cursor/rules/project-quality-security.mdc` — Regra base do Cursor (ruler do Marcos)

---