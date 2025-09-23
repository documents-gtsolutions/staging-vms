"use client";
import React from "react";
import { EditIcon, EyeOpenIcon, TrashIcon } from "@/icon";
import { Status } from "@/types";
import { useRouter } from "next/navigation";
import DataTable, { Column } from "@/components/common/DataTable";
import { Shield } from "lucide-react";

const UserManagement = () => {
  const router = useRouter();
  // Mock user data based on the image
  const data = Array(10)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      name: "Andrew Forbist",
      userName: "andrew_forbist",
      daycareName: "Little Bo Peep Lawndale",
      branchName: "Evergreen",
      role: "Admin",
      date: "2028-09-20",
      time: "09:00 AM",
      status: "Active",
    }));
  const columns: Column<(typeof data)[0]>[] = [
    {
      name: "Name",
      key: "name",
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#8B5CF6] rounded-full flex items-center justify-center text-white text-sm font-medium">
            {row.name.charAt(0)}
          </div>
          <span className="text-sm font-normal text-[#0B0B13]">{row.name}</span>
        </div>
      ),
    },
    {
      name: "User Name",
      key: "userName",
      sortable: true,
      render: (row) => (
        <span className="text-sm text-gray-700">{row.userName}</span>
      ),
    },
    {
      name: "Daycare & Branch",
      key: "daycareName",
      sortable: true,
      render: (row) => (
        <div className="text-sm text-gray-700">
          <div>{row.daycareName}</div>
          <div className="text-xs text-gray-500">{row.branchName}</div>
        </div>
      ),
    },
    {
      name: "Role",
      key: "role",
      sortable: true,
      render: (row) => (
        <span className="text-sm text-[#8B5CF6]">{row.role}</span>
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
            <button>
              <Shield className="fill-[#F78E09] stroke-[#F78E09]" size={18} />
            </button>
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
        buttonText="Add New User"
        buttonOnClick={() => router.push("/user-management/add")}
      />
      </div>
    </>
  );
};

export default UserManagement;
