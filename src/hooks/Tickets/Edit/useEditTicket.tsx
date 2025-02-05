import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthenticatedCalls from "../../../api/authenticatedapi";
import { authEndpoints } from "../../../libs/authEndPoints";

const useEditTicket = (ticket_id: string | number) => {
  const { patchRequest } = useAuthenticatedCalls();
  const queryClient = useQueryClient();

  const createTicket = async (data: any) => {
    const response = await patchRequest({
      url: `${authEndpoints.CREATE_TICKET_PATH}${ticket_id}`,
      data: data,
      headers: {
        Accept: "Application/json",
      },
    });
    return response.data;
  };

  return useMutation({
    mutationFn: (data: any) => createTicket(data),
    onMutate: async (newStatus) => {
      // Optimistic update before mutation completes
      await queryClient.cancelQueries({ queryKey: ["tickets", ticket_id] });
      const previousTicket = queryClient.getQueryData(["tickets", ticket_id]);

      // Update the ticket in the cache
      queryClient.setQueryData(["tickets", ticket_id], (oldData: any) => ({
        ...oldData,
        status: newStatus.status, // assuming `status` is part of the data
      }));

      return { previousTicket };
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["tickets", ticket_id],
      });
    },
    onError: (error, newStatus, context) => {
      // Rollback if the mutation fails
      queryClient.setQueryData(["tickets", ticket_id], context?.previousTicket);
    },
  });
};

export default useEditTicket;
