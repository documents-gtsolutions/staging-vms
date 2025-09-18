"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/store";
import { LoadingSpinner } from "./loading-spinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
  redirectTo?: string;
}

export const ProtectedRoute = ({
  children,
  allowedRoles,
  redirectTo = "/login",
}: ProtectedRouteProps) => {
  const { user, userRole, loading } = useAppSelector(state => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // If not authenticated, redirect to login
      if (!user) {
        router.push(redirectTo);
      } 
      // If authenticated but not authorized for this role
      else if (userRole && !allowedRoles.includes(String(userRole))) {
        router.push("/unauthorized");
      }
    }
  }, [user, userRole, loading, router, allowedRoles, redirectTo]);

  // Show loading state while checking authentication
  console.log(loading,user,userRole,allowedRoles)
  if (loading || !user || (userRole && !allowedRoles.includes(String(userRole)))) {
    return <LoadingSpinner />;
  }

  // If user is authenticated and authorized, render children
  return <>{children}</>;
}; 