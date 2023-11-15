import PropTypes from "prop-types";

export const ColumnType = {
  title: PropTypes.string,
  dataIndex: PropTypes.string,
  key: PropTypes.string,
  render: PropTypes.func,
  sort: PropTypes.boolean,
  sortDataType: PropTypes.number,
  colSpan: PropTypes.number,
  className: PropTypes.string,
  align: PropTypes.string,
};

export const TablePropType = {
  columns: ColumnType,
  dataSource: PropTypes.arrayOf(PropTypes.any),
  rowsPerPage: PropTypes.number,
  loading: PropTypes.bool,
  pagination: PropTypes.bool,
  rowClassName: PropTypes.string,
  title: PropTypes.string,
};
