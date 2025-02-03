import { useQuery } from "@tanstack/react-query";
import useAuthenticatedCalls from "../../../api/authenticatedapi";
import { clientEndpoints } from "../../../libs/clientEndpoints";

const useInputs = (subCat: string | undefined) => {
  const { getRequest } = useAuthenticatedCalls();

  const getInputs = async () => {
    const res = await getRequest({
      url: `${clientEndpoints.INPUTS_PATH}${subCat}`,
    });
    return res.data;
  };

  return useQuery({
    queryKey: ["inputs"],
    queryFn: getInputs,
    enabled: false,
    staleTime: 60 * 1000,
    gcTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useInputs;
