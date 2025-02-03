import { useMutation } from "@tanstack/react-query";
import UsersCalls from "../../../api/userApi";
import { authEndpoints } from "../../../libs/authEndPoints";
import { registerSchemaType } from "../../../types/Register/schema";

const useCreateUser = () => {
  const createUser = async (data: registerSchemaType) => {
    const { confirm_password, ...newData } = {
      ...data,
      role: "client",
      category: "",
    };
    const response = await UsersCalls.postRequest({
      url: authEndpoints.CREATE_ACCOUNT_PATH,
      data: newData,
    });

    return response.data;
  };

  return useMutation({
    mutationFn: (data: registerSchemaType) => createUser(data),
    onSettled: (data) => {
      console.log(data, "data");
    },
  });
};

export default useCreateUser;
