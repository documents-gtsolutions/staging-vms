"use client";
import React from "react";
import { EditIcon, EyeOpenIcon, TrashIcon } from "@/icon";
import { Status } from "@/types";
import { useRouter } from "next/navigation";
import DataTable, { Column } from "@/components/common/DataTable";

const BranchManagement = () => {
  const router = useRouter();
  // Mock daycare data based on the image
  const data = Array(10)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      branchId: "BBA-P001",
      daycare: "Building Blocks Academy",
      branch: "Building Blocks Academy",
      daycareId: `BBA-P001`,
      date: "2028-09-20",
      time: "09:00 AM",
      ownerName: "Abdul Qadir Parekh",
      email: "info@buildingblocksacademy.net",
      phone: "+1 786-555-4432",
      status: "Active",
    }));
  const columns: Column<(typeof data)[0]>[] = [
    {
      name: "Branch ID",
      key: "branchId",
      sortable: true,
      render: (row) => (
        <span className="text-sm text-[#8B5CF6] font-normal">{row.branchId}</span>
      ),
    },
    {
      name: "daycare & branch name",
      key: "daycare&branch name",
      sortable: true,
      render: (row) => (
        <div className="text-sm text-gray-700">
          <div>{row.daycare}</div>
          <div className="text-xs text-gray-500">{row.branch}</div>
        </div>
      ),
    },
    {
      name: "Date",
      key: "date",
      sortable: true,
      render: (row) => (
        <div className="text-sm text-gray-700">
          <div>{row.date}</div>
          <div className="text-xs text-gray-500">{row.time}</div>
        </div>
      ),
    },
    {
      name: "Owner Name",
      key: "ownerName",
      sortable: true,
      render: (row) => (
        <span className="text-sm text-gray-700">{row.ownerName}</span>
      ),
    },
    {
      name: "Email & Phone Number",
      key: "email",
      sortable: true,
      render: (row) => (
        <div className="text-sm text-gray-700">
          <div>{row.email}</div>
          <div className="text-xs text-gray-500">{row.phone}</div>
        </div>
      ),
    },
    {
      name: "Status",
      key: "status",
      sortable: true,
      render: (row) => (
        <div
          className={`inline-flex items-center px-2.5 py-1 rounded-sm text-xs font-medium ring-1 ring-inset ${
            row.status.toLowerCase() === Status.ACTIVE
              ? "ring-[#9281FF] text-[#9281FF]"
              : "ring-[#FB3B2D] text-[#FB3B2D]"
          }`}
        >
          {row.status}
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="bg-white p-5 rounded-3xl">
      <DataTable
        columns={columns}
        data={data}
        itemsPerPage={10}
        actions={(row) => (
          <div className="flex space-x-2">
            <button onClick={() => {}}>
              <EyeOpenIcon size={22} color="#1683FF" />
            </button>
            <button
              className="text-green-600 hover:text-green-900"
              onClick={() => {}}
            >
              <EditIcon size={18} />
            </button>
            <button
              className="text-red-600 hover:text-red-900"
              onClick={() => {}}
            >
              <TrashIcon size={18} />
            </button>
          </div>
        )}
        buttonText="Add New Branch"
        buttonOnClick={() => router.push("/branch-management/add")}
      />
      </div>
    </>
  );
};

export default BranchManagement;
