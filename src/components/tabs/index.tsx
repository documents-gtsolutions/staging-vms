import { InboxIcon } from "@/icon";
import React from "react";

interface TabsProps {
  icon?: React.ElementType;
  label: string;
  variant: "default" | "gradient";
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
}

const TabButton = ({
  icon: Icons,
  label,
  variant = "default",
  onClick,
  isActive = false,
  className,
}: TabsProps) => {
  // Use InboxIcon as fallback if no icon is provided
  const IconComponent = Icons || InboxIcon;

  return (
    <div
      onClick={onClick}
      className={`border border-gray-300 p-4 flex items-center gap-2 ${
        variant === "default" ? "xl:w-full w-fit" : "card-gradient w-full"
      } group rounded-md xl:text-nowrap text-wrap ${className}`}
    >
      <IconComponent
        size={20}
        className={`${
          variant === "default"
            ? "fill-[#98A2B3] group-hover:fill-purple-400"
            : "fill-gray-300 group-hover:fill-gray-300"
        } ${isActive ? variant === "default" ? "fill-purple-400" : "fill-gray-300" : ""}`}
      />
      <h4
        className={`${
          variant === "default"
            ? "text-sm text-gray-900 group-hover:text-purple-400 font-semibold"
            : "text-sm font-medium text-gray-950"
        } ${isActive ? variant === "default" ? "text-purple-400" : "text-gray-300" : ""}`}
      >
        {label}
      </h4>
    </div>
  );
};

export { TabButton };
