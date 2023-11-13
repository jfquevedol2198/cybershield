import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import { SizeVariant } from "../../utils/constants";
import { inputStyles } from "../../utils/input-styles";

const FormControl = React.forwardRef(
  (
    { error, placeholder, className, id, label, size, inputType, ...rest },
    ref
  ) => {
    return (
      <div className={clsx("form-control", className)}>
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            className={clsx(
              "shadow-input relative flex w-full items-center rounded border bg-white",
              "hover:border-hover",
              "focus:border-focus focus:shadow-none focus:outline-none",
              "disabled:border-disabled",
              error ? "border-error" : "border-transparent",
              inputStyles[size]
            )}
            {...rest}
            placeholder={placeholder}
          />
          <label
            htmlFor={id}
            className={clsx("absolute", size, "text-disabled")}
          >
            {label}
          </label>
        </div>
        {error && <p className="mt-1 text-base text-error-2">{error}</p>}
      </div>
    );
  }
);

FormControl.displayName = "FormControl";

FormControl.defaultProps = {
  inputType: "text",
  size: SizeVariant.medium,
  className: "",
  placeholder: "placeholder",
};

FormControl.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  inputType: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
  error: PropTypes.string,
  children: PropTypes.PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default FormControl;
