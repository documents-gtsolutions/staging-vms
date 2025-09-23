"use client";
import React from "react";
import { EditIcon, EyeOpenIcon, TrashIcon } from "@/icon";
import { Status } from "@/types";
import { useRouter } from "next/navigation";
import DataTable, { Column } from "@/components/common/DataTable";

const RoleManagement = () => {
  const router = useRouter();
  // Mock role data based on the image
  const data = Array(10)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      roleId: "BBA-P001",
      roleName: "Super Admin",
      daycareName: "La Marque",
      branchName: "Building Blocks Academy",
      roleDescription: "Full control of the daycare system",
      status: "Active",
    }));
  const columns: Column<(typeof data)[0]>[] = [
    {
      name: "Role ID",
      key: "roleId",
      sortable: true,
      render: (row) => (
        <span className="text-sm text-[#8B5CF6] font-normal">{row.roleId}</span>
      ),
    },
    {
      name: "Role Name",
      key: "roleName",
      sortable: true,
      render: (row) => (
        <span className="text-sm font-medium text-gray-900">{row.roleName}</span>
      ),
    },
    {
      name: "Daycare & Branch Name",
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
      name: "Role Description",
      key: "roleDescription",
      sortable: true,
      render: (row) => (
        <span className="text-sm text-gray-700">{row.roleDescription}</span>
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
        buttonText="Add New Role"
        buttonOnClick={() => router.push("/role-management/add")}
      />
      </div>
    </>
  );
};

export default RoleManagement;
