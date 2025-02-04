import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../../../Store/Auth/authStore";

interface UploadFileData {
  ticket_id: string | number;
  files: File[];
}

const useCreateTicketFileFetch = () => {
  const queryClient = useQueryClient();
  const { access_token: token } = useAuthStore();

  const createTicket = async ({ ticket_id, files }: UploadFileData) => {
    try {
      const formData = new FormData();

      // Append files to FormData
      files.forEach((file: File) => {
        formData.append("files", file);
      });

      // Debug logging
      console.log("Files being uploaded:", files);
      for (const pair of formData.entries()) {
        console.log("FormData entry:", pair[0], pair[1]);
      }

      // Get the token from localStorage

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(
        `http://localhost:80/tickets/${ticket_id}/files/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            // Don't set Content-Type - let browser set it with boundary
          },
          body: formData,
        }
      );

      if (!response.ok) {
        // Log the error response
        const errorData = await response.json();
        console.error("Upload failed:", {
          status: response.status,
          statusText: response.statusText,
          data: errorData,
        });
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error("File upload error:", error);
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
      console.log("File upload successful:", data);
    },
    onError: (error) => {
      console.error("Error uploading files:", error);
    },
  });
};

export default useCreateTicketFileFetch;
