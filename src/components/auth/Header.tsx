import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <div className="bg-[#FCFCFC] w-full py-5 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/images/logo.svg" alt="logo" width={32} height={32} />
          <h1 className="text-[#101828] text-lg font-bold">CMSC System</h1>
        </div>
        <Button>Request Demo</Button>
      </div>
    </div>
  );
};

export default Header;
