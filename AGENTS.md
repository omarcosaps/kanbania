<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

### Rotas dinâmicas (`params`, `searchParams`)

No App Router (Next 16+), `params` e `searchParams` em `page`/`layout` são **Promises**. Nunca acesse propriedades de forma síncrona (`params.id`, `Object.keys(params)`, spread).

**Server Component:**

```tsx
export default async function Page({
  params,
}: {
  params: Promise<{ boardId: string }>;
}) {
  const { boardId } = await params;
  // ...
}
```

**Client Component:**

```tsx
"use client";
import { use } from "react";

export function PageClient({
  params,
}: {
  params: Promise<{ boardId: string }>;
}) {
  const { boardId } = use(params);
  // ...
}
```

Docs: https://nextjs.org/docs/messages/sync-dynamic-apis

### Aviso `params are being enumerated` no dev

Em `npm run dev`, logs repetidos com essa mensagem ao mover o mouse na preview costumam vir do **inspetor de componentes do Cursor** (`Object.keys` nas props), não de bug no app — o projeto ainda não usa rotas `[slug]`. O build de produção (`npm run build`) não deve exibir esse aviso. Pode ignorar até existir rota dinâmica com uso incorreto de `params`.
<!-- END:nextjs-agent-rules -->

## Design System

- Fonte de verdade: `/styleguide`, `app/globals.css`, `components/ui/*` — ver [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md).
- Telas vindas do Figma MCP: só referência estrutural/comportamental; não copiar estilos do output — ver [docs/FIGMA_TO_CODE.md](docs/FIGMA_TO_CODE.md).
- Priorizar componentes já documentados no styleguide e composições em `components/` (ex.: `TaskCard`).
- Estilos via tokens oficiais (`bg-primary`, `rounded-lg`, `text-tag`, `--shadow-card`, etc.); evitar `text-[Npx]`, hex literal e padding arbitrário em produto.
- Ícones apenas via `@/lib/icons`, nunca `lucide-react` direto em features.
- `app/styleguide/figma-tokens.ts` é auditoria — não importar em UI de produto.
- Novo padrão visual: token ou variante no primitive → página no styleguide → uso em domínio/páginas.
