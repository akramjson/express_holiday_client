import { Outlet } from "react-router-dom";
import AgentHeader from "./Header";

const AgentSharedLayout = () => {
  return (
    <div className="hidden lg:flex  w-screen flex-col">
      <AgentHeader />
      <div className="bg-Expresswhite rounded-[1.5rem] md:rounded-[2rem] min-h-screen py-10">
        <Outlet />
      </div>
    </div>
  );
};

export default AgentSharedLayout;
