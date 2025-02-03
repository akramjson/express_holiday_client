import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../Store/Auth/authStore";
import { decodedToken } from "../../../utils/helper";

const rolePaths = {
  admin: "/dashboard",
  agent: "/agent",
  client: "/client",
};

const SetupPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { store_user, access_token } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const setupUser = async () => {
      try {
        if (!access_token) {
          navigate("/");
          return;
        }

        const decoded = decodedToken(access_token);
        if (!decoded) {
          return;
        }

        store_user(decoded);
        const redirectPath = rolePaths[decoded.role.toLowerCase()] || "/";

        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate(redirectPath);
      } catch (error) {
        console.error("Setup failed:", error);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    setupUser();
  }, [access_token, store_user, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-300">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Setting up your account
          </h2>
          <p className="text-gray-500">
            Please wait while we prepare your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default SetupPage;
