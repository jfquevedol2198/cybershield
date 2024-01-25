import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import PropTypes from "prop-types";

import { riskLevelStyles, variantStyles } from "../../utils/tag-styles";

export const TagVariant = {
  positive: "positive",
  closeable: "closeable",
  inactive: "inactive",
  content: "content",
};

const Tag = ({
  riskLevel,
  variant,
  label,
  onRemove,
  onSelect,
  isSelected,
  showValue,
}) => {
  if (riskLevel) {
    return (
      <div
        className={clsx(
          "flex h-6 w-[75px] items-center justify-center rounded-full text-sm capitalize",
          riskLevelStyles[riskLevel.label]
        )}
      >
        {label && showValue ? label : riskLevel.label}
      </div>
    );
  }
  return (
    <div
      className={clsx(
        "flex flex-row items-center justify-center gap-2 rounded-full",
        variantStyles[variant],
        isSelected && "border border-blue-500"
      )}
      onClick={() => {
        onSelect && onSelect(label);
        onRemove && onRemove();
      }}
    >
      {label}
      {variant === TagVariant.closeable && (
        <XMarkIcon className="h-6 w-6 text-white" />
      )}
    </div>
  );
};

Tag.defaultProps = {
  riskLevel: undefined,
  variant: PropTypes.active,
  label: "",
  onRemove: undefined,
  onSelect: undefined,
  isSelected: false,
  showValue: false,
};

Tag.propTypes = {
  riskLevel: PropTypes.shape({
    label: PropTypes.string,
    color: PropTypes.string,
  }),
  variant: PropTypes.string,
  label: PropTypes.string,
  onRemove: PropTypes.func,
  onSelect: PropTypes.func,
  isSelected: PropTypes.bool,
  showValue: PropTypes.bool,
};

export default Tag;
