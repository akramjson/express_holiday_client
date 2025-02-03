import UsersCalls from "../../api/userApi";
import { authEndpoints } from "../../libs/authEndPoints";
import { useAuthStore } from "../../Store/Auth/authStore";

const useRefreshToken = () => {
  const {
    store_access_token: store_access_token,
    store_refresh_token: store_refresh_token,
    refresh_token: token,
  } = useAuthStore();

  const refresh = async () => {
    try {
      const response = await UsersCalls.postRequest({
        url: authEndpoints.REFRESH_TOKEN_PATH,
        data: { token: token },
      });
      const { access_token, refresh_token } = response.data;

      store_access_token(access_token);

      store_refresh_token(refresh_token);
      console.log(response, "response");

      return response;
    } catch (error) {
      console.error("Error refreshing tokens:", error);
      throw error;
    }
  };

  return refresh;
};

export default useRefreshToken;
