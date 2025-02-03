import { useMutation } from "@tanstack/react-query";
import QueryString from "qs";
import { authEndpoints } from "../../libs/authEndPoints";
import { axiosInstance } from "../../libs/axios";
import { useAuthStore } from "../../Store/Auth/authStore";
import { loginSchemaType } from "../../types/login/schema";

const useLogin = () => {
  const { store_access_token, store_refresh_token, store_user } =
    useAuthStore();
  const createUser = async (formData: loginSchemaType) => {
    const data = QueryString.stringify(formData);
    const url = authEndpoints.LOGIN_PATH;
    const response = await axiosInstance.post(url, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data;
  };

  return useMutation({
    mutationFn: (data: loginSchemaType) => createUser(data),
    onSettled: (data) => {
      store_access_token(data.access_token);
      store_refresh_token(data.refresh_token);
      store_user(data.user);
      console.log(data, "data");
    },
  });
};

export default useLogin;
