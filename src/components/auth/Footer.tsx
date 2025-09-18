import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from "@/icon";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="mt-auto py-4">
      <div className="max-w-[2520px] mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <div className="flex flex-row gap-x-4 items-center text-[#6E6F78] font-semibold">
          Copyright © 2023 CMSC AI System
          <div className="flex gap-4 mt-2 md:mt-0 text-[#A9AAAF]">
            <Link href="/">Privacy Policy</Link>
            <Link href="/">Term and conditions</Link>
            <Link href="/">Contact</Link>
          </div>
        </div>
        <div className="flex gap-3 mt-2 md:mt-0">
          <Link href="/">
            <FacebookIcon size={20} />  
          </Link>
          <Link href="/">
            <TwitterIcon size={20} />
          </Link>
          <Link href="/">
            <InstagramIcon size={20} />
          </Link>
          <Link href="/">
            <YoutubeIcon size={20} />
          </Link>
          <Link href="/">
            <LinkedinIcon size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
