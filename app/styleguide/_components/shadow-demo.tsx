export function ShadowDemo() {
  return (
    <div className="flex flex-wrap gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex h-24 w-40 items-center justify-center rounded-lg border border-border bg-card">
          <span className="text-xs text-muted-foreground">Sem sombra</span>
        </div>
        <p className="text-xs text-muted-foreground">Apenas borda</p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex h-24 w-40 items-center justify-center rounded-lg border border-secondary bg-card shadow-card">
          <span className="text-xs text-muted-foreground">Card</span>
        </div>
        <p className="font-mono text-xs text-muted-foreground">--shadow-card</p>
      </div>
    </div>
  );
}
