import React, { useState } from "react";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";

interface PaginationProps {
  indexOfFirstItem: number;
  indexOfLastItem: number;
  users: any[];
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  paginate: (pageNumber: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const Pagination = ({ 
  indexOfFirstItem, 
  indexOfLastItem, 
  users, 
  totalPages, 
  currentPage, 
  itemsPerPage,
  paginate,
  onItemsPerPageChange 
}: PaginationProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleItemsPerPageChange = (value: number) => {
    onItemsPerPageChange(value);
    setIsDropdownOpen(false);
    paginate(1);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isDropdownOpen]);

  return (
    <div className="mt-8 flex items-center justify-between w-full">
      {/* Left side - Showing info */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>Showing</span>
        <div className="relative dropdown-container">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-[#E8E5FF] rounded-full px-4 py-2 flex items-center gap-2 hover:bg-[#DDD6FF] transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            <span className="font-medium text-gray-700">{itemsPerPage}</span>
            <ChevronDown 
              size={12} 
              className={`text-gray-600 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
            />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[80px]">
              {[10, 20, 50, 100].map((value) => (
                <button
                  key={value}
                  onClick={() => handleItemsPerPageChange(value)}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                    value === itemsPerPage ? 'bg-purple-50 text-purple-700 font-medium' : 'text-gray-700'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          )}
        </div>
        <span>out of {users.length}</span>
      </div>

      {/* Right side - Page navigation */}
      <div className="flex items-center gap-2">
        {/* Previous button */}
        <button
          onClick={() => paginate(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft size={16} className="text-gray-600" />
        </button>

        {/* Page numbers */}
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }

          return (
            <button
              key={pageNum}
              onClick={() => paginate(pageNum)}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                currentPage === pageNum
                  ? "bg-[#7C3AED] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        {/* Show dots if there are more pages */}
        {totalPages > 5 && currentPage < totalPages - 2 && (
          <>
            <span className="text-gray-400">...</span>
            <button
              onClick={() => paginate(totalPages)}
              className="w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next button */}
        <button
          onClick={() => paginate(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowRight size={16} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
