import { useEffect, useRef, useState } from "react";
import { assets } from "../../../../assets";
import { SortConfig, TableColumn } from "../types/table";

type TableDataHeadItemProps = {
  col: TableColumn;
  onSort: (key: string) => void;
  sortConfig: SortConfig;
};

const TableDataHeadItem = ({
  col,
  onSort,
  sortConfig,
}: TableDataHeadItemProps) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="relative flex items-center gap-2 justify-start flex-1"
      ref={sortRef}
    >
      <div className="flex items-center gap-2 text-gray-600 font-medium">
        {col.Icon && col.iconPosition === "left" && (
          <col.Icon className="text-sm text-gray-400" />
        )}
        <span className="capitalize text-sm">{col.label}</span>
      </div>

      {col.sort && (
        <div className="relative">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="group rounded-md hover:bg-gray-200 transition-colors"
          >
            <assets.arrowDownIcon className="text-sm text-gray-400 group-hover:text-gray-600" />
          </button>

          {isSortOpen && (
            <div className="absolute right-0 top-8 z-50 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1 overflow-hidden">
              {col.sort.availableOptions?.map((option) => (
                <button
                  key={option.key}
                  onClick={() => {
                    onSort(col.key);
                    setIsSortOpen(false);
                  }}
                  className={`w-full ${
                    sortConfig.key?.toLowerCase() === col.key?.toLowerCase() &&
                    sortConfig.direction === option.key
                      ? "text-black bg-gray-200"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  } px-3 py-2 text-sm text-left   transition-colors`}
                >
                  <div className="flex items-center gap-2">
                    <span>{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TableDataHeadItem;
