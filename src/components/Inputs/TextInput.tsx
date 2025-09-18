"use client";
import React from "react";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  Path,
} from "react-hook-form";

interface InputProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  className?: string;
  variant?: "rounded" | "square";
  min?: number;
  max?: number;
  step?: number;
  pattern?: string;
  [key: string]: any; // Allow additional input props
}

const TextInput = <T extends FieldValues>({
  id,
  errors,
  label,
  register,
  disabled = false,
  placeholder,
  className,
  required,
  type = "text",
  variant = "rounded",
  ...props
}: InputProps<T>) => {
  return (
    <div className="">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-1.5">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register(id, { required })}
          disabled={disabled}
          {...props}
          className={`border w-full p-3.5 transition-colors focus:outline-0 text-gray-950 text-sm disabled:bg-gray-200 disabled:cursor-not-allowed ${
            variant === "rounded"
              ? "rounded-full focus:border-purple-400 border-gray-300 bg-white  "
              : "rounded-sm border-gray-200 bg-gray-50"
          } ${className}`}
          required={required}
        />
      </div>
      {errors[id] && (
        <p className="text-red-500 text-xs mt-1">
          {errors[id]?.message as string}
        </p>
      )}
    </div>
  );
};

export default TextInput;
