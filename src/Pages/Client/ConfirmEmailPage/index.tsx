import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useConfirmEmail from "../../../hooks/Confirm/useConfirmEmail";

const ConfirmEmailPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { data, isSuccess, isPending } = useConfirmEmail(token);
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      // First show the success message
      setShowSuccess(true);

      // Then set up the redirect timer
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000); // Increased to 3 seconds to ensure users can read the message

      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  const renderContent = () => {
    if (isPending) {
      return (
        <div className="text-center">
          <h2 className="text-4xl mb-4">Confirming your email...</h2>
          <p className="text-gray-600">
            Please wait while we verify your email address
          </p>
        </div>
      );
    }

    if (showSuccess) {
      return (
        <div className="text-center">
          <h4 className="text-3xl text-primary font-bold mb-4">
            {data?.message}
          </h4>
          <p className="text-gray-600">
            Redirecting you to homepage in 3 seconds...
          </p>
        </div>
      );
    }

    return (
      <div className="text-center">
        <h2 className="text-3xl text-red-500 mb-4">Failed to confirm email</h2>
        <p className="text-gray-600">Please try again or contact support</p>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center h-screen capitalize">
      <div className="max-w-md px-6 py-8 bg-white rounded-lg shadow-md">
        {renderContent()}
      </div>
    </div>
  );
};

export default ConfirmEmailPage;
