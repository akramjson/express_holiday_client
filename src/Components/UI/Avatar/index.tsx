import { cva, type VariantProps } from "class-variance-authority";
import { ComponentProps, forwardRef } from "react";
import { cn } from "../../../utils/Cfunction";
import "./profile.css";

const profileStyles = cva(
  // Base styles that apply to all variants
  "flex cursor-pointer items-center justify-center text-[1rem] font-bold uppercase transition-colors duration-200",
  {
    variants: {
      variant: {
        rec: "border-2 border-[#F3F3F3] grad-color rounded-md text-white",
        rounded: "border-2 border-[#F3F3F3] grad-color rounded-full text-white",
        "rounded-gray":
          "bg-[#D9D9D91F] border-[#D9D9D91F] text-[#CED4DA] rounded-full shadow-sm",
      },
      size: {
        sm: "h-[1.75rem] w-[1.75rem]",
        md: "h-[2.25rem] w-[2.25rem]",
        lg: "h-[2.5rem] w-[2.5rem]",
        xl: "h-[2.5rem] w-[2.5rem] lg:h-[3rem] lg:w-[3rem]",
        "2xl": "h-[3rem] w-[3rem] lg:h-[3.5rem] lg:w-[3.5rem]",
        "3xl": "h-[3.5rem] w-[3.5rem] lg:h-[5rem] lg:w-[5rem]",
      },
    },
    defaultVariants: {
      variant: "rec",
      size: "sm",
    },
  }
);

interface ProfileProps
  extends Omit<ComponentProps<"div">, "size">,
    VariantProps<typeof profileStyles> {}

const Avatar = forwardRef<HTMLDivElement, ProfileProps>(
  ({ variant, size, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          profileStyles({
            variant,
            size,
          }),
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

// Add display name for dev tools

export default Avatar;
