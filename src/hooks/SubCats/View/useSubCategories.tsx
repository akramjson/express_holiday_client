import { useQuery } from "@tanstack/react-query";
import useAuthenticatedCalls from "../../../api/authenticatedapi";
import { clientEndpoints } from "../../../libs/clientEndpoints";

const useSubCategories = (catId: string | undefined) => {
  const { getRequest } = useAuthenticatedCalls();
  const getSubCategories = async () => {
    const res = await getRequest({
      url: `${clientEndpoints.SUB_CATEGORIES_PATH}${catId}/`,
    });
    return res.data;
  };

  return useQuery({
    queryKey: ["subcat", catId],
    queryFn: getSubCategories,
    enabled: false,
    staleTime: 60 * 1000,
    gcTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useSubCategories;
