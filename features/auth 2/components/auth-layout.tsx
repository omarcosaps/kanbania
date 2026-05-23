import Link from "next/link";

import { Logo } from "@/components/layout/logo";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  footerText: string;
  footerLinkText: string;
  footerHref: string;
  children: React.ReactNode;
  className?: string;
}

export function AuthLayout({
  title,
  subtitle,
  footerText,
  footerLinkText,
  footerHref,
  children,
  className,
}: AuthLayoutProps) {
  return (
    <div
      className={cn(
        "flex min-h-full flex-col items-center justify-center bg-background px-4 py-12",
        className
      )}
    >
      <div className="mb-8 flex flex-col items-center gap-4 text-center">
        <Logo />
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      <Card className="w-full max-w-[400px] border-border shadow-card">
        <CardContent className="p-6">{children}</CardContent>
      </Card>

      <p className="mt-6 text-sm text-muted-foreground">
        {footerText}{" "}
        <Link
          href={footerHref}
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          {footerLinkText}
        </Link>
      </p>
    </div>
  );
}
