import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthenticatedCalls from "../../../api/authenticatedapi";
import { clientEndpoints } from "../../../libs/clientEndpoints";

const useRemoveAgent = (userId: string | undefined) => {
  const queryClient = useQueryClient();
  const { deleteRequest } = useAuthenticatedCalls();
  const removeAgent = async () => {
    await deleteRequest({
      url: `${clientEndpoints.REMOVE_USER_PATH}${userId}?is_admin=true`,
    });
  };

  return useMutation({
    mutationFn: () => removeAgent(),
    onSettled: (error, _variables) => {
      if (error) {
      } else {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    },
  });
};

export default useRemoveAgent;
