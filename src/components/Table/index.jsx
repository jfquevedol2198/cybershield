import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useMemo, useState } from "react";

import { SortDirection } from "../../utils";
import { sortFunc } from "../../utils/sort";
import NormalButton from "../NormalButton";
import { TablePropType } from "./types";

const Table = ({ columns, dataSource, totalPages, loading, onClickRow }) => {
  const [sorts, setSorts] = useState([]);

  const { totalColSpan } = useMemo(() => {
    const totalColSpan = columns.reduce((sum, col) => sum + col.colSpan, 0);
    return { totalColSpan };
  }, [columns]);

  const sortedData = useMemo(() => {
    let data = dataSource;
    for (const sort of sorts) {
      data = sortFunc(data, sort);
    }
    return data;
  }, [dataSource, sorts]);

  const onSort = (key, sortType, sortDirection) => {
    const prevSort = sorts.filter((sort) => sort.key === key)[0];
    const _sorts = [
      ...sorts.filter((sort) => sort.key !== key),
      prevSort
        ? {
            ...prevSort,
            direction:
              prevSort.direction === SortDirection.DESC
                ? SortDirection.ASC
                : SortDirection.DESC,
          }
        : {
            key,
            type: sortType,
            direction: sortDirection,
          },
    ];
    setSorts(_sorts);
  };

  return (
    <>
      <div className="w-full">
        <div className="table-header flex flex-row flex-nowrap border-b-[1px] border-gray-1 bg-white">
          {columns.map((column) => {
            const sort = sorts.filter(
              (sort) => sort.key === column.dataIndex
            )[0];
            return (
              <div
                key={column.key}
                className={clsx(
                  "cell flex items-center gap-1 px-2 py-3 text-base font-bold text-gray-4"
                )}
                style={{
                  width: `${((column.colSpan / totalColSpan) * 100).toFixed(
                    2
                  )}%`,
                }}
              >
                <span>{column.title}</span>
                {column.sort &&
                  (sort && sort.direction === SortDirection.ASC ? (
                    <ArrowUpIcon
                      className="h-4 cursor-pointer"
                      onClick={() =>
                        onSort(
                          column.dataIndex,
                          column.sortDataType,
                          SortDirection.DESC
                        )
                      }
                    />
                  ) : (
                    <ArrowDownIcon
                      className="h-4 cursor-pointer"
                      onClick={() =>
                        onSort(
                          column.dataIndex,
                          column.sortDataType,
                          SortDirection.ASC
                        )
                      }
                    />
                  ))}
              </div>
            );
          })}
        </div>
        {loading && (
          <div className="flex w-full flex-row items-center justify-center bg-white py-10 text-black">
            Loading...
          </div>
        )}
        {sortedData.map((data, index) => (
          <div
            key={`row-${index}`}
            className="table-header flex flex-row flex-nowrap items-center border-b-[1px] border-gray-1 bg-white px-2 hover:bg-gray-1"
            onClick={() => onClickRow && onClickRow(data)}
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
                  width: `${((column.colSpan / totalColSpan) * 100).toFixed(
                    2
                  )}%`,
                }}
              >
                {column.render && column.render(data[column.dataIndex], data)}
                {!column.render && (
                  <span className="truncate">{data[column.dataIndex]}</span>
                )}
              </div>
            ))}
          </div>
        ))}
        {!loading && sortedData.length === 0 && (
          <div className="flex w-full flex-row items-center justify-center bg-white py-10 text-black">
            No Data
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <div className="mt-4 flex w-full flex-row items-center justify-end gap-2">
          <NormalButton>
            <ChevronLeftIcon className="h-6" />
          </NormalButton>
          <NormalButton>1</NormalButton>
          <NormalButton>...</NormalButton>
          <NormalButton>3</NormalButton>
          <NormalButton>4</NormalButton>
          <NormalButton>5</NormalButton>
          <NormalButton>...</NormalButton>
          <NormalButton>10</NormalButton>
          {totalPages > 8}
          <NormalButton>
            <ChevronRightIcon className="h-6" />
          </NormalButton>
        </div>
      )}
    </>
  );
};

Table.propTypes = TablePropType;

export default Table;
