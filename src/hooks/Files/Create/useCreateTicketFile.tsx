import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthenticatedCalls from "../../../api/authenticatedapi";
import { authEndpoints } from "../../../libs/authEndPoints";

interface UploadFileData {
  ticket_id: string | number;
  files: File[];
}

const useCreateTicketFile = () => {
  const { postRequest } = useAuthenticatedCalls();
  const queryClient = useQueryClient();

  const createTicket = async ({ ticket_id, files }: UploadFileData) => {
    try {
      const formData = new FormData();

      // Change the way we append files to match backend expectation
      files.forEach((file: File) => {
        // Just use 'files' instead of 'files[]'
        formData.append("files", file);
      });

      // Debug logging
      console.log("Files being uploaded:", files);
      for (const pair of formData.entries()) {
        console.log("FormData entry:", pair[0], pair[1]);
      }

      const response = await postRequest({
        url: `${authEndpoints.CREATE_TICKET_PATH}${ticket_id}/files/`,
        data: formData,
        headers: {
          Accept: "application/json",
          // Remove explicit Content-Type to let browser handle it
        },
      });

      return response.data;
    } catch (error: any) {
      // Add more detailed error logging
      if (error.response) {
        console.error("Server response error:", {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers,
        });
      }
      throw error;
    }
  };

  return useMutation({
    mutationFn: createTicket,
    onSuccess: (data) => {
      queryClient.setQueryData(["tickets", "files"], (oldData: any[] = []) => [
        ...oldData,
        data,
      ]);
    },
    onError: (error) => {
      console.error("Error uploading files:", error);
    },
  });
};

export default useCreateTicketFile;
