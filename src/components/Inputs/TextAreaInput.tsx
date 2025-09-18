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
  rows?: number;
  cols?: number;
}

const TextAreaInput = <T extends FieldValues>({
  id,
  errors,
  label,
  register,
  disabled = false,
  placeholder,
  className,
  required,
  rows,
  cols,
  ...props
}: InputProps<T>) => {
  return (
    <div className="">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-1.5">
        <textarea
          id={id}
          rows={rows}
          cols={cols}
          placeholder={placeholder}
          {...register(id, { required })}
          disabled={disabled}
          {...props}
          className={`border w-full p-3.5 transition-colors focus:outline-0 text-gray-950 text-sm disabled:bg-gray-200 disabled:cursor-not-allowed rounded-sm border-gray-200 bg-gray-50 ${className}`}
          required
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

export default TextAreaInput;
