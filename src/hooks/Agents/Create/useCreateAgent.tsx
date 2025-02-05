import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthenticatedCalls from "../../../api/authenticatedapi";
import { authEndpoints } from "../../../libs/authEndPoints";
import { registerSchemaType } from "../../../types/Register/schema";

const useCreateAgent = () => {
  const { postRequest } = useAuthenticatedCalls();
  const queryClient = useQueryClient();

  const createAgent = async (data: registerSchemaType) => {
    const { confirm_password, ...newData } = { ...data, role: "agent" };
    const response = await postRequest({
      url: authEndpoints.CREATE_ACCOUNT_PATH,
      data: newData,
      headers: {},
    });

    return response.data;
  };

  return useMutation({
    mutationFn: (data: registerSchemaType) => createAgent(data),
    onSuccess: (data) => {
      // After successful agent creation, invalidate and refetch the users list
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export default useCreateAgent;
