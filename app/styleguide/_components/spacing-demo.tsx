import { SPACING_SCALE } from "../figma-tokens";

export function SpacingDemo() {
  return (
    <div className="flex flex-col gap-3">
      {SPACING_SCALE.map((item) => (
        <div
          key={item.variable}
          className="flex items-center gap-4 rounded-md border border-border bg-card p-3"
        >
          <span className="w-8 shrink-0 text-right text-xs font-medium tabular-nums text-muted-foreground">
            {item.step}
          </span>
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div
              className="h-6 shrink-0 rounded-sm border border-primary/30 bg-primary/20"
              style={{ width: `var(${item.variable})` }}
            />
            <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-0.5 text-xs">
              <span className="font-medium tabular-nums">
                {item.px}px · {item.rem}
              </span>
              <span className="font-mono text-muted-foreground">{item.variable}</span>
              <span className="font-mono text-muted-foreground">{item.className}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
