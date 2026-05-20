import Link from "next/link";

import { navigation } from "../navigation";

const COMPONENTS_SECTION = navigation.find((s) => s.title === "Components");

export function ComponentsIndex() {
  if (!COMPONENTS_SECTION?.items.length) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {COMPONENTS_SECTION.items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group rounded-lg border border-border bg-card p-5 shadow-card transition-colors hover:border-primary/30 hover:bg-muted/30"
        >
          <h3 className="font-semibold text-foreground group-hover:text-primary">
            {item.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Ver variantes, exemplos de código e acessibilidade →
          </p>
        </Link>
      ))}
    </div>
  );
}
