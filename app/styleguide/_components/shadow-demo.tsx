import { FIGMA_SHADOW_CARD } from "../figma-tokens";

export function ShadowDemo() {
  return (
    <div className="flex flex-wrap gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex h-24 w-40 items-center justify-center rounded-lg border border-border bg-card">
          <span className="text-xs text-muted-foreground">Sem sombra</span>
        </div>
        <p className="text-xs text-muted-foreground">border only</p>
      </div>
      <div className="flex flex-col gap-2">
        <div
          className="flex h-24 w-40 items-center justify-center rounded-lg border border-secondary bg-card"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <span className="text-xs text-muted-foreground">Card</span>
        </div>
        <p className="font-mono text-xs text-muted-foreground">--shadow-card</p>
        <p className="text-xs text-muted-foreground">Figma: Overlay+Shadow</p>
      </div>
      <div className="flex flex-col gap-2">
        <div
          className="flex h-24 w-40 items-center justify-center rounded-lg border border-secondary bg-card"
          style={{ boxShadow: FIGMA_SHADOW_CARD }}
        >
          <span className="text-xs text-muted-foreground">Figma raw</span>
        </div>
        <p className="max-w-[200px] font-mono text-[10px] text-muted-foreground">
          {FIGMA_SHADOW_CARD}
        </p>
      </div>
    </div>
  );
}
