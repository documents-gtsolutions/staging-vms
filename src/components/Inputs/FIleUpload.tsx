import { UserIcon2 } from "@/icon";
import React, { RefObject, useRef, useState } from "react";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  Path,
} from "react-hook-form";
import { Button } from "../ui/button";

interface FileUploadProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  className?: string;
}

const FileUpload = <T extends FieldValues>({
  id,
  label,
  type,
  placeholder,
  disabled,
  required,
  register,
  errors,
  className,
}: FileUploadProps<T>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleUpload = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  // Destructure register output to avoid duplicate 'onChange'
  const {
    ref: registerRef,
    onChange: registerOnChange,
    ...rest
  } = register(id, { required });

  return (
    <>
      <div className={`flex items-center justify-between ${className || ""}`}>
        <div className="flex items-center gap-3">
          <div className="bg-[#7752FF] w-[60px] h-[60px] rounded-md flex items-center justify-center">
            <UserIcon2 size={32} />
          </div>
          <h1 className="text-gray-900 text-base">
            {fileName || "No file selected"}
          </h1>
        </div>
        <Button onClick={handleUpload} type="button">
          {label}
        </Button>
      </div>
      <input
        id={id}
        type={type || "file"}
        className="hidden"
        disabled={disabled}
        onChange={(e) => {
          handleFileChange(e);
          registerOnChange(e);
        }}
        ref={(e) => {
          inputRef.current = e;
          registerRef(e);
        }}
        {...rest}
      />
      {errors[id] && (
        <p className="text-red-500 text-sm">
          {(errors[id]?.message as string) || "This field is required"}
        </p>
      )}
    </>
  );
};

export default FileUpload;
