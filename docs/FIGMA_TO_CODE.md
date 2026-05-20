# Figma MCP → Código

Checklist para implementar telas a partir do Figma MCP sem aumentar débito visual.

## Antes de codar

1. **Auditar o styleguide** — abrir `/styleguide` e listar:
   - Foundation: tokens, ícones
   - Components: Button, Badge, Task Card, Alert, Radio Group, etc.
2. **Auditar `components/`** — composições de domínio já prontas (`task-card`, …).
3. **Ler** [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md).

## Análise do Figma MCP (referência apenas)

Extrair do design:

- Estrutura de layout (colunas, header, sidebar)
- Hierarquia de conteúdo e CTAs
- Estados (default, hover, disabled, empty)
- Nomes dos blocos para mapeamento

**Não extrair** para colar no código: `className` gerados, hex, px literais do auto-layout.

## Mapeamento bloco → componente

Preencher antes da implementação:

| Bloco no Figma | Componente existente | Variante / notas |
|----------------|----------------------|------------------|
| ex. Task row | `TaskCard` | `priority`, `tag` |
| ex. Category pill | `Badge` | `variant="secondary" size="tag"` |
| ex. Primary CTA | `Button` | `variant="default"` |
| … | … | … |

## Gap analysis

Para cada linha sem componente:

| Gap | Solução |
|-----|---------|
| Cor/tamanho sem token | Adicionar em `globals.css` + demo em `/styleguide` |
| Primitive quase serve | Nova `variant` / `size` em `components/ui` |
| Padrão repetido 2+ vezes | Novo `components/[Nome].tsx` + página styleguide |
| Uso único trivial | Compor na página |

Ordem: **token → primitive → domínio → página**.

## Implementação

- Imports só de `@/components/ui/*`, `@/components/*` (domínio), `@/lib/icons`.
- Estilos via tokens (`bg-primary`, `rounded-lg`, `p-3`, `text-tag`, …).
- Task cards do board: sempre `TaskCard`, não `Card` cru.
- Tags de categoria: sempre `Badge variant="secondary" size="tag"`.

## Proibidos em `components/` e `app/` (produto)

- `text-[Npx]`, `px-[Npx]`, `p-[13px]` sem token equivalente documentado
- Cores `#RRGGBB` ou `rgb(...)` literais
- Copiar markup/classes do output bruto do Figma MCP
- Novo componente só para uma tela se composição resolve

Exceções permitidas em demos de auditoria: `figma-tokens.ts`, metadados de catálogo no styleguide.

## Validação antes do merge

- [ ] Cada bloco mapeado na tabela acima
- [ ] Nenhum gap resolvido com estilo inline duplicado
- [ ] Visual conferido em `/styleguide` (componentes usados)
- [ ] `npm run build` passa
- [ ] Página nova de componente (se criada) em `navigation.ts`

## Exemplo rápido (board Kanban)

```
Figma: coluna + lista de cards + tag + prioridade
  → Column layout (app) + TaskCard[] + Badge size="tag" (interno ao TaskCard)
  → Button outline para ações secundárias
  → Ícones de prioridade via lib/icons (já no TaskCard)
```
