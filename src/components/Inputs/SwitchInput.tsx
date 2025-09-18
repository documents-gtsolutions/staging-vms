"use client";
import React, { useState, useEffect } from "react";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  Path,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Switch } from "../ui/switch";

interface InputProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  subLabel?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  errors: FieldErrors<T>;
  onChange?: (checked: boolean) => void;
}

const SwitchInput = <T extends FieldValues>({
  id,
  errors,
  label,
  register,
  setValue,
  watch,
  disabled = false,
  required,
  subLabel,
  defaultChecked = false,
  onChange,
  ...props
}: InputProps<T>) => {
  const currentValue = watch(id);
  const [isChecked, setIsChecked] = useState(defaultChecked);

  useEffect(() => {
    setIsChecked(currentValue !== undefined ? currentValue : defaultChecked);
  }, [currentValue, defaultChecked]);

  const handleChange = (checked: boolean) => {
    setIsChecked(checked);
    setValue(id, checked as any);
    if (onChange) {
      onChange(checked);
    }
  };

  return (
    <div className="">
      <h3 className="text-sm font-medium text-gray-700 mb-1.5">{label}</h3>
      <div className="mt-1.5">
        <div className="flex items-center gap-2">
          <input
            type="hidden"
            {...register(id, { required: required ? `${label} is required` : false })}
          />
          <Switch
            id={id}
            {...props}
            disabled={disabled}
            checked={isChecked}
            onCheckedChange={handleChange}
          />
          <label htmlFor={id} className="text-base font-bold text-gray-900">
            {subLabel}
          </label>
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

export default SwitchInput;
