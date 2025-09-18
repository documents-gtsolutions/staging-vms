"use client";
import Alert from "@/components/common/Alert";
import Heading from "@/components/common/Heading";
import Pagination from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  EditIcon,
  EyeOpenIcon,
  HouseLineIcon,
  TrashIcon,
} from "@/icon";
import { Status } from "@/types";
import { Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useMemo } from "react";

const RoleManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const router = useRouter();
  // Mock role data based on the image
  const rolesData = [
    {
      id: 1,
      schoolName: "Building Blocks Academy",
      branchName: "La Marque",
      roleName: "Super Admin",
      roleDescription: "Full control of the daycare system (boss role)",
      createdDate: "October 01, 2028",
      status: "active",
    },
    {
      id: 2,
      schoolName: "Building Blocks Academy",
      branchName: "La Marque",
      roleName: "Daycare Director",
      roleDescription: "Runs the daycare and manages staff",
      createdDate: "October 01, 2028",
      status: "active",
    },
    {
      id: 3,
      schoolName: "Building Blocks Academy",
      branchName: "La Marque",
      roleName: "Lead Teachers",
      roleDescription: "Teaches and takes care of kids",
      createdDate: "October 01, 2028",
      status: "active",
    },
    {
      id: 4,
      schoolName: "Building Blocks Academy",
      branchName: "La Marque",
      roleName: "Assistant Teachers",
      roleDescription: "Helps teacher and supports kids",
      createdDate: "October 01, 2028",
      status: "active",
    },
    {
      id: 5,
      schoolName: "Building Blocks Academy",
      branchName: "La Marque",
      roleName: "Front Desk Officer",
      roleDescription: "Talks to parents and keeps records",
      createdDate: "October 01, 2028",
      status: "active",
    },
    {
      id: 6,
      schoolName: "Building Blocks Academy",
      branchName: "La Marque",
      roleName: "Admin Officer",
      roleDescription: "Handles fees and bills",
      createdDate: "October 01, 2028",
      status: "active",
    },
  ];

  // State for sorting
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: "ascending" | "descending" | null;
  }>({
    key: null,
    direction: null,
  });

  // State for search
  const [searchTerm, setSearchTerm] = useState("");

  // Sorting function
  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Get sorted and filtered roles
  const roles = useMemo(() => {
    let sortableRoles = [...rolesData];

    // Apply search filter
    if (searchTerm) {
      sortableRoles = sortableRoles.filter((role) => {
        return (
          role.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          role.branchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          role.roleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          role.roleDescription.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    // Apply sorting
    if (sortConfig.key) {
      sortableRoles.sort((a, b) => {
        const key = sortConfig.key as keyof typeof a;
        if (a[key] < b[key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableRoles;
  }, [rolesData, sortConfig, searchTerm]);

  const handleDeleteRole = (id: number) => {
    // In a real app, you would call an API to delete the role
    alert(`Delete role with ID: ${id}`);
  };

  // Handle edit role
  const handleEditRole = (id: number) => {
    // In a real app, you would navigate to an edit page
    router.push(`/cms/role-management/edit/${id}`);
  };

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRoles = roles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(roles.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <Heading
          title="Role Management"
          backTo="/cms/dashboard"
          backToText="Back to Main Menu"
        />
        <Button onClick={() => router.push("/cms/role-management/add")}>
          <Plus size={16} />
          <span>Add New Role</span>
        </Button>
      </div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2.5">
          <div className="w-[250px] min-w-[250px] relative">
            <input
              type="text"
              placeholder="Search school, branch, role, description"
              className="bg-gray-200 w-full px-4 pl-10 py-2.5 rounded-sm border border-gray-200 text-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-[#842DF0]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Search size={16} className="text-gray-400" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <Button className="bg-[#00B221]">
            <Plus size={16} />
            <span>Export Excel</span>
          </Button>
          <Button className="bg-[#FB3B2D]">
            <Plus size={16} />
            <span>Export PDF</span>
          </Button>
          <Button>
            <Plus size={16} />
            <span>Import CSV</span>
          </Button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#F4F2FF]">
              <tr>
                {[
                  { name: "School Name", key: "schoolName", sortable: true },
                  { name: "Branch Name", key: "branchName", sortable: true },
                  { name: "Role Name", key: "roleName", sortable: true },
                  { name: "Role Description", key: "roleDescription", sortable: true },
                  { name: "Created Date", key: "createdDate", sortable: true },
                  { name: "Status", key: "status", sortable: true },
                  { name: "Actions", key: "actions", sortable: false },
                ].map((header) => (
                  <th
                    key={header.name}
                    scope="col"
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                      header.sortable ? "cursor-pointer" : ""
                    }`}
                    onClick={() => header.sortable && requestSort(header.key)}
                  >
                    <div className="flex items-center">
                      {header.name}
                      {header.sortable && (
                        <div className="flex flex-col items-center gap-0.5">
                          <ChevronUpIcon
                            size={6}
                            className={`ml-1 ${
                              sortConfig.key === header.key &&
                              sortConfig.direction === "ascending"
                                ? " stroke-gray-700"
                                : "stroke-gray-300"
                            }`}
                          />
                          <ChevronDownIcon
                            size={6}
                            className={`ml-1 ${
                              sortConfig.key === header.key &&
                              sortConfig.direction === "descending"
                                ? "stroke-gray-700"
                                : "stroke-gray-300"
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentRoles.map((role) => (
                <tr key={role.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-[#7752FF] text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">
                        <HouseLineIcon size={18} />
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {role.schoolName}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {role.branchName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {role.roleName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {role.roleDescription}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {role.createdDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className={` rounded-sm text-xs text-center ${role.status === Status.ACTIVE? "bg-[#00B221]/10 border border-[#00B221]/20 text-[#00B221]" : "bg-[#FB3B2D]/10 border border-[#FB3B2D] text-[#FB3B2D]"} px-1.5 py-1.5`}>{role.status.slice(0, 1).toUpperCase() + role.status.slice(1)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {}}
                      >
                        <EyeOpenIcon size={22} color="#1683FF"/>
                      </button>
                      <button
                        className="text-green-600 hover:text-green-900"
                        onClick={() => handleEditRole(role.id)}
                      >
                        <EditIcon size={18} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeleteRole(role.id)}
                      >
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
        users={roles}
        totalPages={totalPages}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default RoleManagement;
