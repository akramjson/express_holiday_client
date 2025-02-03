import React, { useRef, useState } from "react";
import { assets } from "../../../assets";

type Option = {
  key: string;
  label: string;
  [key: string]: any; // Allow for additional properties
};

type SelectInputProps = {
  options: Option[];
  title?: string;
  onChange: (option: Option) => void;
  className?: string;
  disabled?: boolean;
  placeholder: string;
  value?: Option | null;
  displayKey?: keyof Option;
};

const SelectOption = ({
  options = [],
  placeholder,
  onChange,
  value,
  title,
  className = "",
  disabled = false,
  displayKey = "label",
}: SelectInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
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

  const handleSelect = (option: Option) => {
    onChange(option); // Call onChange to update the parent component's state
    setIsOpen(false);
  };

  const displayValue = value ? value[displayKey] : title || placeholder;

  return (
    <div ref={dropdownRef} className={`relative w-full ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full px-4 py-2 text-left bg-white border rounded-lg shadow-sm flex items-center justify-between
          ${
            disabled
              ? "cursor-not-allowed bg-gray-50"
              : "cursor-pointer hover:border-gray-400 duration-200 ease-linear"
          }
          ${isOpen ? "border-gray-400" : "border-gray-200"}
        `}
      >
        <span
          className={
            value || title
              ? "text-gray-900 font-medium capitalize"
              : "text-gray-400 font-medium capitalize"
          }
        >
          {displayValue}
        </span>

        <span className="text-lg text-gray-400">
          {isOpen ? <assets.arrowUpIcon /> : <assets.arrowDownIcon />}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 w-[60%] bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="max-h-60 overflow-y-auto">
            {options.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No options found
              </div>
            ) : (
              <div className="flex flex-col gap-1 px-2 py-2">
                {options.map((option: Option) => (
                  <div
                    key={option.key}
                    onClick={() => handleSelect(option)}
                    className={`px-4 py-2 flex gap-2 items-center cursor-pointer hover:bg-gray-100 duration-300 ease-linear
                    `}
                  >
                    <h2
                      className={`capitalize text-sm font-medium ${
                        option.key === value?.key
                          ? "text-black"
                          : "text-gray-500"
                      } `}
                    >
                      {option[displayKey]}
                    </h2>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectOption;
