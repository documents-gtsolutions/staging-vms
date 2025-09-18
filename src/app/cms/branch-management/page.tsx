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
  GalleryIcon,
  HouseLineIcon,
  SlidersHorizontalIcon,
  TrashIcon,
} from "@/icon";
import { Status } from "@/types";
import {
  ChevronDown,
  ChevronUp,
  FilterIcon,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useMemo, useEffect } from "react";

const BranchManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const router = useRouter();
  // Mock branch data based on the image
  const branchesData = Array(9)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      name: "Building Blocks Academy",
      branchCode: `BBA00${index + 1}`,
      type: index % 3 === 0 ? "Primary" : index % 3 === 1 ? "Secondary" : "Tertiary",
      city: index % 4 === 0 ? "New York" : index % 4 === 1 ? "Los Angeles" : index % 4 === 2 ? "Chicago" : "Houston",
      capacity: `$${(1 + index * 0.1).toFixed(1)},200`,
      status: index % 2 === 0 ? Status.ACTIVE : Status.INACTIVE,
    }));
    
  // State for sorting
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: 'ascending' | 'descending' | null;
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
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  // Get sorted and filtered branches
  const branches = useMemo(() => {
    let sortableBranches = [...branchesData];
    
    // Apply search filter
    if (searchTerm) {
      sortableBranches = sortableBranches.filter((branch) => {
        return (
          branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          branch.branchCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
          branch.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          branch.city.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }
    
    // Apply sorting
    if (sortConfig.key) {
      sortableBranches.sort((a, b) => {
        const key = sortConfig.key as keyof typeof a;
        if (a[key] < b[key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return sortableBranches;
  }, [branchesData, sortConfig, searchTerm]);
  
  // Handle row selection
  const handleSelectRow = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };
  
  // Handle select all
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentBranches.map(branch => branch.id));
    }
    setSelectAll(!selectAll);
  };
  
  // Handle delete branch
  const handleDeleteBranch = (id: number) => {
    // In a real app, you would call an API to delete the branch
    alert(`Delete branch with ID: ${id}`);
  };
  
  // Handle edit branch
  const handleEditBranch = (id: number) => {
    // In a real app, you would navigate to an edit page
    router.push(`/branch-management/edit/${id}`);
  };

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBranches = branches.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(branches.length / itemsPerPage);
  
  // Check if all current page items are selected
  useEffect(() => {
    const allSelected = currentBranches.length > 0 && 
      currentBranches.every(branch => selectedRows.includes(branch.id));
    setSelectAll(allSelected);
  }, [currentBranches, selectedRows]);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <Heading
          title="Branch Management"
          backTo="/cms/dashboard"
          backToText="Back to Main Menu"
        />
        <Button onClick={() => router.push("/cms/branch-management/add")}>
          <Plus size={16} />
          <span>Add Branch Management</span>
        </Button>
      </div>
      <div className="mb-8">
        <Alert
          title="Branch Limit Information  "
          description="Building Blocks Academy can have up to "
          bold="11 Branchs."
          button1="Current Branch: 7"
          button2="Remaining slots: 4"
        />
      </div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2.5">
          <div className="w-[250px] min-w-[250px] relative">
            <input
              type="text"
              placeholder="Search name, code, type, city"
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
          <Button >
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
                <th scope="col" className="px-4 py-3 w-10">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 text-indigo-600 rounded border-gray-300" 
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                {[
                  { name: "Branch Name", key: "name", sortable: true },
                  { name: "Branch Code", key: "branchCode", sortable: true },
                  { name: "Type", key: "type", sortable: true },
                  { name: "City", key: "city", sortable: true },
                  { name: "Capacity", key: "capacity", sortable: true },
                  { name: "Status", key: "status", sortable: true },
                  { name: "Actions", key: "actions", sortable: false }
                ].map((header) => (
                  <th
                    key={header.name}
                    scope="col"
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${header.sortable ? 'cursor-pointer' : ''}`}
                    onClick={() => header.sortable && requestSort(header.key)}
                  >
                    <div className="flex items-center">
                      {header.name}
                      {header.sortable && (
                        <div className="flex flex-col items-center gap-0.5">
                        <ChevronUpIcon 
                          size={6} 
                          className={`ml-1 ${sortConfig.key === header.key && sortConfig.direction === 'ascending' ? ' stroke-gray-700' : 'stroke-gray-300'}`} 
                        />
                        <ChevronDownIcon 
                          size={6} 
                          className={`ml-1 ${sortConfig.key === header.key && sortConfig.direction === 'descending' ? 'stroke-gray-700' : 'stroke-gray-300'}`} 
                        />
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentBranches.map((branch) => (
                <tr key={branch.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-indigo-600 rounded border-gray-300" 
                      checked={selectedRows.includes(branch.id)}
                      onChange={() => handleSelectRow(branch.id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="">
                        <div className="text-sm font-medium text-gray-900">
                          {branch.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {branch.branchCode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {branch.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {branch.city}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {branch.capacity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className={` rounded-sm text-xs text-center ${branch.status === Status.ACTIVE? "bg-[#00B221]/10 border border-[#00B221]/20 text-[#00B221]" : "bg-[#FB3B2D]/10 border border-[#FB3B2D] text-[#FB3B2D]"} px-1.5 py-1.5`}>{branch.status.slice(0, 1).toUpperCase() + branch.status.slice(1)}</div>
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
                        onClick={() => handleEditBranch(branch.id)}
                      >
                        <EditIcon size={18} />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeleteBranch(branch.id)}
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
        users={branches}
        totalPages={totalPages}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default BranchManagement;
