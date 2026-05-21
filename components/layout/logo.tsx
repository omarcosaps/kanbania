import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md";
}

const sizeClasses = {
  sm: "size-8 text-sm",
  md: "size-10 text-base",
} as const;

export function Logo({ className, size = "md" }: LogoProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-lg bg-primary font-semibold text-primary-foreground",
        sizeClasses[size],
        className
      )}
      aria-hidden
    >
      K
    </div>
  );
}
