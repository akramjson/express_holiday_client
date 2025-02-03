import { ComponentProps, forwardRef } from "react";

type TextAreaProps = ComponentProps<"textarea"> & {
  isLoading?: boolean;
  label?: string;
  required?: boolean;
  error?: string;
  info?: string; // Info tooltip text
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      isLoading = false,
      label,
      required = false,
      error,
      info,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col">
        {/* Label with required asterisk */}
        {label && (
          <label className="mb-1 flex items-center text-body02  text-black capitalize">
            {label}
            {required && <span className="ml-1 text-black text-2xl">*</span>}
          </label>
        )}

        {/* TextArea */}
        <div className="relative">
          <textarea
            ref={ref} // Forward the ref here
            className={`
              bg-neutral-100 py-1 px-2 border-neutral1 border-[1px] rounded-md
              focus:outline-none focus:ring-2 focus:ring-primary transition
              ${error ? "border-danger focus:border-danger" : ""}
              ${className || ""}
            `}
            disabled={isLoading}
            {...props}
          />
        </div>

        {/* Error message */}
        {error && <p className="mt-1 text-sm text-danger">{error}</p>}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
