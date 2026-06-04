# KanbanIA

KanbanIA é um projeto experimental de Kanban criado para estudar e praticar a construção de software com apoio de IA.

O objetivo é explorar o ciclo completo de desenvolvimento de produto, desde a definição de requisitos e arquitetura até a implementação, versionamento, documentação e deploy.

## Objetivo

Este projeto funciona como um laboratório prático para estudar:

- Desenvolvimento de produtos com IA
- Arquitetura Front-end com Next.js
- Organização de features e componentes
- Autenticação e persistência com Supabase
- Boas práticas de Git, commits e Pull Requests
- Documentação técnica e tomada de decisão

## Stack

- Next.js
- React
- TypeScript
- Supabase
- Design System próprio
- GitHub

## Funcionalidades

- Criação de workspaces
- Colunas customizáveis
- Tarefas com drag-and-drop
- Autenticação de usuários
- Persistência de dados
- Organização por features

## Estrutura do Projeto

```txt
app/                 Rotas e páginas da aplicação
components/          Componentes reutilizáveis de UI
features/            Funcionalidades organizadas por domínio
lib/                 Utilitários, helpers e configurações
services/supabase/   Integração com Supabase
supabase/migrations/ Migrações do banco de dados
validations/         Schemas de validação
docs/                Documentação técnica
prompts/             Prompts utilizados durante o desenvolvimento com IA
```

## Como Executar Localmente

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em:

```txt
http://localhost:3000
```

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Workflow com IA

Este projeto utiliza IA como suporte para:

- Planejamento de funcionalidades
- Estruturação de componentes
- Refatoração de código
- Revisão técnica
- Documentação
- Engenharia de prompts

Todo código gerado ou sugerido por IA é revisado e validado manualmente antes de ser integrado ao projeto.

## Status

🚧 Projeto experimental em desenvolvimento.

## Aprendizados

Este repositório também funciona como registro da evolução dos estudos sobre desenvolvimento de software e produtos digitais assistidos por IA.
