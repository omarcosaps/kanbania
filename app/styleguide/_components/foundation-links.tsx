import Link from "next/link";

import { navigation } from "../navigation";

const FOUNDATION_ITEMS =
  navigation.find((s) => s.title === "Foundation")?.items ?? [];

export function FoundationLinks() {
  if (FOUNDATION_ITEMS.length <= 1) return null;

  return (
    <div className="mb-10 grid gap-4 sm:grid-cols-2">
      {FOUNDATION_ITEMS.filter((item) => item.href !== "/styleguide").map(
        (item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-lg border border-border bg-card p-5 shadow-card transition-colors hover:border-primary/30 hover:bg-muted/30"
          >
            <h3 className="font-semibold text-foreground group-hover:text-primary">
              {item.name}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Ver documentação →
            </p>
          </Link>
        )
      )}
    </div>
  );
}
