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

export const DonutChartItemDataType = PropTypes.shape({
  value: PropTypes.number,
  onClick: PropTypes.func,
});

export const DonutChartDataType = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  innerRadius: PropTypes.number,
  outerRadius: PropTypes.number,
  data: PropTypes.arrayOf(DonutChartItemDataType),
};

export const StackedAreaChartDataType = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  colors: PropTypes.shape(PropTypes.any),
  data: PropTypes.arrayOf(PropTypes.any),
};

export const RiskLineChartDataType = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};
