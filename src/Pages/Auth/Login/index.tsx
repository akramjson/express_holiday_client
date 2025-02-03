import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../../assets";
import { Button, Informer, Input } from "../../../Components/UI";
import useLogin from "../../../hooks/Login/useLogin";
import { LoginSchema, loginSchemaType } from "../../../types/login/schema";

const LoginPage = () => {
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
  } = useForm<loginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      grant_type: "password",
    },
  });

  const loginMutation = useLogin();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<loginSchemaType> = (data) => {
    console.log(data);
    loginMutation.mutate(data, {
      onSuccess: () => {
        setInformer({
          title: "Success!",
          description: "Your account was created successfully.",
          type: "success",
          isActive: true,
        });
        setTimeout(() => {
          navigate("/setup");
        }, 1000);
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

  return (
    <>
      <div className="flex w-full h-full items-center justify-center overflow-hidden">
        <div className="flex flex-col gap-4 px-5 py-4 w-[90%] sm:w-[70%] md:w-[50%] bg-Expresswhite lg:w-[40%] xl:w-[30%] shadow-2xl rounded-[1.5rem]">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold">Login to your account</h2>
            <p className="font-medium">
              Need support? Log in to the ExpressHoliday Help Desk and get
              assistance tailored for your agency
            </p>
          </div>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-2 w-full">
              <Input
                className="w-full"
                label="username"
                required
                type="text"
                placeholder="ahmedkarim"
                icon={assets.emailIcon}
                {...register("username")}
                error={errors.username?.message}
              />
              <Input
                className="w-full"
                label="password"
                required
                placeholder="*********"
                type="password"
                icon={assets.passwordIcon}
                {...register("password")}
                error={errors.password?.message}
              />
            </div>
            <div className="flex items-center justify-end">
              <Button variant={"simple"} disabled={loginMutation.isPending}>
                <Link to={"forget_password"}>Forgot your password?</Link>
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                type="submit"
                variant={"solid"}
                className="w-full"
                isLoading={loginMutation.isPending}
                disabled={loginMutation.isPending}
              >
                Login
              </Button>
              <Button
                type="button"
                variant={"outline"}
                className="w-full"
                disabled={loginMutation.isPending}
                onClick={() => navigate("register")}
              >
                Create new account
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

export default LoginPage;
