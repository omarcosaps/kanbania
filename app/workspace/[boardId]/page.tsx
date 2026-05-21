import type { Metadata } from "next";

import { WorkspaceBoardSync } from "@/features/workspace/components/workspace-board-sync";
import { WorkspacePageContent } from "@/features/workspace/components/workspace-page-content";

export const metadata: Metadata = {
  title: "Workspace — KanbanIA",
  description: "Manage your Kanban boards",
};

interface WorkspaceBoardPageProps {
  params: Promise<{ boardId: string }>;
}

export default async function WorkspaceBoardPage({
  params,
}: WorkspaceBoardPageProps) {
  const { boardId } = await params;

  return (
    <>
      <WorkspaceBoardSync boardId={boardId} />
      <WorkspacePageContent />
    </>
  );
}
