const RADIUS_ITEMS = [
  { name: "sm", className: "rounded-sm", px: "4px" },
  { name: "md", className: "rounded-md", px: "8px" },
  { name: "lg", className: "rounded-lg", px: "12px" },
  { name: "xl", className: "rounded-xl", px: "24px" },
] as const;

export function RadiusDemo() {
  return (
    <div className="flex flex-wrap gap-6">
      {RADIUS_ITEMS.map((item) => (
        <div key={item.name} className="flex flex-col items-center gap-2">
          <div
            className={`flex h-20 w-20 items-center justify-center border border-border bg-muted ${item.className}`}
          >
            <span className="text-xs font-medium text-muted-foreground">
              {item.name}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            --radius-{item.name}
          </span>
          <span className="text-xs text-muted-foreground">{item.px}</span>
        </div>
      ))}
    </div>
  );
}
