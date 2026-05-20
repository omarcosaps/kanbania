# Design System — Kanbania

Fonte de verdade visual e de componentes do projeto. O catálogo vivo está em `/styleguide`; os tokens em `app/globals.css`.

## Hierarquia

```
app/globals.css          → design tokens (cores, radius, spacing, sombras)
components/ui/           → primitives (shadcn + variantes do projeto)
components/              → composições de domínio (ex.: TaskCard)
app/                     → páginas e layouts (orquestração, sem estilos ad hoc)
app/styleguide/          → documentação e demos
lib/icons.ts             → catálogo de ícones permitidos
```

## Regra: Figma MCP

- **Use** o Figma MCP para entender layout, hierarquia, estados e comportamento.
- **Não copie** classes, valores hex ou dimensões literais do output do Figma MCP para o código.
- **Implemente** com componentes e tokens já existentes no styleguide.
- `app/styleguide/figma-tokens.ts` é só para **auditoria** — não importar em UI de produto.

Fluxo detalhado: [FIGMA_TO_CODE.md](./FIGMA_TO_CODE.md).

## Imports canônicos

| Necessidade | Import |
|-------------|--------|
| Botão, Badge, Card, Alert, etc. | `@/components/ui/*` |
| Card de tarefa do board | `@/components/task-card` |
| Ícones | `@/lib/icons` (nunca `lucide-react` direto em features) |
| Utilitário de classes | `@/lib/utils` (`cn`) |

## Tokens → classes Tailwind

### Cores semânticas

| Token CSS | Classe típica |
|-----------|----------------|
| `--background` | `bg-background` |
| `--foreground` | `text-foreground` |
| `--card` | `bg-card` |
| `--primary` | `bg-primary`, `text-primary` |
| `--secondary` | `bg-secondary` |
| `--muted-foreground` | `text-muted-foreground` |
| `--destructive` | `bg-destructive`, `text-destructive` |
| `--border` | `border-border` |
| `--priority-high` | `text-priority-high` |
| `--priority-med` | `text-priority-med` |
| `--priority-low` | `text-priority-low` |

### Radius

| Token | Classe |
|-------|--------|
| `--radius-sm` | `rounded-sm` |
| `--radius-md` | `rounded-md` |
| `--radius-lg` | `rounded-lg` |
| `--radius-xl` | `rounded-xl` |

### Sombras e spacing

| Token | Uso |
|-------|-----|
| `--shadow-card` | `shadow-[var(--shadow-card)]` em cards de board |
| `--space-1` … `--space-16` | `p-3`, `gap-2`, etc. (escala Tailwind mapeada em `@theme`) |

### Tipografia de tag (board)

| Token | Classe |
|-------|--------|
| `--text-tag-size` | `text-tag` |
| `--text-tag-leading` | (incluído em `text-tag`) |
| `--spacing-tag-x`, `--spacing-tag-y` | usados em `Badge size="tag"` |

## Matriz: reutilizar vs criar

| Situação | Ação |
|----------|------|
| Existe no styleguide com variante adequada | Importar e compor |
| Existe, quase bate | Adicionar `variant` / `size` no primitive + atualizar styleguide |
| Padrão em 2+ telas | Novo arquivo em `components/` (domínio) |
| Uso único e trivial | Compor na página; não criar componente novo |
| Valor visual sem token | Adicionar token em `globals.css` + demo no styleguide **antes** de usar |

## Definition of Done (componente)

1. Primitive ou composição em `components/`.
2. Página em `app/styleguide/components/[nome]/page.tsx`.
3. Entrada em `app/styleguide/navigation.ts`.
4. Snippet de import (`CodeExample`).
5. Seções: **Tokens usados**, **Composição em produto** (se aplicável), **Anti-patterns**.
6. `npm run build` sem erros.

## Anti-patterns (produto)

- `text-[10px]`, `px-[7px]`, `p-[13px]` sem token documentado
- Cores hex literais (`#4f46e5`) em componentes
- `<span>` duplicando estilos de `Badge` para tags de board
- Componente novo só para “fidelidade pixel-perfect” a uma tela Figma
- Importar `app/styleguide/figma-tokens.ts` em UI

## Evolução (changelog)

Registre aqui token ou variante nova:

| Data | Mudança |
|------|---------|
| 2026-05 | `Badge size="tag"`, tokens `--text-tag-*`, `--spacing-tag-*`; TaskCard usa Badge |
