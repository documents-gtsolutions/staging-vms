"use client";
import React from "react";
import { Notifications } from "../Notification";
import { UserProfile } from "../../user-profile";
import { useAppSelector } from "@/app/store";
import { Button } from "../../ui/button";
import { GearIcon } from "@/icon";
import Heading from "@/components/common/Heading";
import { usePathname } from "next/navigation";

const HeadingTitle = [
  {
    pathname: "/",
    title: "Dashboard",
  },
  {
    pathname: "/school-management",
    title: "School Management"
  },
  {
    pathname: "/school-management/add",
    title: "School Management",
    backTo: "/school-management",
    backToText: "Back to School Management",
  },
  {
    pathname: '/branch-management',
    title: 'Branch Management'
  },
  {
    pathname: '/branch-management/add',
    title: 'Branch Management',
    backTo: '/branch-management',
    backToText: 'Back to Branch Management',
  },
  {
    pathname: '/role-management',
    title: 'Role Management'
  },
  {
    pathname: '/role-management/add',
    title: 'Role Management',
    backTo: '/role-management',
    backToText: 'Back to Role Management',
  },
  {
    pathname: '/user-management',
    title: 'User Management'
  },
  {
    pathname: '/user-management/add',
    title: 'User Management',
    backTo: '/user-management',
    backToText: 'Back to User Management',
  },
  {
    pathname: '/user-management/'
  }
];
const Navbar = () => {
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.auth);

  // Get user display name or fallback to email
  const displayName =
    user?.displayName || user?.email?.split("@")[0] || "Guest";

  const headingTitle = HeadingTitle.find((item) => item.pathname === pathname);

  return (
    <div className="flex items-center justify-between w-full px-4 pt-[22px] pb-[16px] bg-white">
      <Heading
        title={headingTitle?.title || "Dashboard"}
        backTo={headingTitle?.backTo || ""}
        backToText={headingTitle?.backToText || ""}
      />
      <div className="flex items-center gap-4">
        <Button size="icon" className="bg-[#E4E8FF] rounded-full w-10 h-10">
          <GearIcon size={20} />
        </Button>
        <Notifications />
        <UserProfile
          name={displayName}
          status="Online"
          avatarUrl={user?.photoURL || undefined}
        />
      </div>
    </div>
  );
};

export default Navbar;
