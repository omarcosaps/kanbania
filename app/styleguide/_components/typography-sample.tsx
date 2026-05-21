import { Badge } from "@/components/ui/badge";

const ROLES = [
  {
    role: "display",
    utility: "text-display",
    meta: "24px / 36px · font-semibold — título de board e auth",
    sample: "Roadmap Q3",
  },
  {
    role: "heading",
    utility: "text-heading",
    meta: "14px / 20px · font-medium — coluna, labels",
    sample: "In Progress",
  },
  {
    role: "body",
    utility: "text-body",
    meta: "14px / 19.25px · font-medium — título de task, botão",
    sample: "Update dependencies to latest versions",
  },
  {
    role: "caption",
    utility: "text-caption",
    meta: "12px / 16px · font-normal — metadata, subtítulo",
    sample: "KAN-12",
    muted: true,
  },
  {
    role: "tag",
    utility: "text-tag",
    meta: "10px / 15px · font-medium — Badge size=tag",
    sample: null,
  },
] as const;

export function TypographySample() {
  return (
    <div className="flex flex-col gap-6">
      {ROLES.map((item) => (
        <div
          key={item.role}
          className="space-y-1 border-b border-border pb-4 last:border-0"
        >
          <p className="text-caption text-muted-foreground">
            {item.role} · <code className="text-foreground">{item.utility}</code>{" "}
            · {item.meta}
          </p>
          {item.role === "tag" ? (
            <Badge variant="secondary" size="tag">
              tech-debt
            </Badge>
          ) : (
            <p
              className={
                item.role === "caption"
                  ? `${item.utility} text-muted-foreground`
                  : item.utility
              }
            >
              {item.sample}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
