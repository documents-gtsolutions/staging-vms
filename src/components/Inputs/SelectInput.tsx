"use client";
import React from "react";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  Path,
} from "react-hook-form";
import { ChevronDown } from "lucide-react";

interface InputProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  className?: string;
  options: { label: string; value: string }[];
}

const SelectInput = <T extends FieldValues>({
  id,
  errors,
  label,
  register,
  disabled = false,
  className,
  required,
  options
}: InputProps<T>) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700 block mb-2">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          {...register(id, { required: required ? true : false })}
          disabled={disabled} className="w-full px-4 py-3 rounded-sm border-gray-200 bg-gray-50 border text-gray-900/60 text-base appearance-none focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed pr-10"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
          <ChevronDown className="h-5 w-5 text-gray-500" />
        </div>
      </div>
      {errors[id] && (
        <p className="text-red-500 text-xs mt-1">
          {errors[id]?.message as string}
        </p>
      )}
    </div>
  );
};

export default SelectInput;
