import { BiDownload } from "react-icons/bi";
import { handleDownload } from "../../../../hooks/Files/Download/useDownloadFile";

type DownloadFilesProps = {
  ticket: any;
  getFileIcon: any;
};

const DownloadFiles = ({ ticket, getFileIcon }: DownloadFilesProps) => {
  return (
    <div className="flex flex-col gap-2  py-2">
      <h2 className="px-2 text-primary text-lg capitalize font-medium">
        exsiting files
      </h2>
      {ticket?.files?.map((file) => (
        <div
          key={file.path}
          className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-2">
            {getFileIcon(file.original_filename)}
            <span className="text-sm font-medium">
              {file.original_filename.length > 20
                ? `${file.original_filename.slice(
                    0,
                    20
                  )}...${file.original_filename.split(".").pop()}`
                : file.original_filename}
            </span>
          </div>

          <button
            onClick={() => handleDownload(file.path, file.original_filename)}
            className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-700 transition-colors"
          >
            <BiDownload className="text-black font-medium" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default DownloadFiles;
