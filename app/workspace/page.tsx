import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { resolveDefaultBoardRedirect } from "@/features/workspace/services/queries";

export const metadata: Metadata = {
  title: "Workspace — KanbanIA",
  description: "Manage your Kanban boards",
};

export default async function WorkspaceIndexPage() {
  const target = await resolveDefaultBoardRedirect();

  if (target) {
    redirect(target);
  }

  redirect("/login");
}
