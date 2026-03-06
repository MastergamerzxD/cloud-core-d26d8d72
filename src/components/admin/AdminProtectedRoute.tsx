import { Navigate } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Loader2 } from "lucide-react";

export default function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading, needs2FA } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || (!isAdmin && !needs2FA)) {
    return <Navigate to="/admin/login" replace />;
  }

  if (needs2FA) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
