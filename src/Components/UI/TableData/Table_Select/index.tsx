import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, forwardRef } from "react";
import { assets } from "../../../../assets";
import { cn } from "../../../../utils/Cfunction";

const tableSelectStyles = cva(
  [
    "relative",
    "w-5",
    "h-5",
    "rounded-md",
    "border-2",
    "border-[#CED4DA]",
    "bg-[#F8F9FA]",
    "hover:border-[#E9ECEF]",
    "hover:bg-white",
    "duration-300",
    "ease-linear",
  ],
  {
    variants: {
      state: {
        selected:
          "text-white bg-[#000000] border-none hover:bg-[#000000] flex items-center justify-center",
      },
    },
  }
);

type TableSelectProps = ComponentProps<"button"> &
  VariantProps<typeof tableSelectStyles> & {
    isSelected?: boolean;
    onSelect: () => void;
  };

const TableSelect = forwardRef<HTMLButtonElement, TableSelectProps>(
  ({ state, className, isSelected = false, onSelect, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          tableSelectStyles({
            state: isSelected ? "selected" : undefined,
          }),
          className
        )}
        onClick={onSelect}
        {...props}
      >
        {isSelected && <assets.closeBtnIcon className="text-lg" />}
      </button>
    );
  }
);

TableSelect.displayName = "TableSelect";

export default TableSelect;
