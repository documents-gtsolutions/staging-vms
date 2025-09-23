import { Search } from "lucide-react";
import React from "react";

const SearchInput = ({ value, onChange }: { value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <div className="w-full lg:w-[250px] min-w-[250px] relative">
      <input
        type="text"
        placeholder="Search name, ID, age, etc"
        className="bg-gray-200 w-full px-4 pl-10 py-2.5 rounded-[18px] border border-gray-200 text-[#6D6D71] text-sm focus:outline-none focus:ring-1 focus:ring-[#842DF0]"
        value={value}
        onChange={onChange}
      />
      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        <Search size={16} className="text-[#0B0B13]" />
      </div>
    </div>
  );
};

export default SearchInput;
