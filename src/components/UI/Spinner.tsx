import { tv } from "tailwind-variants";

const spinner = tv({
  base: "animate-spin rounded-full",
  variants: {
    color: {
      primary: "border-mainColor",
      danger: "border-mainRed",
    },
    size: {
      small: "h-4 w-4 border-b-2",
      medium: "h-6 w-6 border-b-4",
      large: "h-8 w-8 border-b-4",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "medium",
  },
});

const Spinner = ({
  variant = "primary",
  size = "medium",
  className,
}: {
  variant?: "primary" | "danger";
  size?: "small" | "medium" | "large";
  className?: string;
}) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={spinner({
          color: variant,
          size: size,
        })}
      ></div>
    </div>
  );
};

export default Spinner;
