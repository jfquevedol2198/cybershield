import clsx from "clsx";

export const variantStyles = {
  filled: clsx(
    "border-2 border-primary-4 bg-primary-4 text-white",
    "hover:border-primary-3 hover:bg-primary-3",
    "focus:border-dashed focus:border-primary-4",
    "active:border-primary-4 active:bg-primary-4",
    "disabled:border-disabled-cta disabled:bg-disabled-cta disabled:text-disabled-cta"
  ),
  outline: clsx(
    "border-2 border-primary-4 bg-white text-primary-4",
    "hover:border-primary-4 hover:bg-primary-4 hover:text-white",
    "focus:border-dashed focus:border-primary-4 focus:bg-primary-4 focus:text-white",
    "active:border-primary-4 active:bg-primary-4 active:text-white",
    "disabled:border-disabled-cta disabled:bg-disabled-cta disabled:text-disabled-cta"
  ),
  secondary: clsx(
    "border-2 border-secondary-3 bg-white text-secondary-3",
    "hover:border-secondary-3 hover:bg-secondary-3 hover:text-white",
    "focus:border-dashed focus:border-primary-4 focus:bg-secondary-3 focus:text-white",
    "active:border-secondary-3 active:bg-secondary-3 active:text-white",
    "disabled:border-disabled-cta disabled:bg-disabled-cta disabled:text-disabled-cta"
  ),
  text: clsx("bg-transparent text-primary-4", "disabled:text-disabled-cta"),
  secondaryText: clsx(
    "bg-transparent text-secondary-3",
    "disabled:text-disabled-cta"
  ),
  icon: clsx("bg-transparent"),
};

export const sizeStyles = {
  small: clsx("h-[48px] px-6 text-[14px]"),
  medium: clsx("h-[48px] px-6 text-[17px]"),
  large: clsx("h-[52px] px-6 text-[19px]"),
};
