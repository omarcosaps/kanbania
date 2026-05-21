export function ShadowDemo() {
  return (
    <div className="flex flex-wrap gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex h-24 w-40 items-center justify-center rounded-lg border border-border bg-card">
          <span className="text-caption text-muted-foreground">Sem sombra</span>
        </div>
        <p className="text-caption text-muted-foreground">border only</p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="shadow-card flex h-24 w-40 items-center justify-center rounded-lg border border-secondary bg-card">
          <span className="text-caption text-muted-foreground">Card</span>
        </div>
        <p className="font-mono text-caption text-muted-foreground">
          shadow-card · --shadow-card
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="shadow-elevated flex h-24 w-48 items-center justify-center rounded-xl border border-border bg-card">
          <span className="text-caption text-muted-foreground">Elevated</span>
        </div>
        <p className="font-mono text-caption text-muted-foreground">
          shadow-elevated · auth card
        </p>
      </div>
    </div>
  );
}
