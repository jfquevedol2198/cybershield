import { ArrowUpIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useMemo } from "react";

import { TablePropType } from "./types";

const Table = ({
  columns,
  dataSource,
  rowsPerPage,
  loading,
  pagination,
  rowClassName,
  title,
}) => {
  const { totalColSpan } = useMemo(() => {
    const totalColSpan = columns.reduce((sum, col) => sum + col.colSpan, 0);
    return { totalColSpan };
  }, [columns]);

  return (
    <div className="w-full">
      <div className="table-header flex flex-row flex-nowrap border-b-[1px] border-gray-1">
        {columns.map((column) => (
          <div
            key={column.key}
            className={clsx(
              "cell flex items-center gap-1 px-1 py-3 text-base font-bold text-gray-4"
            )}
            style={{
              width: `${((column.colSpan / totalColSpan) * 100).toFixed(2)}%`,
            }}
          >
            <span>{column.title}</span>
            {column.sort && <ArrowUpIcon className="h-4" />}
          </div>
        ))}
      </div>
      {dataSource.map((data, index) => (
        <div
          key={`row-${index}`}
          className="table-header flex flex-row flex-nowrap items-center border-b-[1px] border-gray-1"
        >
          {columns.map((column) => (
            <div
              key={column.key}
              className={clsx(
                "cell flex flex-row px-1 py-3 text-base font-bold text-gray-4",
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
              {column.render && column.render(data[column.dataIndex], data)}
              {!column.render && <span>{data[column.dataIndex]}</span>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

Table.propTypes = TablePropType;

export default Table;
