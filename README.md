# Kanbania

App Kanban em Next.js com design system documentado no styleguide interno.

## Desenvolvimento

```bash
npm install
npm run dev
```

- App: [http://localhost:3000](http://localhost:3000)
- **Styleguide:** [http://localhost:3000/styleguide](http://localhost:3000/styleguide)

## Design System

- [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) — hierarquia, tokens, regras de composição
- [docs/FIGMA_TO_CODE.md](docs/FIGMA_TO_CODE.md) — checklist Figma MCP → implementação

Agentes e contribuidores: leia também [AGENTS.md](AGENTS.md).

## Estrutura relevante

```
app/globals.css       # design tokens
components/ui/        # primitives (shadcn)
components/           # composições de domínio
app/styleguide/       # documentação viva
lib/icons.ts          # catálogo de ícones
```

## Build

```bash
npm run build
```
