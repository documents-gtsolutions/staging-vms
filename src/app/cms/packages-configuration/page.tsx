"use client";
import React from "react";
import Heading from "@/components/common/Heading";
import { Button } from "@/components/ui/button";
import {  Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import Package from "./components/Package";

const PackageConfigration = () => {
  const router = useRouter();
  const data = [
    {
      id: "1",
      title: "Basic Package",
      totalCompanies: "1",
      features: [
        { title: "Package Configuration Controls" }, 
        { title: "Package Configuration Controls" },
        { title: "Location Coding Controls" },
        { title: "Roles Controls" },
        { title: "And More.." }
      ],
    },
    {
      id: "2",
      title: "Standard Package",
      totalCompanies: "2",
      features: [
        { title: "Package Configuration Controls" }, 
        { title: "Package Configuration Controls" },
        { title: "Location Coding Controls" },
        { title: "Roles Controls" },
        { title: "And More.." }
      ],
    },
    {
      id: "3",
      title: "Premium Package",
      totalCompanies: "3",
      features: [
        { title: "Package Configuration Controls" }, 
        { title: "Package Configuration Controls" },
        { title: "Location Coding Controls" },
        { title: "Roles Controls" },
        { title: "And More.." }
      ],
    },
  ];
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <Heading
          title="Packages List"
          backTo="/cms/dashboard"
          backToText="Back to Main Menu"
        />
        <Button onClick={() => router.push("/cms/packages-configuration/add")}>
          <Plus size={16} />
          <span>Add New Package</span>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <Package key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default PackageConfigration;
