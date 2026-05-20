"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { navigation } from "./navigation";

export default function StyleguideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      <aside className="fixed top-0 left-0 flex h-screen w-64 flex-col gap-6 overflow-y-auto border-r bg-card p-6">
        <div>
          <Link href="/styleguide" className="text-xl font-bold text-foreground">
            Design System
          </Link>
          <p className="mt-1 text-xs text-muted-foreground">Kanbania</p>
        </div>

        <nav className="flex flex-col gap-6">
          {navigation.map((section) => (
            <div key={section.title}>
              <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
                {section.title}
              </h3>
              {section.items.length > 0 ? (
                <ul className="flex flex-col gap-1">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block rounded-md px-3 py-2 text-sm transition-colors",
                          pathname === item.href
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        )}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="px-3 text-xs text-muted-foreground italic">
                  Em breve (Prompt 2)
                </p>
              )}
            </div>
          ))}
        </nav>
      </aside>

      <main className="ml-64 flex-1 overflow-auto">{children}</main>
    </div>
  );
}
