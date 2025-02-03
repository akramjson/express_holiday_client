import { AxiosInstance } from "axios"; // Make sure to import AxiosInstance
import { useEffect } from "react";
import { axiosPrivate } from "../../libs/privateAxios";
import { useAuthStore } from "../../Store/Auth/authStore";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = (axiosInstance: AxiosInstance = axiosPrivate) => {
  const refresh = useRefreshToken();
  const access_token = useAuthStore((store) => store.access_token);

  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${access_token}`;
        }
        return config;
      },
      (error: any) => Promise.reject(error)
    );

    const responseIntercept = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: any) => {
        const prevRequest = error?.config;
        if (
          (error?.response?.status === 401 ||
            error?.response?.status === 403) &&
          !prevRequest?.sent
        ) {
          prevRequest.sent = true; // Mark the request as already attempted
          try {
            const newAccessToken = await refresh(); // Get a new access token
            prevRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken.data.access_token}`;

            return axiosInstance(prevRequest); // Retry the original request with the new token
          } catch (refreshError) {
            return Promise.reject(refreshError); // Handle errors from the refresh process
          }
        }

        return Promise.reject(error); // Reject any other errors
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
    };
  }, [access_token, refresh, axiosInstance]);

  return axiosInstance;
};

export default useAxiosPrivate;
