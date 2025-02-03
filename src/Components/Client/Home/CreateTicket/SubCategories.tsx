import { useEffect, useRef, useState } from "react";
import { assets } from "../../../../assets";
import { Skeleton } from "../../../UI";

type SubCategoriesProps = {
  selectedSubCat: string | undefined;
  onSelect: (subCat: string) => void;
  isLoading: boolean;
  subCategories: string[];
};

const SubCategories = ({
  isLoading,
  onSelect,
  selectedSubCat,
  subCategories,
}: SubCategoriesProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategorySelect = (category: string) => {
    onSelect(category);
    setIsOpen(false);
  };

  if (isLoading) {
    return (
      <div className="w-full space-y-2">
        <Skeleton className="h-5 w-24" /> {/* Label skeleton */}
        <Skeleton className="h-10 w-full" /> {/* Input skeleton */}
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className="w-full relative">
      <label className="text-sm font-medium text-gray-700 mb-1 block">
        ticket category <span className="text-red-500">*</span>
      </label>

      <div
        className={`w-full transition-all duration-200 ease-in-out bg-white border rounded-md cursor-pointer
            ${
              isOpen
                ? "ring-2 ring-blue-500 border-transparent"
                : "border-gray-300 hover:border-gray-400"
            }
          `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="px-3 py-2 flex items-center justify-between">
          <span
            className={`block truncate ${
              !selectedSubCat ? "text-gray-500" : "text-gray-900"
            }`}
          >
            {selectedSubCat ? selectedSubCat : "Select subcategory"}
          </span>
          {isOpen ? <assets.arrowUpIcon /> : <assets.arrowDownIcon />}
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          <ul className="py-1">
            {subCategories?.map((subCat) => (
              <li
                key={subCat}
                className={`px-3 py-2 cursor-pointer text-sm hover:bg-gray-100 transition-colors
                    ${
                      selectedSubCat === subCat
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-900"
                    }
                  `}
                onClick={() => handleCategorySelect(subCat)}
              >
                {subCat}
              </li>
            ))}
            {subCategories?.length === 0 && (
              <li className="px-3 py-2 text-sm text-gray-500">
                No categories available
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SubCategories;
