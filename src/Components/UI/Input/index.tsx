import { cva, type VariantProps } from "class-variance-authority";
import { ComponentProps, forwardRef, useState } from "react";
import { IconType } from "react-icons";
import { assets } from "../../../assets";
import { cn } from "../../../utils/Cfunction";

const wrapperVariants = cva("", {
  variants: {
    wrapperVariant: {
      default: "flex flex-col",
      flexed: "flex items-center gap-3",
    },
  },
  defaultVariants: {
    wrapperVariant: "default",
  },
});

const inputVariants = cva(
  "w-full rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary duration-300 ease-linear bg-neutral-100 py-1 px-2 border-neutral1 border-[1px]",
  {
    variants: {
      variant: {
        solid:
          "rounded-md  focus:placeholder:text-[#CED4DA] border-2 placeholder:text-[#BFBFBD] bg-[#BFBFBD14] text-black focus:border-none",
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
    },
  }
);

type InputBaseProps = Omit<ComponentProps<"input">, "size" | "type">;

interface InputProps
  extends InputBaseProps,
    VariantProps<typeof inputVariants>,
    VariantProps<typeof wrapperVariants> {
  isLoading?: boolean;
  icon?: IconType;
  iconPosition?: "left" | "right";
  label?: string;
  required?: boolean;
  error?: string;
  type?: "text" | "number" | "password" | "date" | "email";
  wrapperClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant,
      size,
      wrapperVariant,
      className,
      wrapperClassName,
      isLoading = false,
      icon: Icon,
      iconPosition = "left",
      label,
      required = false,
      error,
      type = "text",
      value,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const renderIcon = (position: "left" | "right") => {
      if (!Icon || iconPosition !== position) return null;

      return (
        <Icon
          className={cn(
            "absolute text-xl",
            position === "left" ? "left-3" : "right-3",
            isFocused && variant === "solid" ? "text-primary" : "text-grayText"
          )}
        />
      );
    };

    const renderPasswordToggle = () => {
      if (type !== "password") return null;

      const PasswordIcon = isPasswordVisible
        ? assets.closeeyeIcon
        : assets.openeyeIcon;

      return (
        <button
          type="button"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          className="absolute right-3"
        >
          <PasswordIcon className="text-xl text-grayText" />
        </button>
      );
    };

    return (
      <div
        className={cn(wrapperVariants({ wrapperVariant }), wrapperClassName)}
      >
        {label && (
          <label className="mb-1 flex items-center text-body2 font-medium text-black capitalize">
            {label}
            {required && <span className="ml-1 text-secondary text-lg">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {renderIcon("left")}
          <input
            ref={ref}
            type={type === "password" && isPasswordVisible ? "text" : type}
            className={cn(
              inputVariants({ variant, size }),
              Icon && `${iconPosition === "left" ? "pl-10" : "pr-10"}`,
              error && "border-error focus:border-error",
              type === "number" && "spin-button-none",
              className
            )}
            disabled={isLoading}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          {renderPasswordToggle()}
          {renderIcon("right")}
        </div>

        {error && <p className="mt-1 text-sm text-error">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
