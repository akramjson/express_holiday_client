import { useEffect, useRef, useState } from "react";
import { assets } from "../../../../assets";
import { Option } from "../types/table";

type TableOptionMenuProps = {
  options: () => Option[]; // Change to function that returns options
};

const TableOptionMenu = ({ options }: TableOptionMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get options by calling the function
  const menuOptions = options();

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full p-1.5 text-gray-600 hover:bg-gray-100 transition-colors duration-200"
      >
        <assets.closeeyeIcon className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          {menuOptions?.map((option) => (
            <button
              key={option.name}
              onClick={() => {
                option.action();
                setIsOpen(false); // Close menu after action
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 capitalize transition-colors duration-200"
            >
              {option.Icon && (
                <option.Icon
                  className={`w-4 h-4 ${
                    option.iconPosition === "right" ? "order-last" : ""
                  }`}
                />
              )}
              <span>{option.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TableOptionMenu;
