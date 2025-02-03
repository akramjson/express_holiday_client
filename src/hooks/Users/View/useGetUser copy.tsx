import { useQuery } from "@tanstack/react-query";
import useAuthenticatedCalls from "../../../api/authenticatedapi";
import { clientEndpoints } from "../../../libs/clientEndpoints";

const useUser = (userId: number | undefined) => {
  const { getRequest } = useAuthenticatedCalls();
  const getUserDetails = async () => {
    const res = await getRequest({
      url: `${clientEndpoints.GET_USER_DETAILS_PATH}/${userId}`,
    });
    return res;
  };

  return useQuery({
    queryKey: ["user"],
    queryFn: getUserDetails,
    staleTime: 60 * 1000,
    gcTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useUser;
