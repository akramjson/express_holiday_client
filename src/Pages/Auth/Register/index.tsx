import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  RegisterPassword,
  RegisterUserInfo,
} from "../../../Components/Auth/Register";
import RegisterFormWrapper from "../../../Components/Auth/Register/RegisterFormWrapper/index.tsx";
import { Button, Informer } from "../../../Components/UI/index.tsx";
import Modal from "../../../Components/UI/Modal/index.tsx";
import useCreateUser from "../../../hooks/Register/Create/useCreateUser.tsx";
import { useMultiStepForm } from "../../../hooks/Register/mutiForm/useMultiStepForm.tsx";
import {
  RegisterSchema,
  registerSchemaType,
} from "../../../types/Register/schema";

const Register = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    trigger,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<registerSchemaType>({
    resolver: zodResolver(RegisterSchema),
  });
  const navigate = useNavigate();

  const steps = [
    {
      component: <RegisterUserInfo register={register} errors={errors} />,
    },
    {
      component: <RegisterPassword register={register} errors={errors} />,
    },
  ];

  const stepComponents = steps.map((step) => step.component);
  const { currentStepIndex, next, back } = useMultiStepForm(stepComponents);
  const createUserMutation = useCreateUser();

  const onSubmit: SubmitHandler<registerSchemaType> = (data) => {
    createUserMutation.mutate(data, {
      onSuccess: () => {
        setInformer({
          title: "Success!",
          description: "Your account was created successfully.",
          type: "success",
          isActive: true,
        });
        setTimeout(() => {
          setIsOpen(true);
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

  const handleNextStep = async () => {
    const isStepValid = await trigger();
    if (isStepValid) {
      if (currentStepIndex === steps.length - 1) {
        handleSubmit(onSubmit)();
      } else {
        next();
      }
    }
  };

  return (
    <>
      <div className="flex w-full h-full items-center justify-center overflow-hidden bg-Expresswhite-100">
        <div className="flex flex-col gap-4 px-5 py-4 w-[90%] sm:w-[70%] md:w-[50%] bg-white lg:w-[40%] xl:w-[30%] shadow-xl rounded-3xl">
          <RegisterFormWrapper currentStepIndex={currentStepIndex}>
            <div className="flex flex-col gap-1 w-full">
              <h2 className="text-header01 text-black">Sign up for Support</h2>
              <p className="text-body02 text-neutral2">
                Easily connect with our team and manage your agency's help
                requests.{" "}
              </p>
            </div>
            <form className="flex flex-col gap-1">
              {steps[currentStepIndex].component}
              <Button
                type="button"
                variant={"solid"}
                onClick={handleNextStep}
                isLoading={createUserMutation.isPending}
                disabled={createUserMutation.isPending}
                className="w-full mt-4"
              >
                {currentStepIndex === 0 ? "Continue" : "Register your account"}
              </Button>
              <Button
                type="button"
                variant={"outline"}
                className="w-full mt-2"
                onClick={() => currentStepIndex === 1 && back()} // Fix: call back() function
              >
                {currentStepIndex === 1 ? (
                  <h2>Previous</h2>
                ) : (
                  <Link to={"/"}>I have an account</Link>
                )}
              </Button>
            </form>
          </RegisterFormWrapper>
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
      {isOpen && (
        <div className="overlay">
          <Modal title="email sent" onClose={() => setIsOpen(false)}>
            <div className="flex flex-col gap-4 p-4">
              <h2 className="text-xl font-medium capitalize">
                we sent you am email check your inbox to confirm your account
              </h2>
              <Button onClick={() => navigate("/")} variant={"solid"}>
                go back to login
              </Button>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default Register;
