"use client";
import { CalendarIcon } from "@/icon";
import React, { useRef, useState, useEffect } from "react";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  Path,
} from "react-hook-form";

interface InputProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<T>;
  setValue: (name: Path<T>, value: any) => void;
  watch: (name: Path<T>) => any;
  errors: FieldErrors<T>;
  className?: string;
  variant?: "rounded" | "square";
}

const DateInput = <T extends FieldValues>({
  id,
  errors,
  label,
  register,
  setValue,
  watch,
  disabled = false,
  placeholder,
  className,
  required
}: InputProps<T>) => {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const displayInputRef = useRef<HTMLInputElement>(null);
  const [displayDate, setDisplayDate] = useState<string>("");

  const handleCalendarClick = () => {
    dateInputRef.current?.showPicker();
  };

  const formatDate = (date: string) => {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";

    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear();

    return `${month}/${day}/${year}`;
  };

  // Watch for form value changes
  const currentValue = watch(id);

  // Update display date when form value changes
  useEffect(() => {
    if (currentValue) {
      const formattedDate = formatDate(currentValue);
      setDisplayDate(formattedDate);
    }
  }, [currentValue]);

  // Update display date when hidden date input changes
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    const formattedDate = formatDate(dateValue);
    setDisplayDate(formattedDate);
    
    // Update React Hook Form state
    setValue(id, dateValue);
  };
  return (
    <div className="">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative mt-1.5">
        <CalendarIcon
          size={24}
          className="absolute right-3 top-1/2 -translate-y-1/2"
          onClick={handleCalendarClick}
        />
        {/* Display input */}
        <input
          type="text"
          placeholder={placeholder || "mm/dd/yyyy"}
          className={`border w-full p-3.5 transition-colors focus:outline-0 text-gray-950 text-sm disabled:bg-gray-200 disabled:cursor-not-allowed rounded-sm border-gray-200 bg-gray-50
          ${className}`}
          readOnly
          ref={displayInputRef}
          value={displayDate}
          onClick={handleCalendarClick}
        />

        <input
          id={id}
          type="date"
          {...register(id, {
            required: required ? `${label} is required` : false,
            onChange: handleDateChange,
            validate: (value) => {
              if (!value && required) return `${label} is required`;
              if (value) {
                const selectedDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                if (selectedDate < today) {
                  return "Date cannot be in the past";
                }
              }
              return true;
            }
          })}
          disabled={disabled}
          className="hidden"
          ref={dateInputRef}
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

export default DateInput;
