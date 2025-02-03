import { useState } from "react";
import { userSchemaType } from "../../../types/User/schema";
import { Button } from "../../UI";
import CreateAgent from "./Create/CreateAgent";
import AgentsTable from "./Table";

type AgentsProps = {
  agents: userSchemaType[];
  isPending: boolean;
};
const Agents = ({ agents, isPending }: AgentsProps) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <div className="flex items-center justify-end">
        <Button
          variant={"solid"}
          className="capitalize"
          onClick={() => setOpen(true)}
        >
          create agent
        </Button>
      </div>
      <AgentsTable
        agents={agents}
        onOpen={() => setOpen(true)}
        isPending={isPending}
      />
      {isOpen && <CreateAgent onClose={() => setOpen(false)} />}
    </>
  );
};

export default Agents;
