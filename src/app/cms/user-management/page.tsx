"use client";
import Alert from "@/components/common/Alert";
import Heading from "@/components/common/Heading";
import Pagination from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
import { EditIcon, EyeOpenIcon, GalleryIcon, TrashIcon } from "@/icon";
import { Status } from "@/types";
import { Plus, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UserManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const router = useRouter();
  // Mock user data based on the image
  const users = Array(50)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      name: "Abdul Qadir Parekh",
      username: "Abdul Qadir Parekh",
      school: "Little Bo Peep Lawndale",
      branch: "Evergreen",
      role: "Admin",
      status: "active",
    }));

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <Heading
          title="User Management"
          backTo="/cms/dashboard"
          backToText="Back to Main Menu"
        />
        <Button onClick={() => router.push("/cms/user-management/add")}>
          <Plus size={16} />
          <span>Add New User</span>
        </Button>
      </div>
      <div className="mb-8">
        <Alert
          title="User Limit Information  "
          description="Building Blocks Academy can have up to "
          bold="9 users."
          button1="Current users: 5"
          button2="Remaining slots: 4"
        />
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                {[
                  "Name",
                  "Username",
                  "School",
                  "Branch",
                  "Role",
                  "Status",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <GalleryIcon size={18} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.school}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.branch}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-green-800">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={` rounded-sm text-xs text-center ${
                        user.status === Status.ACTIVE
                          ? "bg-[#00B221]/10 border border-[#00B221]/20 text-[#00B221]"
                          : "bg-[#FB3B2D]/10 border border-[#FB3B2D] text-[#FB3B2D]"
                      } px-1.5 py-1.5`}
                    >
                      {user.status.slice(0, 1).toUpperCase() +
                        user.status.slice(1)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button >
                        <Shield className="fill-[#F78E09] stroke-[#F78E09]" size={18} />
                      </button>
                      <button
                        onClick={() => {}}
                      >
                        <EyeOpenIcon size={22} color="#1683FF"/>
                      </button>
                      <button className="text-green-600 hover:text-green-900/80">
                        <EditIcon size={18} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <TrashIcon size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}
      <Pagination
        indexOfFirstItem={indexOfFirstItem}
        indexOfLastItem={indexOfLastItem}
        users={users}
        totalPages={totalPages}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default UserManagement;
