import clsx from "clsx";
import PropTypes from "prop-types";

import { sizeStyles, variantStyles } from "../../utils/button-styles";
import { ButtonVariant, SizeVariant } from "../../utils/constants";
import { ChildrenType } from "../../utils/types";

const Button = ({
  className,
  size,
  isBlock,
  isDisabled,
  variant,
  children,
  isSubmit,
  isLoading,
  onClick,
}) => {
  return (
    <div
      className={clsx(
        className,
        isBlock ? "flex items-center" : "inline-block"
      )}
    >
      <button
        disabled={isDisabled || isLoading}
        className={clsx(
          "relative flex flex-row items-center justify-center gap-2 disabled:cursor-not-allowed",
          variantStyles[variant],
          sizeStyles[size],
          isBlock ? "w-full" : ""
        )}
        type={isSubmit ? "submit" : "button"}
        onClick={onClick}
      >
        {isLoading && (
          <span
            className={clsx(
              "inline-block h-4 w-4 animate-spin rounded-full border-[3px] border-current border-t-transparent"
            )}
            role="status"
            aria-label="loading"
          />
        )}
        <span className="truncate">{children}</span>
      </button>
    </div>
  );
};

Button.defaultProps = {
  variant: ButtonVariant.filled,
  size: SizeVariant.medium,
  className: "",
  isSubmit: false,
  isBlock: true,
  isDisabled: false,
  isLoading: false,
};

Button.propTypes = {
  variant: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  children: ChildrenType,
  isSubmit: PropTypes.bool,
  isBlock: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
