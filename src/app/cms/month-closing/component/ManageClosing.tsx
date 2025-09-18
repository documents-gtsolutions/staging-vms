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
  TrashIcon,
} from "@/icon";
import { Status } from "@/types";
import { Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useMemo, useEffect } from "react";

const ManageClosing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const router = useRouter();
  // Mock month closing data based on the image
  const monthClosingData = [
    {
      id: 1,
      closingId: "CLS-2024-001",
      school: "Building Blocks Academy (La Marque)",
      monthYear: "October 2024",
      students: 125,
      staff: 18,
      feeCollected: "$28,500",
      expenses: "$15,200",
      netBalance: "$8,450",
      status: "Approved",
    },
    {
      id: 2,
      closingId: "CLS-2024-002",
      school: "Building Blocks Academy (Bear Creek)",
      monthYear: "October 2024",
      students: 165,
      staff: 22,
      feeCollected: "$39,562",
      expenses: "$15,200",
      netBalance: "$8,450",
      status: "Locked",
    },
    {
      id: 3,
      closingId: "CLS-2024-003",
      school: "Building Blocks Academy (Hobby Airport)",
      monthYear: "October 2024",
      students: 125,
      staff: 18,
      feeCollected: "$28,500",
      expenses: "$15,200",
      netBalance: "$8,450",
      status: "Pending",
    },
    {
      id: 4,
      closingId: "CLS-2024-004",
      school: "Building Blocks Academy (Alvin)",
      monthYear: "October 2024",
      students: 125,
      staff: 18,
      feeCollected: "$28,500",
      expenses: "$15,200",
      netBalance: "$8,450",
      status: "Approved",
    },
    {
      id: 5,
      closingId: "CLS-2024-005",
      school: "Building Blocks Academy (Pasadena)",
      monthYear: "October 2024",
      students: 125,
      staff: 18,
      feeCollected: "$28,500",
      expenses: "$15,200",
      netBalance: "$8,450",
      status: "Pending",
    },
    {
      id: 6,
      closingId: "CLS-2024-006",
      school: "Building Blocks Academy (Aldine)",
      monthYear: "October 2024",
      students: 125,
      staff: 18,
      feeCollected: "$28,500",
      expenses: "$15,200",
      netBalance: "$8,450",
      status: "Pending",
    },
    {
      id: 7,
      closingId: "CLS-2024-007",
      school: "Building Blocks Academy (Friendswood)",
      monthYear: "October 2024",
      students: 125,
      staff: 18,
      feeCollected: "$28,500",
      expenses: "$15,200",
      netBalance: "$8,450",
      status: "Locked",
    },
    {
      id: 8,
      closingId: "CLS-2024-008",
      school: "Building Blocks Academy (Cypress)",
      monthYear: "October 2024",
      students: 125,
      staff: 18,
      feeCollected: "$28,500",
      expenses: "$15,200",
      netBalance: "$8,450",
      status: "Locked",
    },
    {
      id: 9,
      closingId: "CLS-2024-009",
      school: "Building Blocks Academy (VTM)",
      monthYear: "October 2024",
      students: 125,
      staff: 18,
      feeCollected: "$28,500",
      expenses: "$15,200",
      netBalance: "$8,450",
      status: "Approved",
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

  // State for checkbox selection
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // Sorting function
  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Get sorted and filtered month closings
  const monthClosings = useMemo(() => {
    let sortableClosings = [...monthClosingData];

    // Apply search filter
    if (searchTerm) {
      sortableClosings = sortableClosings.filter((closing) => {
        return (
          closing.closingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          closing.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
          closing.monthYear.toLowerCase().includes(searchTerm.toLowerCase()) ||
          closing.status.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    // Apply sorting
    if (sortConfig.key) {
      sortableClosings.sort((a, b) => {
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

    return sortableClosings;
  }, [monthClosingData, sortConfig, searchTerm]);

  // Handle row selection
  const handleSelectRow = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentClosings.map((closing) => closing.id));
    }
    setSelectAll(!selectAll);
  };

  // Handle delete month closing
  const handleDeleteClosing = (id: number) => {
    // In a real app, you would call an API to delete the month closing
    alert(`Delete month closing with ID: ${id}`);
  };

  // Handle edit month closing
  const handleEditClosing = (id: number) => {
    // In a real app, you would navigate to an edit page
    router.push(`/cms/month-closing/edit/${id}`);
  };

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentClosings = monthClosings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(monthClosings.length / itemsPerPage);

  // Check if all current page items are selected
  useEffect(() => {
    const allSelected =
      currentClosings.length > 0 &&
      currentClosings.every((closing) => selectedRows.includes(closing.id));
    setSelectAll(allSelected);
  }, [currentClosings, selectedRows]);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <>
      {/* Controls Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 lg:mb-8 gap-4">
        {/* Search */}
        <div className="flex items-center gap-2.5 w-full lg:w-auto">
          <div className="w-full lg:w-[250px] min-w-[250px] relative">
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

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto">
          <Button className="bg-[#00B221] w-full sm:w-auto">
            <Plus size={16} />
            <span>Export Excel</span>
          </Button>
          <Button className="bg-[#FB3B2D] w-full sm:w-auto">
            <Plus size={16} />
            <span>Export PDF</span>
          </Button>
          <Button className="w-full sm:w-auto">
            <Plus size={16} />
            <span>Import CSV</span>
          </Button>
        </div>
      </div>

      {/* Table Section with Horizontal Scroll */}
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-scroll custom-scrollbar">
          <div className="min-w-[1200px]">
            {" "}
            {/* Minimum width for table content */}
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-[#F4F2FF]">
                <tr>
                  {[
                    {
                      name: "Closing ID",
                      key: "closingId",
                      sortable: true,
                      minWidth: "120px",
                    },
                    {
                      name: "School (Branch)",
                      key: "school",
                      sortable: true,
                      minWidth: "250px",
                    },
                    {
                      name: "Month & Year",
                      key: "monthYear",
                      sortable: true,
                      minWidth: "130px",
                    },
                    {
                      name: "Students",
                      key: "students",
                      sortable: true,
                      minWidth: "100px",
                    },
                    {
                      name: "Staff",
                      key: "staff",
                      sortable: true,
                      minWidth: "80px",
                    },
                    {
                      name: "Fee Collected",
                      key: "feeCollected",
                      sortable: true,
                      minWidth: "120px",
                    },
                    {
                      name: "Expenses",
                      key: "expenses",
                      sortable: true,
                      minWidth: "100px",
                    },
                    {
                      name: "Net Balance",
                      key: "netBalance",
                      sortable: true,
                      minWidth: "120px",
                    },
                    {
                      name: "Status",
                      key: "status",
                      sortable: true,
                      minWidth: "100px",
                    },
                    {
                      name: "Actions",
                      key: "actions",
                      sortable: false,
                      minWidth: "120px",
                    },
                  ].map((header) => (
                    <th
                      key={header.name}
                      scope="col"
                      className={`px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap ${
                        header.sortable ? "cursor-pointer" : ""
                      }`}
                      style={{ minWidth: header.minWidth }}
                      onClick={() => header.sortable && requestSort(header.key)}
                    >
                      <div className="flex items-center">
                        {header.name}
                        {header.sortable && (
                          <div className="flex flex-col items-center gap-0.5 ml-1">
                            <ChevronUpIcon
                              size={6}
                              className={`${
                                sortConfig.key === header.key &&
                                sortConfig.direction === "ascending"
                                  ? "stroke-gray-700"
                                  : "stroke-gray-300"
                              }`}
                            />
                            <ChevronDownIcon
                              size={6}
                              className={`${
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
                {currentClosings.map((closing) => (
                  <tr key={closing.id} className="hover:bg-gray-50">
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {closing.closingId}
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-sm text-gray-900">
                      <div
                        className="max-w-[240px] truncate"
                        title={closing.school}
                      >
                        {closing.school}
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {closing.monthYear}
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {closing.students}
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {closing.staff}
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {closing.feeCollected}
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {closing.expenses}
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="text-green-600 font-medium">
                        {closing.netBalance}
                      </span>
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div
                        className={`rounded-sm text-xs text-center px-2 py-1 whitespace-nowrap ${
                          closing.status.toLowerCase() === Status.APPROVED
                            ? "bg-green-100 border border-green-200 text-green-800"
                            : closing.status.toLowerCase() === Status.LOCKED
                            ? "bg-red-100 border border-red-200 text-red-800"
                            : closing.status.toLowerCase() === Status.PENDING
                            ? "bg-yellow-100 border border-yellow-200 text-yellow-800"
                            : "bg-yellow-100 border border-yellow-200 text-yellow-800"
                        }`}
                      >
                        {closing.status}
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {}}
                          className="text-blue-600 hover:text-blue-900"
                          title="View"
                        >
                          <EyeOpenIcon size={18} color="#1683FF" />
                        </button>
                        <button
                          className="text-green-600 hover:text-green-900"
                          onClick={() => handleEditClosing(closing.id)}
                          title="Edit"
                        >
                          <EditIcon size={18} />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDeleteClosing(closing.id)}
                          title="Delete"
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
      </div>

      {/* Pagination */}
      <div className="mt-6">
        <Pagination
          indexOfFirstItem={indexOfFirstItem}
          indexOfLastItem={indexOfLastItem}
          users={monthClosings}
          totalPages={totalPages}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </>
  );
};

export default ManageClosing;
