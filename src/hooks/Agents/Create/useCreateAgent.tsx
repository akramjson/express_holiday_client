import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthenticatedCalls from "../../../api/authenticatedapi";
import { authEndpoints } from "../../../libs/authEndPoints";
import { registerSchemaType } from "../../../types/Register/schema";
import { userSchemaType } from "../../../types/User/schema";

const useCreateAgent = () => {
  const { postRequest } = useAuthenticatedCalls();
  const queryClient = useQueryClient();
  const createAgent = async (data: registerSchemaType) => {
    const { confirm_password, ...newData } = { ...data, role: "agent" };
    const response = await postRequest({
      url: authEndpoints.CREATE_ACCOUNT_PATH,
      data: newData,
    });

    return response.data;
  };

  return useMutation({
    mutationFn: (data: registerSchemaType) => createAgent(data),
    onSettled: (data, error) => {
      if (error) {
      } else {
        queryClient.setQueryData(
          ["users"],
          (oldData: userSchemaType[] | undefined) => {
            return [...(oldData || []), data];
          }
        );
      }
    },
  });
};

export default useCreateAgent;
