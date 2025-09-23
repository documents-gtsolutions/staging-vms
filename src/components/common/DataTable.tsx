"use client";
import React, { useState, useMemo, useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@/icon";
import Pagination from "./Pagination";
import { Button } from "../ui/button";
import { Plus, Search } from "lucide-react";

export type Column<T> = {
  name: string;
  key: keyof T | string;
  checkbox?: boolean;
  sortable?: boolean;
  minWidth?: string;
  render?: (row: T) => React.ReactNode;
  buttonText?: string;
  buttonOnClick?: () => void;
};

type SortConfig = {
  key: string | null;
  direction: "ascending" | "descending" | null;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  itemsPerPage?: number;
  actions?: (row: T) => React.ReactNode;
  searchable?: boolean;
  checkbox?: boolean;
  buttonText?: string;
  buttonOnClick?: () => void;
};

const DataTable = <T extends { id: number }>({
  columns,
  data,
  itemsPerPage: initialItemsPerPage = 10,
  actions,
  searchable = true,
  checkbox = false,
  buttonText,
  buttonOnClick,
}: DataTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: null,
  });

  // State for search
  const [searchTerm, setSearchTerm] = useState("");
  // State for checkbox selection
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // Sorting
  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Filtering & Sorting
  const processedData = useMemo(() => {
    let filtered = [...data];

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const key = sortConfig.key as keyof typeof a;
        if (a[key] < b[key])
          return sortConfig.direction === "ascending" ? -1 : 1;
        if (a[key] > b[key])
          return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [data, sortConfig, searchTerm]);

  // Handle export excel// Handle row selection
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
      setSelectedRows(processedData.map((row) => row.id));
    }
    setSelectAll(!selectAll);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = processedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(processedData.length / itemsPerPage);

  return (
    <>
      {/* Controls Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 lg:mb-8 gap-4">
        {/* Search */}
        <div className="flex items-center gap-2.5 w-full lg:w-auto">
          {searchable && (
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
          )}
        </div>
        {/* Action Buttons */}
        {buttonText && buttonOnClick && (
        <Button onClick={() => buttonOnClick?.()}>
          <Plus size={16} />
          <span>{buttonText}</span>
        </Button>
        )}
      </div>
      <div>
        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto custom-scrollbar">
          <table className="w-full divide-y divide-gray-200 min-w-[1200px]">
            <thead className="bg-[#F5F5F6]">
              <tr>
                {checkbox && (
                  <th scope="col" className="px-4 py-3 w-10">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 rounded border-gray-300"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </th>
                )}
                {columns.map((col) => (
                  <th
                    key={String(col.key)}
                    style={{ minWidth: col.minWidth }}
                    className={`px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap ${
                      col.sortable ? "cursor-pointer" : ""
                    }`}
                    onClick={() => col.sortable && requestSort(String(col.key))}
                  >
                    <div className="flex items-center">
                      {col.name}
                      {col.sortable && (
                        <div className="ml-1 flex flex-col">
                          <ChevronUpIcon
                            size={8}
                            className={`${
                              sortConfig.key === col.key &&
                              sortConfig.direction === "ascending"
                                ? "stroke-gray-800"
                                : "stroke-gray-300"
                            }`}
                          />
                          <ChevronDownIcon
                            size={8}
                            className={`${
                              sortConfig.key === col.key &&
                              sortConfig.direction === "descending"
                                ? "stroke-gray-800"
                                : "stroke-gray-300"
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  </th>
                ))}
                {actions && (
                  <th className="px-4 py-3 text-xs min-w-[120px]">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {checkbox && (
                    <td className="px-4 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 rounded border-gray-300"
                        checked={selectedRows.includes(row.id)}
                        onChange={() => handleSelectRow(row.id)}
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {col.render
                        ? col.render(row)
                        : (row[col.key as keyof T] as any)}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      {actions(row)}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6">
          <Pagination
            indexOfFirstItem={indexOfFirstItem}
            indexOfLastItem={indexOfLastItem}
            users={processedData}
            totalPages={totalPages}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            paginate={setCurrentPage}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      </div>
    </>
  );
};

export default DataTable;
