import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import React from "react";

interface HeadingProps {
  title: string;
  backTo?: string;
  backToText?: string;
}

const Heading = ({ title, backTo, backToText }: HeadingProps) => {
  return (
    <div className="flex flex-col items-start">
      {backTo && backToText && (
      <Link
        href={backTo || "#"}
        className="text-[#6D6D71] text-xs flex items-center gap-2 mb-1"
      >
        <ArrowLeft size={16} className="text-[#6D6D71]" /> {backToText}
      </Link>
      )}
      <h1 className="text-[22px] font-bold text-[#0B0B13] leading-[120%]">{title}</h1>
    </div>
  );
};

export default Heading;
