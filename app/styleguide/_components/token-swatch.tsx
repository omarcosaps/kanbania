export function TokenSwatch({
  name,
  variable,
  className,
  figmaName,
  hex,
}: {
  name: string;
  variable: string;
  className: string;
  figmaName?: string;
  hex?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`h-16 w-full rounded-lg border border-border ${className}`}
      />
      <div>
        <p className="text-sm font-medium">{name}</p>
        <p className="font-mono text-xs text-muted-foreground">{variable}</p>
        {figmaName && (
          <p className="text-xs text-muted-foreground">
            Figma: <span className="font-medium">{figmaName}</span>
            {hex && (
              <span className="font-mono"> · {hex}</span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}
