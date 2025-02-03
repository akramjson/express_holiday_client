import { useMutation } from "@tanstack/react-query";
import useAuthenticatedCalls from "../../../api/authenticatedapi";
import { clientEndpoints } from "../../../libs/clientEndpoints";
import { userSchemaType } from "../../../types/User/schema";

const useEditAgent = (userId: string | undefined) => {
  const { patchRequest } = useAuthenticatedCalls();
  const editUserDetails = async (data: userSchemaType) => {
    const res = await patchRequest({
      url: `${clientEndpoints.EDIT_USER_PATH}${userId}`,
      data: data,
    });
    return res.data;
  };

  return useMutation({
    mutationFn: editUserDetails,
    onError: (err) => {
      console.log(err, "err");
    },
  });
};

export default useEditAgent;
