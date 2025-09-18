import { X } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone, DropzoneOptions, FileRejection } from "react-dropzone";

interface DropZoneProps {
  onFileUpload: (files: File[]) => void;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
  maxFiles?: number;
  multiple?: boolean;
  className?: string;
  disabled?: boolean;
  defaultFileUrl?: string;
}

const DropZone: React.FC<DropZoneProps> = ({
  onFileUpload,
  acceptedFileTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "video/mp4",
    "video/webm",
    "video/ogg",
  ],
  maxFileSize = 10 * 1024 * 1024,
  maxFiles,
  multiple = false,
  className = "",
  disabled = false,
  defaultFileUrl,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<
    Array<{ file: File; preview: string }>
  >([]);
  const [fileRejectionErrors, setFileRejectionErrors] = useState<
    Array<{
      fileName: string;
      errors: Array<{ code: string; message: string }>;
    }>
  >([]);
  useEffect(() => {
    if (defaultFileUrl && uploadedFiles.length === 0) {
      setUploadedFiles([
        {
          file: new File([], "existing-file"),
          preview: defaultFileUrl,
        },
      ]);
      //   console.log(defaultFileUrl);
    }
  }, [defaultFileUrl]);
  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      // Handle file rejections
      if (fileRejections.length > 0) {
        const formattedRejections = fileRejections.map((rejection) => ({
          fileName: rejection.file.name,
          errors: rejection.errors.map((error) => ({
            code: error.code,
            message: error.message,
          })),
        }));
        setFileRejectionErrors(formattedRejections);
      } else {
        // Clear previous errors if successful upload
        setFileRejectionErrors([]);
      }

      if (maxFiles && uploadedFiles.length + acceptedFiles.length > maxFiles) {
        // Only accept files up to the limit
        const remainingSlots = maxFiles - uploadedFiles.length;
        const filesToAdd = acceptedFiles.slice(0, remainingSlots);

        const newFiles = filesToAdd.map((file) => ({
          file,
          preview: URL.createObjectURL(file),
        }));

        setUploadedFiles((prev) =>
          multiple ? [...prev, ...newFiles] : newFiles
        );
        onFileUpload(filesToAdd);
      } else {
        const newFiles = acceptedFiles.map((file) => ({
          file,
          preview: URL.createObjectURL(file),
        }));

        setUploadedFiles((prev) =>
          multiple ? [...prev, ...newFiles] : newFiles
        );
        onFileUpload(acceptedFiles);
      }
    },
    [onFileUpload, multiple, maxFiles, uploadedFiles.length]
  );

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => {
      const newFiles = prev.filter((_, i) => i !== index);
      return newFiles;
    });
  };

  // Helper function to get a user-friendly error message
  const getErrorMessage = (
    code: string,
    message: string,
    fileName: string
  ): string => {
    switch (code) {
      case "file-invalid-type":
        return `"${fileName}" has an invalid file type`;
      case "file-too-large":
        return `"${fileName}" is too large (max: ${(
          maxFileSize /
          (1024 * 1024)
        ).toFixed(1)} MB)`;
      case "file-too-small":
        return `"${fileName}" is too small`;
      case "too-many-files":
        return `Too many files (max: ${maxFiles})`;
      default:
        return message;
    }
  };

  const dropzoneOptions: DropzoneOptions = {
    onDrop,
    accept: acceptedFileTypes.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {} as Record<string, string[]>),
    maxSize: maxFileSize,
    multiple,
    disabled: disabled || (maxFiles ? uploadedFiles.length >= maxFiles : false),
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone(dropzoneOptions);

  const isLimitReached = maxFiles ? uploadedFiles.length >= maxFiles : false;

  return (
    <div
      {...getRootProps()}
      className={`
                w-[517px] min-h-[140px] bg-gray-100 rounded-lg bg-center bg-[url('/images/dropzone-pattern.png')] bg-contain bg-no-repeat overflow-hidden
                ${uploadedFiles.length > 0 ? "p-3" : "p-7"}
                ${disabled || isLimitReached ? "cursor-not-allowed" : ""}
                ${className}
            `}
    >
      <input {...getInputProps()} />

      {/* File Previews Inside Dropzone     */}
      {uploadedFiles.length > 0 && (
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 justify-center">
            {uploadedFiles.map((fileData, index) => (
              <div
                key={index}
                className="relative group max-w-[100px] max-h-[100px]"
              >
                <div className="relative w-full h-full rounded-lg overflow-hidden bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 shadow-lg aspect-square mx-auto">
                  {fileData.preview.endsWith(".png") ||
                  fileData.preview.endsWith(".jpg") ||
                  fileData.file.type.startsWith("image") ? (
                    <Image
                      fill
                      src={fileData.preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  ) : fileData.file.type.startsWith("video/") ? (
                    <video
                      src={fileData.preview}
                      className="w-full h-full object-cover"
                      controls
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-700/80 flex items-center justify-center">
                      <span className="text-gray-300 text-xs text-center px-2 truncate">
                        {fileData.file.name}
                      </span>
                    </div>
                  )}

                  {/* Remove button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(index);
                    }}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
                  >
                    <X size={12} color="white" />
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1 truncate text-center px-1">
                  {fileData.file.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Default Content */}
      {uploadedFiles.length === 0 && (
        <div className="flex items-center justify-center flex-col gap-2 ">
          {isDragActive ? (
            <>
              <Image
                src="/images/dropzone-img.png"
                alt="Dropzone Pattern"
                width={44}
                height={44}
              />
              <h3 className="text-xs font-medium text-gray-900">
                Drop files here...
              </h3>
              <p className="text-xs text-gray-700">Release to upload</p>
            </>
          ) : isDragReject ? (
            <>
              <Image
                src="/images/dropzone-img.png"
                alt="Dropzone Pattern"
                width={44}
                height={44}
              />
              <h3 className="text-xs font-medium text-gray-900">
                {fileRejectionErrors.length > 0
                  ? fileRejectionErrors.map((rejection, index) =>
                      rejection.errors.map((error, errorIndex) => (
                        <div key={`${index}-${errorIndex}`}>
                          {getErrorMessage(
                            error.code,
                            error.message,
                            rejection.fileName
                          )}
                        </div>
                      ))
                    )
                  : "File type not supported"}
              </h3>
            </>
          ) : (
            <>
              <Image
                src="/images/dropzone-img.png"
                alt="Dropzone Pattern"
                width={44}
                height={44}
              />
              <h3 className="text-xs font-medium text-gray-900">
                Click or Drag & Drop
              </h3>
              <p className="text-xs text-gray-700">
                Drag and drop your file here or click to browse
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default DropZone;
