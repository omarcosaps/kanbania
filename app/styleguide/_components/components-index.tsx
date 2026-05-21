import Link from "next/link";

import { DOCUMENTED_COMPONENT_SECTIONS, navigation } from "../navigation";

export function ComponentsIndex() {
  const sections = navigation.filter((s) =>
    DOCUMENTED_COMPONENT_SECTIONS.includes(
      s.title as (typeof DOCUMENTED_COMPONENT_SECTIONS)[number]
    )
  );

  if (!sections.length) return null;

  return (
    <div className="flex flex-col gap-8">
      {sections.map((section) => (
        <div key={section.title}>
          <h3 className="text-heading mb-3 text-muted-foreground">{section.title}</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group shadow-card rounded-lg border border-border bg-card p-5 transition-interactive hover:border-primary/30 hover:bg-muted/30"
              >
                <h4 className="text-body font-semibold text-foreground group-hover:text-primary">
                  {item.name}
                </h4>
                <p className="text-caption mt-1 text-muted-foreground">
                  Variantes, tokens e anti-patterns →
                </p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
