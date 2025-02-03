import { LanguageSwitch, Logo } from "../../../UI";

const Header = () => {
  return (
    <header className="w-screen py-5 bg-primary flex items-center justify-between px-3 md:px-10">
      <Logo />
      <LanguageSwitch />
    </header>
  );
};

export default Header;
