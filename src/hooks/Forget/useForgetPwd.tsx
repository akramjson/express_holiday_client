import { useMutation } from "@tanstack/react-query";
import UsersCalls from "../../api/userApi";
import { authEndpoints } from "../../libs/authEndPoints";
import { forgetPwdSchematype } from "../../types/ForgetPwd/schema";

const useForgetPwd = () => {
  // Add async to the function to handle the await keyword correctly
  const forgetPwd = async (data: forgetPwdSchematype) => {
    // Ensure the API call is awaited properly
    const response = await UsersCalls.postRequest({
      url: authEndpoints.FORGET_PWD_PATH,
      data: data,
    });

    return response.data; // Return the data after the API call is successful
  };

  return useMutation({
    mutationFn: (data: forgetPwdSchematype) => forgetPwd(data), // Use resetPwd as mutation function
    onSettled: (data) => {
      console.log(data, "data");
    },
  });
};

export default useForgetPwd;
