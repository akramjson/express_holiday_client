import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form"; // Importing useForm and SubmitHandler
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Informer, Input } from "../../../Components/UI";
import useResetPwd from "../../../hooks/Resetpwd/useResetPwd";
import { resetPwdSchematype } from "../../../types/Reset/schema"; // Importing the correct type

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  // Using the mutation hook here
  const resetPwdMutation = useResetPwd(token);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<resetPwdSchematype>(); // Setting up useForm
  const [informer, setInformer] = useState({
    title: "",
    description: "",
    type: "success" as "success" | "error",
    isActive: false,
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<resetPwdSchematype> = (data) => {
    resetPwdMutation.mutate(data, {
      onSuccess: () => {
        setInformer({
          title: "Success!",
          description: "Your password has been successfully reset.",
          type: "success",
          isActive: true,
        });
        setTimeout(() => {
          navigate("/");
        }, 500);
      },
      onError: () => {
        setInformer({
          title: "Error!",
          description: "There was an issue resetting your password.",
          type: "error",
          isActive: true,
        });
      },
    });
  };

  return (
    <>
      <div className="flex flex-col gap-4 items-center justify-center w-screen h-screen">
        <div className="bg-white shadow-md min-w-[30%] p-4 flex flex-col gap-3 rounded-md">
          <h2 className="text-3xl font-semibold text-primary">
            Reset your password
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <Input
              type="password"
              variant={"solid"}
              label="new password"
              {...register("new_password")}
              error={errors?.new_password?.message}
              placeholder="Enter your password"
            />
            <div className="flex flex-col space-y-3">
              <Button
                isLoading={resetPwdMutation.isPending}
                disabled={resetPwdMutation.isPending}
                variant={"solid"}
              >
                Send your email
              </Button>
              <Button variant={"outline"} onClick={() => navigate("/")}>
                Back to login
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Informer
        title={informer.title}
        description={informer.description}
        type={informer.type}
        isActive={informer.isActive}
        onClose={() =>
          setInformer((prev) => ({
            ...prev,
            isActive: false,
          }))
        }
      />
    </>
  );
};

export default ResetPasswordPage;
