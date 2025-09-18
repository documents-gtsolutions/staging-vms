"use client";

import React from "react";
import {
  School,
  BookOpen,
  Users,
  LayoutDashboard,
  LucideIcon,
  Shuffle,
  Building2,
  Fingerprint,
  Handshake,
  MessageCircle,
  LayoutGrid,
  BarChart2,
  Cookie,
  HelpCircle,
  Settings,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { logout as logoutAction } from "@/app/store/slices/authSlice";
import Image from "next/image";
import SidebarItem from "./SidebarItem";
import { useSidebarContext } from "@/context/SidebarContext";
import { UserRole } from "@/types";

const adminSidebar = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/cms/dashboard",
  },
  {
    icon: School,
    label: "Setup Configuration",
    children: [
      {
        label: "Packages Configuration",
        href: "/cms/packages-configuration",
      },
      {
        label: "User Management",
        href: "/cms/user-management",
      },
      {
        label: "Roles Management",
        href: "/cms/role-management",
      },
      {
        label: "School Management",
        href: "/cms/school-management",
      },
      {
        label: "Branch Management",
        href: "/cms/branch-management",
      },
      {
        label: "Classroom Setup",
        href: "/cms/classroom-management",
      },
      {
        label: "Month Closing",
        href: "/cms/month-closing",
      },
      {
        label: "Month Un-Closing",
        href: "/cms/month-un-closing",
      },
    ],
  },
  {
    icon: Users,
    label: "Log Reports",
    href: "/cms/admissions-attendance",
  },
  {
    icon: BookOpen,
    label: "Backup",
    href: "/cms/built-in-curriculum",
  },
];

const studentSidebar = (onLogout: () => void) => [
  {
    icon: LayoutDashboard,
    label: "Home",
    href: "/cms/dashboard",
  },
  {
    icon: Building2,
    label: "My School",
    children: [
      {
        label: "Classroom management",
        href: "/cms/classroom-management",
      },
      {
        label: "Admissions & attendance",
        href: "/cms/admissions-attendance",
      },
      {
        label: "Built-in curriculum",
        href: "/cms/built-in-curriculum",
      },
      {
        label: "Health checks",
        href: "/cms/health-checks",
      },
      {
        label: "Students",
        href: "/cms/students",
      },
      {
        label: "Parents",
        href: "/cms/parent",
      },
      {
        label: "Monitor child-staff ratio",
        href: "/cms/monitor-ratio",
      },
      {
        label: "Settings",
        href: "/cms/settings",
      },
    ],
  },
  {
    icon: Fingerprint,
    label: "Attendance",
    href: "/cms/attendance",
  },
  {
    icon: Handshake,
    label: "Billing & payments",
    href: "/cms/billing",
  },
  {
    icon: LayoutGrid,
    label: "Classroom",
    href: "/cms/classroom",
  },
  {
    icon: BookOpen,
    label: "Curriculum & learning",
    href: "/cms/curriculum-learning",
  },
  {
    icon: MessageCircle,
    label: "Communication",
    href: "/cms/communication",
  },
  {
    icon: Users,
    label: "Staff management",
    href: "/cms/staff",
  },
  {
    icon: BarChart2,
    label: "Reports & analytics",
    href: "/cms/reports",
  },
  {
    icon: Cookie,
    label: "Food program",
    children: [
      {
        label: "Meal plans",
        href: "/cms/food-program/meal-plans",
      },
    ],
  },
  {
    icon: HelpCircle,
    label: "Support",
    href: "/cms/support",
  },
  {
    icon: Settings,
    label: "Setting",
    href: "/cms/setting",
  },
  {
    icon: LogOut,
    label: "Sign out",
    onClick: onLogout,
  },
];

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  hasSubItems?: boolean;
  isExpanded?: boolean;
  onClick?: () => void;
  href?: string;
}

const AppSidebar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const role = useAppSelector((state) => state.auth.userRole);
  const { isCollapsed, toggleSidebar } = useSidebarContext();

  const handleLogout = () => {
    dispatch(logoutAction());
    router.push("/login");
  };

  const sidebarItems =
    role === UserRole.ADMIN ? adminSidebar : studentSidebar(handleLogout);

  return (
    <>
      {/* For Desktop */}
      <aside
        className={`
      fixed top-0 left-0 bottom-0 z-40 bg-white shadow-lg
      transition-all duration-300
      ${isCollapsed ? "w-20" : "w-64"}
      hidden md:flex flex-col
    `}
      >
        <div
          className="absolute top-7 -right-3.5 w-7 h-7 bg-gray-100 z-50 rounded-lg cursor-pointer p-2"
          onClick={toggleSidebar}
        >
          <div className="flex items-center justify-center h-full">
            <ChevronLeft
              size={12}
              className={`transition-transform duration-300 ${
                isCollapsed ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
        {/* Sidebar header */}
        <div className="py-4 px-2">
          <div className="flex items-center justify-center gap-2 p-2">
            <div className="text-[#475467]">
              <Image src="/images/logo.svg" alt="logo" width={38} height={38} />
            </div>
            {!isCollapsed && (
              <h1 className="text-[#101828] text-lg font-bold">CMSC System</h1>
            )}
          </div>
          <div className={`${isCollapsed ? "px-2" : "p-4"}`}>
            <ul className="flex flex-col gap-2">
              {adminSidebar.map((item) => (
                <SidebarItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  children={item.children}
                  isCollapsed={isCollapsed}
                />
              ))}
            </ul>
          </div>
        </div>

        {/* Workplace card */}
        <div className="p-3">
          <div className="bg-[#9F57FC] rounded-xl p-3">
            {!isCollapsed ? (
              <>
                <div className="text-[white] font-medium text-sm">
                  Work Place
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-[white] text-opacity-80 text-xs truncate w-[180px]">
                    Building Blocks Academy Location
                  </div>
                  <Shuffle size={16} color="white" />
                </div>
              </>
            ) : (
              <div className="flex justify-center">
                <Shuffle size={16} color="white" />
              </div>
            )}
          </div>
        </div>
      </aside>
      {/* For Mobile */}
      <aside
        className={`
    fixed inset-0 z-50 bg-black bg-opacity-40
    md:hidden ${isCollapsed ? "hidden" : "block"}
  `}
      >
        <div className="w-64 bg-white h-full p-4">{/* sidebar content */}</div>
      </aside>
    </>
  );
};

export default AppSidebar;
