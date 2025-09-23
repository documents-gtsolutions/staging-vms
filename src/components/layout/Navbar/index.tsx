"use client";
import React from "react";
import { Notifications } from "../Notification";
import { UserProfile } from "../../user-profile";
import { useAppSelector } from "@/app/store";
import { Button } from "../../ui/button";
import { GearIcon } from "@/icon";
import HeaderTitle from "./components/HeaderTitle";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.auth);

  // Get user display name or fallback to email
  const displayName =
    user?.displayName || user?.email?.split("@")[0] || "Guest";

  return (
    <div className="flex items-center justify-between w-full px-4 pt-[22px] pb-[16px] bg-white">
      <div className="flex items-center gap-2">
        <HeaderTitle />
      </div>
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
