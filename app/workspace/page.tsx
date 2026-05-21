import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { DEFAULT_BOARD_ID } from "@/features/workspace/mocks";

export const metadata: Metadata = {
  title: "Workspace — KanbanIA",
  description: "Manage your Kanban boards",
};

export default function WorkspaceIndexPage() {
  redirect(`/workspace/${DEFAULT_BOARD_ID}`);
}
