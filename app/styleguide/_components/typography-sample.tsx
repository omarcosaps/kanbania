import { Badge } from "@/components/ui/badge";

export function TypographySample() {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-1 border-b border-border pb-4">
        <p className="text-xs text-muted-foreground">
          Page title · 18px / 28px · font-medium (Figma Heading 1)
        </p>
        <p className="text-lg font-medium leading-7">Roadmap Q3</p>
      </div>
      <div className="space-y-1 border-b border-border pb-4">
        <p className="text-xs text-muted-foreground">
          Column header · 14px / 20px · font-medium
        </p>
        <p className="text-sm font-medium leading-5">In Progress</p>
      </div>
      <div className="space-y-1 border-b border-border pb-4">
        <p className="text-xs text-muted-foreground">
          Task title · 14px / 19.25px · font-medium
        </p>
        <p className="text-sm font-medium leading-snug">
          Update dependencies to latest versions
        </p>
      </div>
      <div className="space-y-1 border-b border-border pb-4">
        <p className="text-xs text-muted-foreground">
          Metadata · 12px / 16px · font-normal
        </p>
        <p className="text-xs text-muted-foreground">KAN-12</p>
      </div>
      <div className="space-y-1 border-b border-border pb-4">
        <p className="text-xs text-muted-foreground">
          Tag · 10px / 15px · font-medium
        </p>
        <Badge variant="secondary" size="tag">
          tech-debt
        </Badge>
      </div>
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">
          Button · 14px / 20px · font-medium
        </p>
        <p className="text-sm font-medium">New Task</p>
      </div>
    </div>
  );
}
