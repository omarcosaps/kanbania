import { Section } from "./section";

export function ComponentDemo({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Section title={title} description={description}>
      <div className="rounded-lg border border-border bg-background p-6">{children}</div>
    </Section>
  );
}
