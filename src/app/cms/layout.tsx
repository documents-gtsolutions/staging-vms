"use client";

import React from "react";
import AppSidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { useAppSelector } from "@/app/store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoadingSpinner } from "@/components/loading-spinner";
import { SidebarProvider, useSidebarContext } from "@/context/SidebarContext";
import Footer from "@/components/auth/Footer";

// Component that adjusts its width based on sidebar state
const MainContent = ({ children }: { children: React.ReactNode }) => {
  const { isCollapsed } = useSidebarContext();

  return (
    <div
      className={`w-[-webkit-fill-available] transition-all duration-300 bg-[#f9fafb] ${
        isCollapsed ? "md:ml-20" : "md:ml-64"
      } ml-0`}
    >
      {children}
    </div>
  );
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const path = usePathname();
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <React.Fragment>
      {path === "/cms" ? (
        
        <div>{children}</div>
      ) : (
        <SidebarProvider>
          <div className="flex">
            <AppSidebar />
            <MainContent>
              <Navbar />
              <main className="h-fit bg-[#f9fafb]">{children}</main>
              <Footer />
            </MainContent>
          </div>
        </SidebarProvider>
      )}
    </React.Fragment>
  );
}
