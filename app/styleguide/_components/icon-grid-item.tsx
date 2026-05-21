import { Icon } from "@/components/icon";
import type { IconCatalogEntry, IconSize } from "@/lib/icons";
import { ICON_SIZES } from "@/lib/icons";

import { CodeExample } from "./code-example";

const ALL_SIZES: IconSize[] = ["xs", "sm", "md"];

export function IconGridItem({ entry }: { entry: IconCatalogEntry }) {
  const importCode = `import { ${entry.name} } from "@/lib/icons"`;

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="mb-4 flex items-center gap-4">
        {ALL_SIZES.map((size) => (
          <div key={size} className="flex flex-col items-center gap-1.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted/50">
              <Icon
                icon={entry.component}
                size={size}
                className={entry.colorClass}
                aria-hidden
              />
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              {size} · {ICON_SIZES[size].replace("size-", "")}
            </span>
          </div>
        ))}
      </div>
      <div className="space-y-1">
        <p className="font-mono text-sm font-medium">{entry.name}</p>
        <p className="text-sm text-foreground">{entry.label}</p>
        <p className="text-xs text-muted-foreground">{entry.usage}</p>
        {entry.colorClass && (
          <p className="font-mono text-xs text-muted-foreground">
            {entry.colorClass}
          </p>
        )}
      </div>
      <div className="mt-3">
        <CodeExample code={importCode} />
      </div>
    </div>
  );
}
