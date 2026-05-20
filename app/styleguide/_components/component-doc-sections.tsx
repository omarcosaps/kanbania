import { Section } from "./section";

interface DocListSectionProps {
  title: string;
  items: string[];
}

export function TokensUsedSection({ items }: { items: string[] }) {
  return (
    <DocListSection
      title="Tokens usados"
      items={items}
    />
  );
}

export function ProductCompositionSection({
  description,
}: {
  description: string;
}) {
  return (
    <Section title="Composição em produto">
      <p className="text-sm text-muted-foreground">{description}</p>
    </Section>
  );
}

export function AntiPatternsSection({ items }: { items: string[] }) {
  return (
    <DocListSection
      title="Anti-patterns"
      items={items}
    />
  );
}

function DocListSection({ title, items }: DocListSectionProps) {
  return (
    <Section title={title}>
      <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Section>
  );
}
