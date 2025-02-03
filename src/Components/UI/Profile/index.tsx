import { useState } from "react";
import { useAuthStore } from "../../../Store/Auth/authStore";
import { assets } from "../../../assets";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, clearSession } = useAuthStore();
  return (
    <div
      onClick={() => setIsOpen((prev) => !prev)}
      className="flex relative items-center gap-4 py-2 px-3 cursor-pointer rounded-md bg-secondary"
    >
      <assets.emailIcon className=" text-white text-lg" />
      <h2 className="text-white font-medium">
        {user.first_name} {user.last_name}
      </h2>
      {isOpen ? (
        <assets.arrowUpIcon className="text-white" />
      ) : (
        <assets.arrowDownIcon className="text-white" />
      )}
      {isOpen && (
        <div className="min-w-[200px] min-h-[100px] bg-primary shadow-md rounded-md absolute top-12 left-1 flex flex-col gap-2 items-center justify-center">
          <div className="flex flex-col  items-center">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="uppercase font-bold">
                {user.first_name?.slice(0, 1)}
                {user.last_name?.slice(0, 1)}
              </span>
            </div>
            <h2 className="flex text-white capitalize font-medium">
              {user.first_name} {user.last_name}
            </h2>
            <span className="text-gray-300">{user.email}</span>
          </div>
          <button
            onClick={clearSession}
            className="bg-white w-full text-primary font-bold capitalize py-3 hover:bg-primary hover:text-white duration-300 ease-linear"
          >
            log out
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
