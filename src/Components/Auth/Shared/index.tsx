import { Outlet } from "react-router-dom";
import Header from "./Header";

const SharedLayout = () => {
  return (
    <div className="flex flex-col w-screen  h-screen justify-between">
      <Header />
      <div className="bg-Expresswhite h-full rounded-[1.5rem] md:rounded-[2rem]">
        <Outlet />
      </div>
      <div></div>
    </div>
  );
};

export default SharedLayout;
