import { useState } from "react";
import { assets } from "../../../../assets";
import useRemoveAgent from "../../../../hooks/Agents/Remove/useRemoveAgent";
import { userSchemaType } from "../../../../types/User/schema";
import { Button, Informer } from "../../../UI";
import Modal from "../../../UI/Modal";

type RemoveUserProps = {
  agent: userSchemaType;
  onClose: () => void;
};

const RemoveAgent = ({ agent, onClose }: RemoveUserProps) => {
  const removeProjectMutatoin = useRemoveAgent(agent?.user_id);
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

  const handleDelete = () => {
    removeProjectMutatoin.mutate(undefined, {
      onSuccess: () => {
        setInformer({
          isActive: true,
          title: "Removed Successfully",
          description: "Agent has been removed successfully",
          type: "success",
        });
        setTimeout(() => {
          onClose();
        }, 1000);
      },
      onError: (err: any) => {
        setInformer({
          isActive: true,
          title: "Error Agent not Removed",
          // description: err.response?.data?.detail,
          description: "error",
          type: "error",
        });
        setTimeout(() => {
          onClose();
        }, 1000);
      },
    });
  };
  return (
    <div className="overlay">
      <Modal title="Delete Project?" onClose={onClose}>
        <div className="flex flex-col gap-3 px-4 py-2">
          <p className="text-black text-sm">
            Are you sure you want to delete
            <span className="font-medium">
              {agent.first_name} {agent.last_name} ?
            </span>
            project This action cannot be undone,all data will be permanently
            removed{" "}
          </p>
          <Button
            isLoading={removeProjectMutatoin.isPending}
            disabled={removeProjectMutatoin.isPending}
            onClick={handleDelete}
            variant={"solid"}
            size={"md"}
            icon={assets.closeBtnIcon}
          >
            remove {agent.first_name} {agent.last_name}
          </Button>
        </div>
      </Modal>
      <Informer
        isActive={informer.isActive}
        description={informer.description}
        title={informer.title}
        direction="bottom-left"
        type={informer.type}
        onClose={() => {
          setInformer((prev) => ({
            ...prev,
            isActive: false,
          }));
        }}
      />
    </div>
  );
};

export default RemoveAgent;
