import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, forwardRef, ReactNode } from "react";
import { assets } from "../../../assets";
import { cn } from "../../../utils/Cfunction";

const actionBarStyles = cva("fixed z-50 flex flex-col justify-between py-3", {
  variants: {
    variant: {
      admin: "bg-white rounded-xl border-2 border-[#E9ECEF]",
    },
  },
  defaultVariants: {
    variant: "admin",
  },
});

type ActionBarProps = ComponentProps<"div"> &
  VariantProps<typeof actionBarStyles> & {
    children: ReactNode;
    title?: string;
    onClose: () => void;
  };

const ActionBar = forwardRef<HTMLDivElement, ActionBarProps>(
  (
    { variant, onClose, className, title = "action bar", children, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(actionBarStyles({ variant }), className)}
        {...props}
      >
        <div className="border-b-[1px] border-[#01012E14] pb-2 px-4 flex items-center justify-between">
          <h2 className="capitalize font-medium">{title}</h2>
          <button onClick={onClose}>
            <assets.closeBtnIcon className="text-lg 2xl:text-xl text-gray-400" />
          </button>
        </div>
        {children}
      </div>
    );
  }
);

ActionBar.displayName = "ActionBar";

export default ActionBar;
