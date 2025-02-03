import { useState } from "react";
import { useTranslation } from "react-i18next";
import { assets } from "../../../assets";

const LanguageSwitch = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const languages: Record<string, { nativeName: string; name: string }> = {
    en: { nativeName: "English", name: "en" },
    fr: { nativeName: "French", name: "fr" },
  };
  const { i18n } = useTranslation();

  const currentLanguage = i18n.resolvedLanguage || "en"; // Default to 'en' if not found

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div className="relative">
      {/* Button for Language Switch */}
      <div className="flex items-center justify-center gap-3 bg-[#BFBFBD26] px-2 py-2 rounded-full">
        <assets.globalIcon className="text-Expresswhite text-2xl" />
        <h4 className="text-Expresswhite uppercase font-medium">
          {languages[currentLanguage]?.name || "EN"}
        </h4>
        <button
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle language menu"
          className="flex items-center justify-center px-1 py-1 rounded-md bg-[#bfbfbd79] duration-300 ease-linear"
        >
          {isMenuOpen ? (
            <assets.arrowUpIcon className="text-white" />
          ) : (
            <assets.arrowDownIcon className="text-white" />
          )}
        </button>
      </div>

      {/* Language Menu */}
      {isMenuOpen && (
        <div className="absolute top-[100%] mt-2 right-0 w-auto bg-primary rounded-md shadow-md border border-primary flex flex-col gap-2 z-10 transition-opacity duration-300">
          {Object.keys(languages).map((lng) => (
            <button
              key={lng}
              onClick={() => {
                i18n.changeLanguage(lng);
                setIsMenuOpen(false);
              }}
              className={`py-2 px-5 text-left ${
                currentLanguage === lng
                  ? "font-bold text-primary bg-white"
                  : "text-gray-200 hover:bg-white hover:text-primary hover:font-medium duration-300 ease-linear"
              } rounded`}
            >
              {languages[lng].nativeName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitch;
