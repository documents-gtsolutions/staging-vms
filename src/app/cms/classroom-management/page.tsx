"use client";
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
  UsersIcon,
} from "@/icon";
import { Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useMemo, useEffect } from "react";

const ClassroomManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const router = useRouter();
  // Mock classroom data based on the image
  const classroomsData = Array(10)
    .fill(null)
    .map((_, index) => ({
      id: `CR00${index + 1}`,
      name: "Sunshine Room",
      subtext: "Nursery",
      code: "SUN001",
      branch: "La Marque",
      capacity: 15,
      ageGroup: "2-4 years",
      teachers: ["Sarah", "Emily"],
      status: "Active",
      icon: "S",
    }));

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

  // Get sorted and filtered classrooms
  const classrooms = useMemo(() => {
    let sortableClassrooms = [...classroomsData];

    // Apply search filter
    if (searchTerm) {
      sortableClassrooms = sortableClassrooms.filter((classroom) => {
        return (
          classroom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          classroom.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          classroom.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
          classroom.ageGroup.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    // Apply sorting
    if (sortConfig.key) {
      sortableClassrooms.sort((a, b) => {
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

    return sortableClassrooms;
  }, [classroomsData, sortConfig, searchTerm]);

  // Handle delete classroom
  const handleDeleteClassroom = (id: string) => {
    // In a real app, you would call an API to delete the classroom
    alert(`Delete classroom with ID: ${id}`);
  };

  // Handle edit classroom
  const handleEditClassroom = (id: string) => {
    // In a real app, you would navigate to an edit page
    router.push(`/classroom-management/edit/${id}`);
  };

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentClassrooms = classrooms.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(classrooms.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <Heading
          title="Classroom Setup"
          backTo="/cms/dashboard"
          backToText="Back to Main Menu"
        />
        <Button onClick={() => router.push("/cms/classroom-management/add")}>
          <Plus size={16} />
          <span>Add New Classroom</span>
        </Button>
      </div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2.5">
          <div className="w-[250px] min-w-[250px] relative">
            <input
              type="text"
              placeholder="Search name, ID, age, etc"
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
            <thead className="bg-gray-50">
              <tr>
                {[
                  { name: "ID", key: "id", sortable: true },
                  { name: "Daycare Name", key: "name", sortable: true },
                  { name: "Code", key: "code", sortable: true },
                  { name: "Branch", key: "branch", sortable: true },
                  { name: "Capacity", key: "capacity", sortable: true },
                  { name: "Age Group", key: "ageGroup", sortable: true },
                  { name: "Teachers", key: "teachers", sortable: true },
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
              {currentClassrooms.map((classroom) => (
                <tr key={classroom.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {classroom.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-[#7752FF] rounded-full flex items-center justify-center text-white font-medium">
                        {classroom.icon}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {classroom.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {classroom.subtext}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {classroom.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {classroom.branch}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                    <UsersIcon size={20} />
                    {classroom.capacity}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-sm bg-purple-100 text-purple-800">
                      {classroom.ageGroup}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {classroom.teachers.map((teacher, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-sm bg-blue-100 text-blue-800"
                        >
                          {teacher}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-sm bg-green-100 text-green-800 items-center">
                      {classroom.status} <span className="ml-1">✓</span>
                    </span>
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
                        onClick={() => handleEditClassroom(classroom.id)}
                      >
                        <EditIcon size={18} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeleteClassroom(classroom.id)}
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
        users={classrooms}
        totalPages={totalPages}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default ClassroomManagement;
