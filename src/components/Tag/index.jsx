import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import PropTypes from "prop-types";

import { riskLevelStyles, variantStyles } from "../../utils/tag-styles";

export const TagVariant = {
  active: "active",
  filled: "filled",
  closeable: "closeable",
  inactive: "inactive",
};

const Tag = ({ riskLevel, variant, label, onRemove }) => {
  if (riskLevel) {
    return (
      <div
        className={clsx(
          "flex h-6 w-[75px] items-center justify-center rounded-full text-sm capitalize",
          riskLevelStyles[riskLevel.label]
        )}
      >
        {riskLevel.label}
      </div>
    );
  }
  return (
    <div
      className={clsx(
        "flex flex-row items-center justify-center gap-2 rounded-full",
        variantStyles[variant]
      )}
    >
      {label}
      {variant === variant.closeable && (
        <XMarkIcon className="h-6 w-6 text-white" onClick={onRemove} />
      )}
    </div>
  );
};

Tag.defaultProps = {
  riskLevel: undefined,
  variant: PropTypes.active,
  label: "",
  onRemove: () => {},
};

Tag.propTypes = {
  riskLevel: PropTypes.shape({
    label: PropTypes.string,
    color: PropTypes.string,
  }),
  variant: PropTypes.string,
  label: PropTypes.string,
  onRemove: PropTypes.func,
};

export default Tag;
