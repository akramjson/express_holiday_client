import { BiLoader } from "react-icons/bi";
import { MdClose } from "react-icons/md"; // Assuming you're using react-icons for MdClose
import { Button } from "../../../UI";

type AddNewFilesProps = {
  ticket: any;
  getFileIcon: any;
  removeFile: any;
  selectedFiles: any[];
  createFileMutation: any;
  emptyFiles: VoidFunction;
};

const AddNewFiles = ({
  ticket,
  getFileIcon,
  removeFile,
  selectedFiles,
  createFileMutation,
  emptyFiles,
}: AddNewFilesProps) => {
  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    try {
      await createFileMutation.mutateAsync({
        ticket_id: ticket.ticket_id,
        files: selectedFiles,
      });

      emptyFiles(); // Clear files after successful upload
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };
  return (
    <div className="flex flex-col gap-3">
      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-50 rounded"
            >
              <div className="flex items-center gap-2">
                {getFileIcon(file.name)}

                <span className="text-sm text-gray-600">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
                <span className="text-sm truncate max-w-[200px]">
                  {file.name}
                </span>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="p-1 hover:text-red-500 transition-colors"
              >
                <MdClose size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
      {selectedFiles?.length > 0 && (
        <Button
          onClick={handleUpload}
          disabled={createFileMutation.isPending}
          className="w-full"
        >
          {createFileMutation.isPending ? (
            <div className="flex items-center gap-2">
              <BiLoader className="animate-spin" size={16} />
              <span>Uploading...</span>
            </div>
          ) : (
            `Upload ${selectedFiles.length} file${
              selectedFiles.length > 1 ? "s" : ""
            }`
          )}
        </Button>
      )}
    </div>
  );
};

export default AddNewFiles;
