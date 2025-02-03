import { useCallback } from "react";
import useAxiosPrivate from "../hooks/Interceptor/useAxiosPrivate";

const useAuthenticatedCalls = () => {
  const axiosPrivate = useAxiosPrivate();

  const getRequest = useCallback(
    async ({ url }: { url: string }): Promise<any> => {
      const response = await axiosPrivate.get(url);
      return response;
    },
    [axiosPrivate]
  );

  const postRequest = useCallback(
    async ({
      url,
      data,
      headers,
    }: {
      url: string;
      data: any[] | any;
      headers: any;
    }): Promise<any> => {
      const response = await axiosPrivate.post(url, data, headers);
      return response;
    },
    [axiosPrivate]
  );

  const patchRequest = useCallback(
    async ({
      url,
      data,
      headers,
    }: {
      url: string;
      data: any[] | any;
      headers: any;
    }): Promise<any> => {
      const response = await axiosPrivate.patch(url, data, headers);
      return response;
    },
    [axiosPrivate]
  );

  const deleteRequest = useCallback(
    async ({ url }: { url: string }): Promise<any> => {
      const response = await axiosPrivate.delete(url);
      return response;
    },
    [axiosPrivate]
  );

  return {
    getRequest,
    postRequest,
    patchRequest,
    deleteRequest,
  };
};

export default useAuthenticatedCalls;
