import { useState } from "react";
import { FaFileAlt, FaFileImage, FaFilePdf } from "react-icons/fa";
import useCreateTicketFileFetch from "../../../../hooks/Files/Create/useCreateTicketFileFetch";
import AddFile from "../AddFile";
import AddNewFiles from "../AddNewFiles";
import DownloadFiles from "../DownloadFiles";

type TicketFilesProps = {
  ticket: any;
};

const TicketFiles = ({ ticket }: TicketFilesProps) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setSelectedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const getFileIcon = (filename) => {
    const ext = filename.split(".").pop(); // Get the file extension
    switch (ext) {
      case "png":
      case "jpg":
      case "jpeg":
        return <FaFileImage className="text-primary text-2xl" />;
      case "pdf":
        return <FaFilePdf className="text-red-500" />;
      default:
        return <FaFileAlt />;
    }
  };

  const removeFile = (indexToRemove: number) => {
    setSelectedFiles((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };
  const createFileForTicket = useCreateTicketFileFetch(ticket?.ticket_id);
  return (
    <div className="flex flex-col gap-4 px-5 py-3">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Attached Files</h2>
        <AddFile
          handleFileChange={handleFileChange}
          isPending={createFileForTicket.isPending}
        />
      </div>
      <div className="flex flex-col gap-4 border-b-2">
        <DownloadFiles ticket={ticket} getFileIcon={getFileIcon} />
        <AddNewFiles
          createFileMutation={createFileForTicket}
          ticket={ticket}
          getFileIcon={getFileIcon}
          removeFile={removeFile}
          selectedFiles={selectedFiles}
          emptyFiles={() => setSelectedFiles([])}
        />
      </div>
    </div>
  );
};

export default TicketFiles;
