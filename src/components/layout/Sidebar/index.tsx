"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SidebarItem from "./SidebarItem";
import {
  ComplainCardIcon,
  FinancialIcon,
  KidIcon,
  MaintenanceIcon,
  MessageIcon,
  ShieldUserIcon,
  TruckIcon,
  NotificationIcon,
  GridLayoutIcon,
  LogoutIcon,
} from "@/icon";
import { LogOut } from "lucide-react";

const adminSidebar = [
  {
    icon: GridLayoutIcon,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: ShieldUserIcon,
    label: "Setup Configuration",
    children: [
      {
        label: "School Management",
        href: "/school-management",
      },
      {
        label: "Branch Management",
        href: "/branch-management",
      },
      {
        label: "Roles Management",
        href: "/role-management",
      },
      {
        label: "User Management",
        href: "/user-management",
      },
    ],
  },
  {
    icon: TruckIcon,
    label: "Van Management",
    children: [
      {
        label: "Packages Configuration",
        href: "/cms/packages-configuration",
      },
    ],
  },
  {
    icon: ComplainCardIcon,
    label: "Compliance Module",
    href: "/cms/admissions-attendance",
  },
  {
    icon: KidIcon,
    label: "Student Transportation",
    href: "/cms/built-in-curriculum",
  },
  {
    icon: MaintenanceIcon,
    label: "Maintenance Module",
    href: "/cms/maintenance-module",
  },
  {
    icon: FinancialIcon,
    label: "Financial Module",
    href: "/cms/financial-module",
  },
  {
    icon: MessageIcon,
    label: "Reporting & Analytics",
    href: "/cms/message-module",
  },
  {
    icon: NotificationIcon,
    label: "Notification System",
    href: "/cms/settings",
  },
];

const AppSidebar = () => {
  const router = useRouter();

  const handleLogout = () => {
    // dispatch(logoutAction());
    router.push("/login");
  };

  return (
    <>
      {/* For Desktop */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 bg-white transition-all duration-300 w-64 hidden md:flex flex-col`}
      >
        <div className="flex flex-col h-full">
          {/* Header - Fixed */}
          <div className="flex-shrink-0 p-6 pb-4">
            <div className="flex items-center gap-2 px-2.5 py-2">
              <div className="text-[#475467]">
                <Image
                  src="/images/logo.svg"
                  alt="logo"
                  width={38}
                  height={38}
                />
              </div>
              <h1 className="text-[#333333] text-lg font-extrabold italic uppercase">
                vancompli
              </h1>
            </div>
          </div>

          {/* Scrollable Menu */}
          <div className="flex-1 overflow-y-auto px-6 pb-4">
            <ul className="flex flex-col gap-2">
              {adminSidebar.map((item) => (
                <SidebarItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  children={item.children}
                />
              ))}
            </ul>
          </div>

          {/* Logout - Fixed at bottom */}
          <div className="flex-shrink-0 p-6 pt-0 border-t border-gray-100">
            <SidebarItem 
              icon={LogoutIcon} 
              label="Logout" 
              onClick={handleLogout} 
            />
          </div>
        </div>
      </aside>
    </>
  );
};

export default AppSidebar;
