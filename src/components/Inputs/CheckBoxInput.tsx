"use client";

import React, { useState, useEffect } from "react";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  Path,
} from "react-hook-form";

interface InputProps<T extends FieldValues> {
  id: Path<T>;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<T>;
  setValue: (name: Path<T>, value: any) => void;
  watch: (name: Path<T>) => any;
  errors: FieldErrors<T>;
  className?: string;
  onChange?: (checked: boolean) => void;
  defaultChecked?: boolean;
  icon?: React.ReactNode;
  size?: "small" | "large";
}

const CheckBoxInput = <T extends FieldValues>({
  id,
  errors,
  label,
  register,
  setValue,
  watch,
  disabled = false,
  className,
  required,
  onChange,
  defaultChecked = false,
  icon: Icon
}: InputProps<T>) => {
  const currentValue = watch(id);
  const [isChecked, setIsChecked] = useState(defaultChecked);
  
  // Update the checkbox state when form value or defaultChecked changes
  useEffect(() => {
    const newChecked = currentValue !== undefined ? currentValue : defaultChecked;
    setIsChecked(newChecked);
  }, [currentValue, defaultChecked]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    setValue(id, checked);
    if (onChange) {
      onChange(checked);
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        <input
          id={id}
          type="checkbox"
          {...register(id, {
            required: required ? `${label} is required` : false,
            onChange: handleChange,
          })}
          disabled={disabled}
          checked={isChecked}
          className="sr-only"
        />
        <label htmlFor={id} className="cursor-pointer flex items-center">
          <div
            className={`w-4 h-4 flex items-center justify-center rounded-sm p-0.5 cursor-pointer border
              ${disabled ? "opacity-50 cursor-not-allowed" : ""}
              ${isChecked ? "bg-[#7752FF] border-[#7752FF]" : "border-gray-500"}
            `}
          >
            {isChecked && (
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.3334 4L6.00002 11.3333L2.66669 8"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <div className="flex flex-col-reverse items-center gap-1 ml-2">
            {label && (
              <span className="text-sm font-medium text-gray-700 cursor-pointer">
                {label}
              </span>
            )}
            {Icon && <div className="ml-2">{Icon}</div>}
          </div>
        </label>
      </div>

      {errors[id] && (
        <p className="text-red-500 text-xs ml-2">
          {errors[id]?.message as string}
        </p>
      )}
    </div>
  );
};

export default CheckBoxInput;
