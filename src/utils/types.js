import PropTypes from "prop-types";

export const ChildrenType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
]);

export const DropdownSelectItemDataType = PropTypes.shape({
  label: PropTypes.string,
  value: PropTypes.string,
});

export const DropdownSelectDataType = {
  data: PropTypes.arrayOf(DropdownSelectItemDataType),
  onSelect: PropTypes.func,
};
