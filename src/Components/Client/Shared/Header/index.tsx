import { IconType } from "react-icons";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../../../../assets";
import { LanguageSwitch, Logo, Profile } from "../../../UI";

type Link = {
  name: string;
  link: string;
  icon: IconType;
};

const ClientHeader = () => {
  const links: Link[] = [
    {
      name: "home",
      link: "/client",
      icon: assets.globalIcon,
    },
    {
      name: "my-tickets",
      link: "/client/tickets",
      icon: assets.doneIcon,
    },
  ];

  const { pathname } = useLocation();

  const isActive = (link: string) => {
    return pathname === link;
  };
  return (
    <header className="w-screen py-5 bg-primary flex items-center justify-between px-3 md:px-20">
      <Logo />
      <div className="flex items-center justify-center gap-5 ml-32">
        {links.map((item) => (
          <Link
            className={` hover:text-white ${
              isActive(item.link)
                ? "text-white font-medium underline"
                : "text-[#BFBFBD]"
            } duration-300 ease-linear flex items-center gap-2`}
            key={item.name}
            to={item.link}
          >
            <item.icon /> {item.name}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <Profile />
        <LanguageSwitch />
      </div>
    </header>
  );
};

export default ClientHeader;
