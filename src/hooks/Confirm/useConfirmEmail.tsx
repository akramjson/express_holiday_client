import { useQuery } from "@tanstack/react-query";
import UsersCalls from "../../api/userApi";
import { clientEndpoints } from "../../libs/clientEndpoints";

const useConfirmEmail = (token: string | null) => {
  const confirmEmail = async () => {
    if (!token) {
      throw new Error("Token is required for confirmation.");
    }

    const res = await UsersCalls.getRequest({
      url: `${clientEndpoints.CONFIRM_EMAIL_PATH}?token=${token}`,
    });

    return res?.data ?? null; // Ensure a valid return value
  };

  return useQuery({
    queryKey: ["confirm", token],
    queryFn: confirmEmail,
    enabled: !!token, // Only run the query if a valid token exists
    staleTime: 60 * 1000,
    gcTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useConfirmEmail;
