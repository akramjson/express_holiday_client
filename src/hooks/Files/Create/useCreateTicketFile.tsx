import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthenticatedCalls from "../../../api/authenticatedapi";
import { authEndpoints } from "../../../libs/authEndPoints";

const useCreateTicketFile = () => {
  const { postRequest } = useAuthenticatedCalls();
  const queryClient = useQueryClient();

  const createTicket = async ({
    files,
    ticket_id,
  }: {
    files: File[];
    ticket_id: number;
  }) => {
    const formData = new FormData();

    files.forEach((file) => {
      if (file instanceof File) {
        formData.append("files", file);
      } else {
        console.warn("Skipping invalid file:", file);
      }
    });

    try {
      const response = await postRequest({
        url: `${authEndpoints.CREATE_TICKET_PATH}${ticket_id}/files/`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
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
    },
    onError: (error) => {
      console.error("Error uploading files:", error);
    },
  });
};

export default useCreateTicketFile;
