import { getCurrentUser } from "@/features/auth/services/actions";
import { WorkspaceAuthGuard } from "@/features/auth/components/workspace-auth-guard";
import { AuthProvider } from "@/features/auth/store";
import { fetchWorkspaceState } from "@/features/workspace/services/queries";
import { WorkspaceProvider } from "@/features/workspace/store";

export default async function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, { state: initialWorkspaceState }] = await Promise.all([
    getCurrentUser(),
    fetchWorkspaceState(),
  ]);

  return (
    <AuthProvider initialUser={user}>
      <WorkspaceAuthGuard>
        <WorkspaceProvider initialState={initialWorkspaceState}>
          {children}
        </WorkspaceProvider>
      </WorkspaceAuthGuard>
    </AuthProvider>
  );
}
