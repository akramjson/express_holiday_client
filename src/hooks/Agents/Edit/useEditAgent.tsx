import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthenticatedCalls from "../../../api/authenticatedapi";
import { clientEndpoints } from "../../../libs/clientEndpoints";
import { userSchemaType } from "../../../types/User/schema";

const useEditAgent = (userId: string | undefined) => {
  const queryClient = useQueryClient();
  const { patchRequest } = useAuthenticatedCalls();
  const editUserDetails = async (data: userSchemaType) => {
    const res = await patchRequest({
      url: `${clientEndpoints.EDIT_USER_PATH}${userId}`,
      data: data,
      headers: {},
    });
    return res.data;
  };

  return useMutation({
    mutationFn: editUserDetails,
    onMutate: async (data) => {
      // Optimistic update before mutation completes
      await queryClient.cancelQueries({ queryKey: ["users", userId] });
      const previousTicket = queryClient.getQueryData(["users", userId]);

      // Update the ticket in the cache
      queryClient.setQueryData(["users", userId], (oldData: any) => ({
        ...oldData,
        data,
      }));

      return { previousTicket };
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["tickets", userId],
      });
    },
    onError: (error, newStatus, context) => {
      // Rollback if the mutation fails
      queryClient.setQueryData(["users", userId], context?.previousTicket);
    },
  });
};

export default useEditAgent;
