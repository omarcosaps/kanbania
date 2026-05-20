const TYPE_SCALE = [
  { label: "Extra small", name: "xs", className: "text-xs", px: "12px" },
  { label: "Small", name: "sm", className: "text-sm", px: "14px" },
  { label: "Base", name: "base", className: "text-base", px: "16px" },
  { label: "Large", name: "lg", className: "text-lg", px: "18px" },
  { label: "Extra large", name: "xl", className: "text-xl", px: "20px" },
  { label: "Huge", name: "2xl", className: "text-2xl", px: "24px" },
  { label: "Extra Huge", name: "3xl", className: "text-3xl", px: "30px" },
  { label: "Gigantic", name: "4xl", className: "text-4xl", px: "36px" },
] as const;

export function TypeScaleDemo() {
  return (
    <div className="flex flex-col gap-4">
      {TYPE_SCALE.map((item) => (
        <div
          key={item.name}
          className="flex items-baseline justify-between gap-4 border-b border-border py-3 last:border-b-0"
        >
          <div className="flex min-w-0 flex-1 items-baseline gap-4">
            <span className="w-24 shrink-0 text-xs text-muted-foreground">
              {item.label}
            </span>
            <p className={`truncate font-medium ${item.className}`}>
              Lorem Ipsum
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground">
            <span className="font-mono">{item.className}</span>
            <span>{item.px}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
