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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { user, loading } = useAppSelector((state) => state.auth);
  // const router = useRouter();
  const path = usePathname();
  // useEffect(() => {
  //   if (!loading && !user) {
  //     router.push("/login");
  //   }
  // }, [user, loading, router]);

  // if (loading) {
  //   return <LoadingSpinner />;
  // }

  // if (!user) {
  //   return null; // Will redirect in useEffect
  // }

  return (
    <div className="w-full min-h-screen bg-white">
      {path === "/cms" ? (
        <div className="h-full">{children}</div>
      ) : (
        <SidebarProvider>
          <AppSidebar />
          <div className="min-h-screen transition-all duration-300 bg-white md:ml-64 ml-0 flex flex-col">
            <div className="flex-1 mr-6">
              <Navbar />
              <main className="min-h-[calc(100vh-80px)] bg-[#F5F5F6] rounded-3xl p-5">
                {children}
              </main>
            </div>
            <Footer />
          </div>
        </SidebarProvider>
      )}
    </div>
  );
}
