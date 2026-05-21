export function MotionDemo() {
  const durations = [
    { name: "Fast", variable: "--duration-fast", value: "150ms" },
    { name: "Normal", variable: "--duration-normal", value: "200ms" },
    { name: "Slow", variable: "--duration-slow", value: "300ms" },
  ] as const;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {durations.map((d) => (
          <div key={d.variable} className="flex flex-col gap-2">
            <button
              type="button"
              className="rounded-lg border border-border bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-interactive hover:bg-primary/80"
              style={{ transitionDuration: `var(${d.variable})` }}
            >
              Hover ({d.name})
            </button>
            <p className="font-mono text-xs text-muted-foreground">
              {d.variable} · {d.value}
            </p>
          </div>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        Easing padrão:{" "}
        <code className="text-foreground">--ease-default</code> · Utilitário{" "}
        <code className="text-foreground">transition-interactive</code> para
        cores e bordas.
      </p>
    </div>
  );
}
