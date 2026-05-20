const STEPS = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
] as const;

export function ColorScale({
  prefix,
  title,
}: {
  prefix: "primary" | "gray";
  title: string;
}) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">{title}</h3>
      <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
        {STEPS.map((step) => (
          <div key={step} className="flex flex-col gap-1.5">
            <div
              className="h-12 w-full rounded-md border border-border"
              style={{
                backgroundColor: `var(--${prefix}-${step})`,
              }}
            />
            <span className="text-center text-xs text-muted-foreground">
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
