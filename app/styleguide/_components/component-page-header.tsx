import Link from "next/link";

export function ComponentPageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <header className="mb-10 border-b border-border pb-8">
      <Link
        href="/styleguide"
        className="mb-4 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Design Tokens
      </Link>
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p>
    </header>
  );
}
