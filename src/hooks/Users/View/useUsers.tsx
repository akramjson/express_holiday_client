import { useQuery } from "@tanstack/react-query";
import useAuthenticatedCalls from "../../../api/authenticatedapi";
import { clientEndpoints } from "../../../libs/clientEndpoints";

type UseUsersProps = {
  role: "client" | "agent" | "admin";
  offset?: number;
  limit?: number;
};

const useUsers = ({ role, offset = 0, limit = 10 }: UseUsersProps) => {
  const { getRequest } = useAuthenticatedCalls();

  const getUsers = async () => {
    const res = await getRequest({
      url: `${clientEndpoints.GET_USER_DETAILS_PATH}?role=${role}&offset=${offset}&limit=${limit}`,
    });
    return res;
  };

  return useQuery({
    queryKey: ["users", role, offset, limit],
    queryFn: getUsers,
    staleTime: 60 * 1000, // Cache data for 1 minute
    gcTime: 1000 * 60 * 5, // Keep cached data for 5 minutes
    refetchOnMount: true, // Refetch when component mounts
    refetchOnWindowFocus: true, // Refetch when window focus
    retry: 3, // Retry 3 times on failure
  });
};

export default useUsers;
