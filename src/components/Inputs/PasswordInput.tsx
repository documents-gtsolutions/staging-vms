"use client";
import { EyeCloseIcon, EyeOpenIcon, KeyIcon } from "@/icon";
import React, { useState } from "react";
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
}

const PasswordInput = <T extends FieldValues>({
  id,
  errors,
  label,
  register,
  disabled = false,
  placeholder,  
  className,
  required,
  type = "password",
  variant = "rounded",
  ...props
}: InputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="mb-4">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {variant === "rounded" && <KeyIcon
          className="absolute left-3 top-1/2 transform -translate-y-1/2"
          size={24}
        />}
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          {...register(id, { required })}
          disabled={disabled}
          {...props}
          className={`border w-full transition-colors focus:outline-0 text-gray-950 text-sm ${variant === "rounded" ? "pl-10 pr-10 bg-white  border-gray-300 focus:border-purple-400 py-3.5 rounded-full " : "rounded-sm border-gray-200 bg-gray-50 p-3.5"} ${className}`}
          required={required}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          {showPassword ? (
            <EyeCloseIcon className="h-4 w-4" size={24} />
          ) : (
            <EyeOpenIcon size={24} />
          )}
        </button>
      </div>
      {errors[id] && (
        <p className="text-red-500 text-xs mt-1">{errors[id]?.message as string}</p>
      )}
    </div>
  );
};

export default PasswordInput;
