import { Button } from "@/components/ui/button";
import { CircleDollarSign, FileText, RotateCw } from "lucide-react";
import React from "react";
import { NotificationType } from "@/types";
import { UserIcon } from "@/icon";

interface NotificationItemProps {
  data: {
    type: NotificationType;
    title: string;
    subtitle: string;
    time: string;
  };
}

const NotificationItem = ({ data }: NotificationItemProps) => {
  const renderIcon = () => {
    switch (data.type) {
      case NotificationType.UPDATE:
        return <RotateCw size={16} color="#7752FF" />;
      case NotificationType.ENROLLMENT:
        return <UserIcon size={16} color="#7752FF" />;
      case NotificationType.PAYMENT:
        return <CircleDollarSign size={16} color="#7752FF" />;
      case NotificationType.MESSAGE:
        return <FileText size={16} color="#7752FF" />;
      default:
        return <RotateCw size={16} color="#7752FF" />;
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button size="icon" className="w-11 h-11 bg-[#E4EBF3] hover:bg-[#E4EBF3]">
        {renderIcon()}
      </Button>
      <div>
        <h1 className="text-sm font-semibold text-black mb-1">
          {data.title}{" "}
          <span className="text-[#6E6F78] font-normal">- {data.subtitle}</span>
        </h1>
        <p className="text-xs text-[#6E6F78]">{data.time}</p>
      </div>
    </div>
  );
};

export default NotificationItem;
