import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/features/auth/services/actions";
import { WorkspaceStartContent } from "@/features/workspace/components/workspace-start-content";
import { resolveDefaultBoardRedirect } from "@/features/workspace/services/queries";

export const metadata: Metadata = {
  title: "Workspace — KanbanIA",
  description: "Manage your Kanban boards",
};

export default async function WorkspaceIndexPage() {
  const [user, target] = await Promise.all([
    getCurrentUser(),
    resolveDefaultBoardRedirect(),
  ]);

  if (!user) {
    redirect("/login");
  }

  if (target) {
    redirect(target);
  }

  return <WorkspaceStartContent />;
}
