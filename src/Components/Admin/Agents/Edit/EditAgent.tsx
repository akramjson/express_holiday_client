import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { assets } from "../../../../assets";
import useEditAgent from "../../../../hooks/Agents/Edit/useEditAgent";
import useCategories from "../../../../hooks/Cats/View/useCategories";
import { UserSchema, userSchemaType } from "../../../../types/User/schema";
import { initials } from "../../../../utils/initials/initials";
import Categories from "../../../Client/Home/CreateTicket/Categories";
import { ActionBar, Avatar, Button, Informer, Input } from "../../../UI";

type EditProjectProps = {
  agent: userSchemaType;
  onClose: () => void;
  remove: () => void;
};

const EditAgent = ({ agent, onClose, remove }: EditProjectProps) => {
  const [selectedCat, setSelectedCat] = useState(agent.category);
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
  const {
    register,
    formState: { isDirty, errors },
    handleSubmit,
    clearErrors,
  } = useForm<userSchemaType>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      first_name: agent.first_name,
      last_name: agent.last_name,
      phone_number: agent.phone_number,
      category: agent.category,
    },
  });

  const editAgentMutation = useEditAgent(agent.user_id);

  const onSelect = (cat: string) => {
    setSelectedCat(cat);
  };

  const onSubmit: SubmitHandler<userSchemaType> = (data) => {
    editAgentMutation.mutate(
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
      <ActionBar
        onClose={onClose}
        variant={"admin"}
        title="edit agent details"
        className="min-w-[20%] h-[96%] right-5"
      >
        <div className="flex flex-col gap-5 pt-10 px-3 justify-between h-full">
          <div className="flex gap-2">
            <Avatar variant={"rounded-gray"} size={"2xl"}>
              {initials(agent?.first_name, agent?.last_name)}
            </Avatar>
            <div className="flex flex-col">
              <h2 className="font-medium capitalize">
                {agent?.first_name} {agent?.last_name}
              </h2>
              <h2 className="text-[#CED4DA] flex items-center gap-2 flex-wrap">
                <assets.doneIcon />
              </h2>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col h-full justify-between"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-5">
                <Input
                  label="first name"
                  className="h-[40px] w-full capitalize"
                  variant={"solid"}
                  {...register("first_name")}
                  error={errors.first_name?.message}
                />
                <Input
                  label="last name"
                  className="h-[40px] w-full capitalize"
                  variant={"solid"}
                  {...register("last_name")}
                  error={errors.last_name?.message}
                />
              </div>
              <Input
                label="phone number"
                className="h-[40px] w-full capitalize"
                variant={"solid"}
                {...register("phone_number")}
                error={errors.phone_number?.message}
              />
              <Categories
                categories={cats}
                selectedCat={selectedCat}
                isLoading={isPending}
                onSelect={onSelect}
              />
              {/* <Select.SelectItem /> */}
            </div>
            <div className="flex flex-col items-center w-full gap-2">
              <Button
                type="submit"
                className="w-full"
                variant={`${
                  isDirty || selectedCat !== agent.category ? "solid" : "ghost"
                }`}
                disabled={!isDirty && editAgentMutation.isPending}
              >
                Save Changes
              </Button>
              <Button
                type="button"
                onClick={remove}
                className="w-full"
                variant={"outline"}
                icon={assets.closeBtnIcon}
                isLoading={editAgentMutation.isPending}
                disabled={editAgentMutation.isPending}
              >
                Remove {agent.first_name} {agent.last_name}
              </Button>
            </div>
          </form>
        </div>
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
      </ActionBar>
    </div>
  );
};

export default EditAgent;
