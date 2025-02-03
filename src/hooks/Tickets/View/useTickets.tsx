import { useQuery } from "@tanstack/react-query";
import useAuthenticatedCalls from "../../../api/authenticatedapi";
import { clientEndpoints } from "../../../libs/clientEndpoints";

const useTickets = () => {
  const { getRequest } = useAuthenticatedCalls();
  const getTickets = async () => {
    const res = await getRequest({
      url: `${clientEndpoints.GET_TICKETS_PATH}`,
    });
    return res;
  };

  return useQuery({
    queryKey: ["tickets"], // Use catId in the query key
    queryFn: getTickets, // No need to pass catId here
    staleTime: 60 * 1000,
    gcTime: 1000 * 60 * 5, // Fixed gcTime to cacheTime
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useTickets;
