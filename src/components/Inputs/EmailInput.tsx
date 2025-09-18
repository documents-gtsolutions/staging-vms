"use client";
import { MailIcon } from "@/icon";
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
}

const EmailInput = <T extends FieldValues>({
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
      <div className="relative mt-1.5">
        {variant === "rounded" && (
          <MailIcon
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
            size={24}
          />
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register(id, { required })}
          disabled={disabled}
          {...props}
          className={`border w-full transition-colors focus:outline-0 text-gray-950 text-sm ${
            variant === "rounded"
              ? "pl-10 p-3.5 rounded-full focus:border-purple-400 border-gray-300 bg-white"
              : "rounded-sm p-3.5 border-gray-200 bg-gray-50"
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

export default EmailInput;
