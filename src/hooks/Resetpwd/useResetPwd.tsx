import { useMutation } from "@tanstack/react-query";
import UsersCalls from "../../api/userApi";
import { authEndpoints } from "../../libs/authEndPoints";
import { resetPwdSchematype } from "../../types/Reset/schema";

const useResetPwd = (token: string | null) => {
  // Add async to the function to handle the await keyword correctly
  const resetPwd = async (data: resetPwdSchematype) => {
    if (!token) {
      throw new Error("Token is required for confirmation.");
    }

    // Ensure the API call is awaited properly
    const response = await UsersCalls.postRequest({
      url: `${authEndpoints.RESET_PWD_PATH}?token=${token}`,
      data: data,
    });

    return response.data; // Return the data after the API call is successful
  };

  return useMutation({
    mutationFn: (data: resetPwdSchematype) => resetPwd(data), // Use resetPwd as mutation function
    onSettled: (data) => {
      console.log(data, "data");
    },
  });
};

export default useResetPwd;
