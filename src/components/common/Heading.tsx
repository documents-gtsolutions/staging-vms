import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import React from "react";

interface HeadingProps {
  title: string;
  backTo: string;
  backToText: string;
}

const Heading = ({ title, backTo, backToText }: HeadingProps) => {
  return (
    <div>
      <Link
        href={backTo}
        className="text-gray-600 text-base flex items-center gap-2 mb-1"
      >
        <ChevronLeft size={16} className="text-gray-600" /> {backToText}
      </Link>
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
    </div>
  );
};

export default Heading;
