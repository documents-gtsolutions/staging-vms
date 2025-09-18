"use client";
import Heading from "@/components/common/Heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import ManageClosing from "./component/ManageClosing";
import { useRouter } from "next/navigation";
import Report from "./component/Report";

type Tab = "manage" | "report";

const MonthClosing = () => {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("manage");
  return (
    <div className="p-4 lg:p-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-5 gap-4">
        <Heading
          title="Manage Month Closings"
          backTo="/cms/dashboard"
          backToText="Back to Main Menu"
        />
        <Button
          onClick={() => router.push("/cms/month-closing/add")}
          className="w-full sm:w-auto"
        >
          <Plus size={16} />
          <span>New Month Closing</span>
        </Button>
      </div>
      <div className="mb-6 border-b">
        <div className="flex space-x-8">
          <TabButton label="Manage Closings" onClick={() => setTab("manage")} isActive={tab === "manage"} />
          <TabButton label="Reports" onClick={() => setTab("report")} isActive={tab === "report"} />
        </div>
      </div>
      {tab === "manage" && <ManageClosing />}
      {tab === "report" && <Report />}
    </div>
  );
};

const TabButton = ({ label, onClick, isActive }: { label: string, onClick: () => void, isActive: boolean }) => {
  return (
    <button
      onClick={onClick}
      className={`py-4 px-10 relative ${
        isActive
          ? "text-indigo-600 font-medium border-b-2 border-indigo-600"
          : "text-gray-500 hover:text-gray-700"
      }`}
    >
      {label}
    </button>
  );
};

export default MonthClosing;
