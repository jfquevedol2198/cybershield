import clsx from "clsx";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { ChildrenType } from "../../utils/types";

const NormalButton = ({ label, href, children, onClick, className }) => {
  const Comp = href ? Link : "div";
  return (
    <Comp
      className={clsx(
        "flex cursor-pointer flex-row items-center gap-2 active:opacity-50",
        className
      )}
      onClick={onClick}
      to={href}
    >
      {label !== undefined && <>{label}</>}
      {children !== undefined && <>{children}</>}
    </Comp>
  );
};

NormalButton.defaultProps = {
  className: "",
  children: undefined,
  label: undefined,
  href: undefined,
  onClick: () => {},
};

NormalButton.propTypes = {
  className: PropTypes.string,
  children: ChildrenType,
  label: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
};

export default NormalButton;
