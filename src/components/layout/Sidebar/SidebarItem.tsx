"use client";
import { Minus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { SvgProps } from "@/types";
import { ChevronRightIcon } from "@/icon";

interface SidebarItemProps {
  href?: string;
  icon: React.ComponentType<SvgProps>;
  label: string;
  children?: {
    label: string;
    href: string;
  }[];
  onClick?: () => void;
}

const SidebarItem = ({
  href,
  icon: Icon,
  label,
  children,
  onClick,
}: SidebarItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const isActiveChild = children?.some((child) => pathname === child.href);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    onClick?.();
  };
  return (
    <li className="group">
      <Link
        onClick={handleClick || onClick}
        href={href || "#"}
        className={cn(
          "flex items-center justify-between gap-x-3 text-[#757575] text-sm bg-white group-hover:text-[#fff] group-hover:font-medium group-hover:bg-[#9281FF] px-2.5 py-2 w-full rounded-md",
          isActive && "text-[#fff] font-medium bg-[#9281FF]",
          isActiveChild && "font-medium bg-[#9281FF] text-[#fff]"
        )}
      >
        <div className="flex items-center gap-x-3">
          <Icon
            size={22}
            className={`fill-[#757575] group-hover:fill-[#fff] ${
              isActive && "fill-[#fff]"
            }
            ${isActiveChild && "fill-[#fff]"}
            `}
          />
          <span className="text-nowrap">{label}</span>
        </div>
        {children && (
          <ChevronRightIcon
            size={8}
            className={`fill-[#475467] ${isActive && "fill-[#fff]"} ${isActiveChild && "fill-[#fff]"} ${
              isOpen ? "rotate-90" : ""
            } transition-all duration-300`}
          />
        )}
      </Link>
      {children && isOpen && (
        <div className="flex flex-col">
          {children.map((child) => (
            <Link
              href={child.href}
              key={child.label}
              className={cn( `flex items-center text-[#475467] text-sm bg-white px-2 py-2.5 w-full text-nowrap hover:text-[#7752FF] hover:font-medium hover:bg-[#F4F2FF]`, pathname === child.href && "text-[#7752FF] font-medium bg-[#F4F2FF]" )}
            >
              <span>
                <Minus
                  size={16}
                  className={`${
                    pathname === child.href
                      ? "text-[#7752FF]"
                      : "text-[#475467]"
                  } `}
                />
              </span>
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </li>
  );
};

export default SidebarItem;
