import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import { ChildrenType } from "../../utils/types";

const NormalButton = React.forwardRef(
  ({ label, href, children, onClick, disabled, className }, ref) => {
    const Comp = href ? Link : "div";
    return (
      <Comp
        ref={ref}
        className={clsx(
          "flex cursor-pointer flex-row items-center gap-2",
          !disabled && "active:opacity-50",
          className
        )}
        onClick={() => !disabled && onClick()}
        to={href}
      >
        {label !== undefined && <>{label}</>}
        {children !== undefined && <>{children}</>}
      </Comp>
    );
  }
);

NormalButton.defaultProps = {
  className: "",
  children: undefined,
  label: undefined,
  href: undefined,
  onClick: () => {},
  disabled: false,
};

NormalButton.propTypes = {
  className: PropTypes.string,
  children: ChildrenType,
  label: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

NormalButton.displayName = "NormalButton";

export default NormalButton;
