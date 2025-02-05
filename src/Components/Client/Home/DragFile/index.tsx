import { useRef, useState } from "react";
import { assets } from "../../../../assets";

export type UploadedFile = {
  name: string;
  size: number;
  id: string;
};

type DragFileProps = {
  uploadedFiles: File[];
  setUploadedFiles: any;
};

const DragFile = ({ uploadedFiles, setUploadedFiles }: DragFileProps) => {
  const [isDragging, setIsDragging] = useState(false);
  // const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFiles = (files: File[]) => {
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    processFiles(files);
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="w-[40%] min-h-[200px] mt-5 flex flex-col gap-3">
      <div
        tabIndex={0}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed relative border-[#1640D6] rounded-xl h-[200px] w-full flex flex-col gap-2 items-center justify-center cursor-pointer transition-colors duration-200 ${
          isDragging ? "bg-blue-50" : ""
        } hover:bg-blue-50`}
      >
        <h2 className="text-xl font-semibold select-none">
          {uploadedFiles.length > 0
            ? "Drop more files here"
            : "Drag your file(s) to start uploading"}
        </h2>
        <div className="flex items-center justify-center gap-3">
          <div className="h-[2px] w-[120px] bg-[#BFBFBD]"></div>
          <h2 className="text-[#BFBFBD] font-medium uppercase select-none">
            or
          </h2>
          <div className="h-[2px] w-[120px] bg-[#BFBFBD]"></div>
        </div>

        {/* Replacing custom Button with native button for debugging */}
        <button className="h-[35px] w-[50%] bg-blue-500 text-white rounded-lg">
          Upload files
        </button>
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          multiple
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          accept="image/*,.pdf,.doc,.docx,.txt"
        />

        {/* Ensure input is visible and clickable */}
      </div>

      {uploadedFiles.length > 0 && (
        <div className="border border-gray-200 rounded-xl p-4 space-y-2">
          <h3 className="font-medium text-gray-700 mb-3">
            Uploaded Files ({uploadedFiles.length})
          </h3>
          {uploadedFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between bg-gray-50 p-2 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <div className="max-w-[200px] truncate">{file.name}</div>
                <span className="text-sm text-gray-500">
                  ({formatFileSize(file.size)})
                </span>
              </div>
              <button
                className=""
                onClick={() => removeFile(file.id)}
                type="button"
              >
                <assets.closeBtnIcon />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DragFile;
