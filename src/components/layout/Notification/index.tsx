import React from "react";
import { Bell } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import { Button } from "../../ui/button";
import { BellIcon } from "@/icon";

export const Notifications = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            className="relative bg-[#E4E8FF] rounded-full w-10 h-10"
          >
            <BellIcon size={20} />
            <span className="absolute top-1.5 right-2 h-2 w-2 rounded-full bg-[#9281FF]"></span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">You have 4 unread notifications</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
