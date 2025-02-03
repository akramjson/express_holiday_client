import { useQuery } from "@tanstack/react-query";
import useAuthenticatedCalls from "../../../api/authenticatedapi";
import { clientEndpoints } from "../../../libs/clientEndpoints";

const useComments = (ticket_id: number | undefined) => {
  const { getRequest } = useAuthenticatedCalls();
  const getTickets = async () => {
    const res = await getRequest({
      url: `${clientEndpoints.GET_TICKETS_PATH}${ticket_id}/comments/`,
    });
    return res;
  };

  return useQuery({
    queryKey: ["commnets", ticket_id], // Use catId in the query key
    queryFn: getTickets, // No need to pass catId here
    staleTime: 60 * 1000,
    gcTime: 1000 * 60 * 5, // Fixed gcTime to cacheTime
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useComments;
