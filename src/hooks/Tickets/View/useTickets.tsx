import { useQuery } from "@tanstack/react-query";
import useAuthenticatedCalls from "../../../api/authenticatedapi";
import { clientEndpoints } from "../../../libs/clientEndpoints";
import { useAuthStore } from "../../../Store/Auth/authStore";

type UseTicketsProps = {
  offset: number;
  limit: number;
};
const useTickets = ({ offset, limit }: UseTicketsProps) => {
  const { access_token } = useAuthStore();
  const { getRequest } = useAuthenticatedCalls();
  const getTickets = async () => {
    const res = await getRequest({
      url: `${clientEndpoints.GET_TICKETS_PATH}?offset=${offset}&limit=${limit}`,
    });
    return res;
  };

  return useQuery({
    queryKey: ["tickets", access_token, offset, limit], // Use catId in the query key
    queryFn: getTickets, // No need to pass catId here
    staleTime: 60 * 1000,
    gcTime: 1000 * 60 * 5, // Fixed gcTime to cacheTime
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useTickets;
