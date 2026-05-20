import type { LucideIcon } from "lucide-react";

import { ICON_SIZES, type IconSize } from "@/lib/icons";
import { cn } from "@/lib/utils";

export interface IconProps {
  icon: LucideIcon;
  size?: IconSize;
  className?: string;
  "aria-hidden"?: boolean;
  "aria-label"?: string;
}

export function Icon({
  icon: LucideIconComponent,
  size = "sm",
  className,
  "aria-hidden": ariaHidden = true,
  "aria-label": ariaLabel,
}: IconProps) {
  return (
    <LucideIconComponent
      className={cn(ICON_SIZES[size], "shrink-0", className)}
      aria-hidden={ariaHidden}
      aria-label={ariaLabel}
    />
  );
}
