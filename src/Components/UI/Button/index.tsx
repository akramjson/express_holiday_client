// src/core/components/UI/Button.tsx
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, forwardRef } from "react";
import { IconType } from "react-icons";
import { cn } from "../../../utils/Cfunction";
import Spinner from "../Loading";

const buttonStyles = cva(
  [
    "relative", // To allow absolute positioning of the spinner
    "rounded-md",
    "focus:outline-none",
    "disabled:cursor-not-allowed",
    "duration-300",
    "text-body2",
    "ease-linear",
    "flex", // Ensures content is centered
    "items-center",
    "justify-center",
    "overflow-hidden", // Ensures spinner stays inside button bounds
    "gap-2",
    "h-[2.8125rem]",
    "px-5", // Adds space between icon and text
  ],
  {
    variants: {
      variant: {
        solid:
          "text-Expresswhite font-medium bg-primary border-2 border-primary hover:bg-third hover:border-third",
        outline:
          "border-2 border-primary bg-light-yellow text-primary font-medium hover:border-secondary hover:text-secondary hover:bg-light-red",
        ghost:
          "transition-colors duration-300 font-medium bg-white  border-2 border-neutral2  text-neutral2 hover:bg-[#D2CECE33] hover:border-neutral2",
        simple: "font-semibold underline",
      },
      state: {
        loading: "opacity-75",
      },
      size: {
        md: "h-[2.4rem]",
      },
    },
    defaultVariants: {
      variant: "solid",
    },
  }
);

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonStyles> & {
    isLoading?: boolean;
    icon?: IconType;
    iconPosition?: "left" | "right";
  };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      className,
      isLoading = false,
      children,
      icon: Icon,
      iconPosition = "left", // Default icon position is left
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          buttonStyles({
            variant,
            size,
            state: isLoading ? "loading" : undefined,
          }),
          className
        )}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {/* Render icon and text (if available) */}
            {Icon && iconPosition === "left" && (
              <Icon className="flex items-center text-2xl" />
            )}
            {children && <span>{children}</span>}
            {Icon && iconPosition === "right" && (
              <Icon className="flex items-center text-2xl" />
            )}
          </>
        )}
      </button>
    );
  }
);

export default Button;
