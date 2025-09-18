import { InfoIcon } from "lucide-react";
import React from "react";
interface AlertProps {
  title: string;
  description: string;
  bold?: string;
  button1?: string;
  button2?: string;
}
const Alert = ({ title, description, bold, button1, button2 }: AlertProps) => {
  return (
    <div className="bg-[#EAE8FF] border border-[#7752FF] p-4 rounded-md mt-6 cursor-pointer">
      <div className="flex flex-col items-start gap-2">
        <div className="flex items-center gap-2">
          <InfoIcon size={14} color="#7752FF" />
          <h3 className="text-sm font-bold text-[#7752FF]">{title}</h3>
        </div>
        <div className="flex items-center gap-4">
        <p className="text-sm text-[#7752FF]">
          {description} {bold && <span className="font-bold">{bold}</span>}
        </p>
        {button1 && <div className="text-sm text-[#7752FF]  bg-[#7752FF]/10 font-medium p-1.5 rounded-md border border-[#7752FF]/20">{button1}</div>}
        {button2 && <div className="text-sm text-[#FB3B2D] font-medium p-1.5 rounded-md border bg-[#FB3B2D]/10 border-[#FB3B2D]/20">{button2}</div>}
        </div>
      </div>
    </div>
  );
};

export default Alert;
