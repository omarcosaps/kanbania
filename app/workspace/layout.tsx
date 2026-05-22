import { WorkspaceAuthGuard } from "@/features/auth/components/workspace-auth-guard";
import { AuthProvider } from "@/features/auth/store";
import { WorkspaceProvider } from "@/features/workspace/store";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <WorkspaceAuthGuard>
        <WorkspaceProvider>{children}</WorkspaceProvider>
      </WorkspaceAuthGuard>
    </AuthProvider>
  );
}
