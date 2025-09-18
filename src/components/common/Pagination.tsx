import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
  indexOfFirstItem: number;
  indexOfLastItem: number;
  users: any[];
  totalPages: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

const Pagination = ({ indexOfFirstItem, indexOfLastItem, users, totalPages, currentPage, paginate }: PaginationProps) => {
  return (
    <div className="mt-8 flex items-center justify-between w-full">
      <div className="flex items-center gap-2 text-sm text-gray-600 w-full">
        Show
        <select className="border border-gray-300 rounded-md px-2 py-1">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        per page
      </div>
      <div className="text-gray-600 text-sm flex items-center gap-3 justify-end w-full">
        <div>
          <p className="text-sm text-gray-600">
            <span className="font-medium">{indexOfFirstItem + 1}</span>-
            <span className="font-medium">
              {Math.min(indexOfLastItem, users.length)}
            </span>{" "}
            of <span className="font-medium">{users.length}</span>
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex -space-x-px">
            <button
              onClick={() => paginate(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="relative text-sm font-medium text-gray-500 p-2 hover:bg-[#EAE8FF] rounded-md"
            >
              <span className="sr-only">Previous</span>
              <ArrowLeft
                className="text-gray-600 hover:text-[#7752FF]"
                size={14}
                aria-hidden="true"
              />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Show pages around current page
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
                  className={`relative inline-flex items-center px-4 py-2 mx-1 rounded-md text-sm font-medium ${
                    currentPage === pageNum
                      ? "z-10 bg-[#EAE8FF] border-indigo-500 text-indigo-600"
                      : "text-gray-600 text-base hover:bg-[#EAE8FF] hover:text-[#7752FF] rounded-md"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => paginate(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="relative text-sm font-medium text-gray-500 p-2 hover:bg-[#EAE8FF] rounded-md"
            >
              <span className="sr-only">Next</span>
              <ArrowRight
                className="text-gray-600 hover:text-[#7752FF]"
                size={14}
                aria-hidden="true"
              />
            </button>
          </nav>
        </div>
        <div className="text-gray-600">Per Page</div>
      </div>
      <div></div>
    </div>
  );
};

export default Pagination;
