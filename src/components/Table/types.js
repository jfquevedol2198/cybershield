import PropTypes from "prop-types";

export const ColumnType = PropTypes.arrayOf(
  PropTypes.shape({
    title: PropTypes.string,
    dataIndex: PropTypes.string,
    key: PropTypes.string,
    render: PropTypes.func,
    sort: PropTypes.bool,
    sortDataType: PropTypes.string,
    colSpan: PropTypes.number,
    className: PropTypes.string,
    align: PropTypes.string,
  })
);

export const TablePropType = {
  columns: ColumnType,
  dataSource: PropTypes.arrayOf(PropTypes.any),
  rowsPerPage: PropTypes.number,
  loading: PropTypes.bool,
  pagination: PropTypes.bool,
  rowClassName: PropTypes.string,
  title: PropTypes.string,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onClickRow: PropTypes.func,
};
