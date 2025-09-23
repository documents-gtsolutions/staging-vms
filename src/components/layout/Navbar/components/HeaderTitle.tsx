import { usePathname } from "next/navigation";
import React from "react";

const HeaderTitle = () => {
    const pathname = usePathname();
    switch (pathname) {
        case "/":
            return <h1 className="text-[#101828] text-xl font-bold">Dashboard</h1>;
        case "/school-management":
            return <h1 className="text-[#101828] text-xl font-bold">School Management</h1>;
        default:
            return <h1 className="text-[#101828] text-xl font-bold">Dashboard</h1>;
    }
};

export default HeaderTitle;
