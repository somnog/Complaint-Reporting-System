"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { getUser, isAuthenticated } from "../utils/auth";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login");  // Redirect to login if not authenticated
      return;
    }

    const user = getUser();

    if (!user || !allowedRoles.includes(user.role)) {
      router.replace("/unauthorized"); // Redirect to unauthorized page if role not allowed
      return;
    }
  }, [router, allowedRoles]);

  // While the redirect happens, avoid rendering protected content
  return <>{children}</>;
}
