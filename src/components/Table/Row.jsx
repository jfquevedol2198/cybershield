import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import { ColumnType } from "./types";

const Row = ({
  data,
  columns,
  totalColSpan,
  onClickRow,
  expandedRowRender,
}) => {
  const [expanded, setExpanded] = useState(false);
  const onExpand = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    setExpanded(false);
  }, [data]);

  return (
    <React.Fragment>
      <div
        className="table-header flex flex-row flex-nowrap items-center border-b-[1px] border-gray-1 bg-white hover:bg-gray-1 "
        onClick={() => onClickRow && onClickRow(data)}
      >
        {columns.map((column) => (
          <div
            key={column.key}
            className={clsx(
              "cell flex flex-row px-2 py-3 text-base font-bold text-gray-4",
              column.align === "left"
                ? "justify-start"
                : column.align === "right"
                ? "justify-end"
                : "justify-center"
            )}
            style={{
              width: `${((column.colSpan / totalColSpan) * 100).toFixed(2)}%`,
            }}
          >
            {column.render &&
              column.render(data[column.dataIndex], data, expanded, onExpand)}
            {!column.render && (
              <span className="truncate">{data[column.dataIndex]}</span>
            )}
          </div>
        ))}
      </div>
      {expanded && expandedRowRender && expandedRowRender(data)}
    </React.Fragment>
  );
};

Row.propTypes = {
  data: PropTypes.shape(PropTypes.any),
  columns: ColumnType,
  expandedRowRender: PropTypes.func,
  onClickRow: PropTypes.func,
  totalColSpan: PropTypes.number,
};

export default Row;
