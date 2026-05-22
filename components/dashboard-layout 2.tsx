import * as React from "react";

import { BoardToolbar } from "@/components/board-toolbar";
import { WorkspaceTabs, type WorkspaceTab } from "@/components/workspace-tabs";
import { cn } from "@/lib/utils";

export interface DashboardLayoutProps {
  boardTitle: string;
  tabs?: WorkspaceTab[];
  toolbar?: React.ReactNode;
  header?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onNewTask?: () => void;
}

const DEFAULT_TABS: WorkspaceTab[] = [
  { id: "roadmap", label: "Roadmap Q3" },
  { id: "sprint", label: "Sprint 24" },
];

export function DashboardLayout({
  boardTitle,
  tabs = DEFAULT_TABS,
  toolbar,
  header,
  children,
  className,
  onNewTask,
}: DashboardLayoutProps) {
  return (
    <div className={cn("flex min-h-full flex-col bg-background", className)}>
      {header ?? (
        <header className="border-b border-border bg-card px-4 py-3 sm:px-8">
          <WorkspaceTabs tabs={tabs} defaultValue={tabs[0]?.id} />
        </header>
      )}
      <main className="flex flex-1 flex-col gap-6 p-4 sm:p-8">
        {toolbar ?? <BoardToolbar title={boardTitle} onNewTask={onNewTask} />}
        {children}
      </main>
    </div>
  );
}
