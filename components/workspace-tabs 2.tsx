"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export interface WorkspaceTab {
  id: string;
  label: string;
}

export interface WorkspaceTabsProps {
  tabs: WorkspaceTab[];
  defaultValue?: string;
  className?: string;
}

export function WorkspaceTabs({
  tabs,
  defaultValue,
  className,
}: WorkspaceTabsProps) {
  const initial = defaultValue ?? tabs[0]?.id;

  return (
    <Tabs defaultValue={initial} className={cn("w-full", className)}>
      <TabsList variant="line" className="h-auto w-full justify-start gap-6 border-b border-border bg-transparent p-0">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className="text-heading rounded-none px-0 pb-3 after:bg-primary data-active:text-foreground"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
