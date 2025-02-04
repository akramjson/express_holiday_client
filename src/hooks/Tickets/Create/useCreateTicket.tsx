import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthenticatedCalls from "../../../api/authenticatedapi";
import { authEndpoints } from "../../../libs/authEndPoints";
import { userSchemaType } from "../../../types/User/schema";

const useCreateTicket = () => {
  const { postRequest } = useAuthenticatedCalls();
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
    onSettled: (data, error) => {
      if (error) {
      } else {
        queryClient.setQueryData(
          ["tickets"],
          (oldData: userSchemaType[] | undefined) => {
            return [...(oldData || []), data];
          }
        );
      }
    },
  });
};

export default useCreateTicket;
