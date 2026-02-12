"use client";

import { useAuth } from "@/lib/auth/context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2, Shield } from "lucide-react";
import type { UserRole } from "@/types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole | UserRole[];
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sl-gray-50">
        <div className="text-center">
          <Shield className="mx-auto mb-3 h-10 w-10 text-sl-green-500" />
          <Loader2 className="mx-auto h-6 w-6 animate-spin text-sl-green-500" />
          <p className="mt-3 text-sm text-sl-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (requiredRole) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!roles.includes(user.role)) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-sl-gray-50">
          <div className="text-center">
            <Shield className="mx-auto mb-3 h-10 w-10 text-red-400" />
            <h2 className="text-lg font-bold text-sl-gray-900">Access Denied</h2>
            <p className="mt-1 text-sm text-sl-gray-500">
              You do not have permission to access this page.
            </p>
            <button
              onClick={() => router.push("/")}
              className="mt-4 rounded-lg bg-sl-green-500 px-5 py-2 text-sm font-semibold text-white hover:bg-sl-green-600"
            >
              Go to Home
            </button>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
}
