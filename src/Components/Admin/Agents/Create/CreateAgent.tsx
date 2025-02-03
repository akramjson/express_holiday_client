import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { assets } from "../../../../assets";
import useCreateAgent from "../../../../hooks/Agents/Create/useCreateAgent";
import useCategories from "../../../../hooks/Cats/View/useCategories";
import {
  RegisterSchema,
  registerSchemaType,
} from "../../../../types/Register/schema";
import Categories from "../../../Client/Home/CreateTicket/Categories";
import { Button, Informer, Input } from "../../../UI";
import Modal from "../../../UI/Modal";

type CreateAgentProps = {
  onClose: () => void;
};

const CreateAgent = ({ onClose }: CreateAgentProps) => {
  const [selectedCat, setSelectedCat] = useState("");
  const { data: cats, isPending } = useCategories();
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

  console.log(selectedCat, "selected cat");

  const onSelect = (cat: string) => {
    setSelectedCat(cat);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
  } = useForm<registerSchemaType>({
    resolver: zodResolver(RegisterSchema),
  });

  const createAgentMutation = useCreateAgent();

  const onSubmit: SubmitHandler<registerSchemaType> = (data) => {
    console.log(data, "data");

    createAgentMutation.mutate(
      {
        ...data,
        category: selectedCat,
      },
      {
        onSuccess: () => {
          setInformer({
            title: "Agent is created successfully",
            description: "You have successfully created an angent",
            type: "success",
            isActive: true,
          });
          setTimeout(() => {
            onClose();
          }, 300);
        },
        onError: (err: any) => {
          setError("root", {
            message: err.response?.data?.detail || "an error occurred",
          });
          setInformer({
            title: "Failed to create project",
            description: err.response?.data?.detail?.msg
              ? err.response?.data?.detail || "An error occurred"
              : "error",
            type: "error",
            isActive: true,
          });
          setTimeout(() => {
            clearErrors("root");
          }, 1000);
        },
      }
    );
  };

  return (
    <div className="overlay">
      <Modal title="Create an Agent" onClose={onClose}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-between"
        >
          <div className="flex flex-col gap-4 h-full px-2 py-4">
            <div className="flex items-center gap-5">
              <Input
                label="first name"
                variant="solid"
                required
                icon={assets.doneIcon}
                placeholder="Enter first name"
                className="h-[35px] w-full"
                {...register("first_name")}
                error={errors.first_name?.message}
              />
              <Input
                label="last name"
                variant="solid"
                required
                icon={assets.doneIcon}
                placeholder="Enter last name"
                className="h-[35px] w-full"
                {...register("last_name")}
                error={errors.last_name?.message}
              />
            </div>
            <Input
              label="email"
              variant="solid"
              required
              icon={assets.doneIcon}
              placeholder="Enter email"
              className="h-[35px] w-full"
              {...register("email")}
              error={errors.email?.message}
            />
            <Categories
              categories={cats}
              selectedCat={selectedCat}
              isLoading={isPending}
              onSelect={onSelect}
            />
            <Input
              label="phone number"
              variant="solid"
              required
              icon={assets.doneIcon}
              placeholder="Enter phone number"
              className="h-[35px] w-full"
              {...register("phone_number")}
              error={errors.phone_number?.message}
            />
            <Input
              label="password"
              variant="solid"
              type="password"
              required
              icon={assets.doneIcon}
              placeholder="Enter password"
              className="h-[35px] w-full"
              {...register("password")}
              error={errors.password?.message}
            />
            <Input
              label="confirm password"
              variant="solid"
              type="password"
              required
              icon={assets.doneIcon}
              placeholder="Enter password"
              className="h-[35px] w-full"
              {...register("confirm_password")}
              error={errors.confirm_password?.message}
            />
            <p className="text-sm text-[#CED4DA] w-[90%]">
              Once submitted, the project will be created, and the assigned
              manager will receive a notification.
            </p>
          </div>

          <Button
            type="submit"
            variant="solid"
            size="md"
            className="w-[90%] mx-auto"
            isLoading={createAgentMutation.isPending}
            disabled={createAgentMutation.isPending}
          >
            Submit Invitations
          </Button>
        </form>
      </Modal>
      <Informer
        description={informer.description}
        isActive={informer.isActive}
        title={informer.title}
        type={informer.type}
        direction="bottom-left"
        onClose={() =>
          setInformer((prev) => ({
            ...prev,
            isActive: false,
          }))
        }
      />
    </div>
  );
};

export default CreateAgent;
