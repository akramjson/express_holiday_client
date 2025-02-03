import { initials } from "../../../../utils/initials/initials";
import { Avatar } from "../../../UI";

type ProjectNameProps = {
  first_name: string | undefined;
  last_name: string | undefined;
};

const ProjectName = ({ first_name, last_name }: ProjectNameProps) => {
  const memberInitials = initials(first_name, last_name);

  return (
    <div className="flex items-center gap-2">
      <Avatar variant={"rounded-gray"} size={"md"}>
        {memberInitials}
      </Avatar>
      <div className="flex capitalize items-center gap-1 text-[#0B090A] font-medium text-sm">
        <h2>
          {first_name} {last_name}
        </h2>
      </div>
    </div>
  );
};

export default ProjectName;
