export function CodeExample({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-border bg-muted/50 p-4 text-xs leading-relaxed">
      <code>{code.trim()}</code>
    </pre>
  );
}
