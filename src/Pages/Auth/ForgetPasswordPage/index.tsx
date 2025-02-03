import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Informer, Input } from "../../../Components/UI";
import useForgetPwd from "../../../hooks/Forget/useForgetPwd";
import {
  ForgetPwdSchema,
  forgetPwdSchematype,
} from "../../../types/ForgetPwd/schema";

const ForgetPasswordPage = () => {
  const [informer, setInformer] = useState<{
    title: string;
    description: string;
    type: "success" | "error";
    isActive: boolean;
  }>({
    title: "",
    description: "",
    type: "success",
    isActive: false,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<forgetPwdSchematype>({
    resolver: zodResolver(ForgetPwdSchema),
  });

  const resetPwdMutation = useForgetPwd();

  const onSubmit: SubmitHandler<forgetPwdSchematype> = (data) => {
    resetPwdMutation.mutate(data, {
      onSuccess: () => {
        setInformer({
          title: "Success!",
          description: "Your account was created successfully.",
          type: "success",
          isActive: true,
        });
      },
      onError: () => {
        setInformer({
          title: "Error!",
          description: "There was an issue creating your account.",
          type: "error",
          isActive: true,
        });
      },
    });
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col gap-4 items-center  justify-center w-screen h-screen">
        <div className="bg-white shadow-md min-w-[30%] p-4 flex flex-col gap-3 rounded-md">
          <h2 className="text-3xl font-semibold text-primary">
            Reset your password
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-4 "
          >
            <Input
              variant={"solid"}
              label="email"
              {...register("email")}
              error={errors?.email?.message}
              placeholder="Enter your email"
            />
            <div className="flex flex-col space-y-3">
              <Button
                isLoading={resetPwdMutation.isPending}
                disabled={resetPwdMutation.isPending}
                variant={"solid"}
              >
                Send your email
              </Button>
              <Button
                isLoading={resetPwdMutation.isPending}
                disabled={resetPwdMutation.isPending}
                variant={"outline"}
                onClick={() => navigate("/")}
              >
                back to login
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

export default ForgetPasswordPage;
