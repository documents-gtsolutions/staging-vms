"use client";
import React from "react";
import { EditIcon, EyeOpenIcon, TrashIcon } from "@/icon";
import { Status } from "@/types";
import { useRouter } from "next/navigation";
import DataTable, { Column } from "@/components/common/DataTable";

const SchoolManagement = () => {
  const router = useRouter();
  // Mock branch data based on the image
  const data = Array(9)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      name: "Building Blocks Academy",
      branchCode: `BBA00${index + 1}`,
      type:
        index % 3 === 0
          ? "Primary"
          : index % 3 === 1
          ? "Secondary"
          : "Tertiary",
      city:
        index % 4 === 0
          ? "New York"
          : index % 4 === 1
          ? "Los Angeles"
          : index % 4 === 2
          ? "Chicago"
          : "Houston",
      capacity: `$${(1 + index * 0.1).toFixed(1)},200`,
      status: `active`,
    }));
  const columns: Column<(typeof data)[0]>[] = [
    {
      name: "School Name",
      key: "name",
      sortable: true,
      render: (row) => (
        <div className="text-sm font-medium text-gray-900">{row.name}</div>
      ),
    },
    { name: "Branch Code", key: "branchCode", sortable: true },
    { name: "Type", key: "type", sortable: true },
    { name: "City", key: "city", sortable: true },
    { name: "Capacity", key: "capacity", sortable: true },
    {
      name: "Status",
      key: "status",
      sortable: true,
      render: (row) => (
        <div
          className={` rounded-sm text-xs text-center ${
            row.status === Status.ACTIVE
              ? "bg-[#00B221]/10 border border-[#00B221]/20 text-[#00B221]"
              : "bg-[#FB3B2D]/10 border border-[#FB3B2D] text-[#FB3B2D]"
          } px-1.5 py-1.5`}
        >
          {row.status.slice(0, 1).toUpperCase() + row.status.slice(1)}
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
        buttonText="Add New School"
        buttonOnClick={() => router.push("/school-management/add")}
      />
      </div>
    </>
  );
};

export default SchoolManagement;
