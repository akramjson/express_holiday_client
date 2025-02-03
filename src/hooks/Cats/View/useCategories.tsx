import { useQuery } from "@tanstack/react-query";
import useAuthenticatedCalls from "../../../api/authenticatedapi";
import { clientEndpoints } from "../../../libs/clientEndpoints";

const useCategories = () => {
  const { getRequest } = useAuthenticatedCalls();

  const getCategories = async () => {
    const res = await getRequest({
      url: clientEndpoints.CATEGORIES_PATH,
    });
    return res.data;
  };

  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 60 * 1000,
    gcTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useCategories;
