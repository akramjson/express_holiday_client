import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthenticatedCalls from "../../../api/authenticatedapi";
import { authEndpoints } from "../../../libs/authEndPoints";
import { useAuthStore } from "../../../Store/Auth/authStore";

const useCreateTicket = () => {
  const { postRequest } = useAuthenticatedCalls();
  const { access_token } = useAuthStore();
  const queryClient = useQueryClient();
  const createTicket = async (data: any) => {
    const response = await postRequest({
      url: authEndpoints.CREATE_TICKET_PATH,
      data: data,
      headers: {
        Accept: "Application/json",
      },
    });

    return response.data;
  };

  return useMutation({
    mutationFn: (data: any) => createTicket(data),
    onSettled: (error) => {
      if (error) {
      } else {
        queryClient.invalidateQueries({ queryKey: ["tickets", access_token] });
      }
    },
  });
};

export default useCreateTicket;
