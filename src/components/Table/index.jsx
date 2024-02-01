import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useMemo, useState } from "react";

import { SortDirection } from "../../utils";
import { sortFunc } from "../../utils/sort";
import NormalButton from "../NormalButton";
import Row from "./Row";
import { TablePropType } from "./types";

const Table = ({
  columns,
  dataSource,
  pagination,
  rowsPerPage,
  loading,
  onClickRow,
  expandedRowRender,
}) => {
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

  ///////// pagination /////////
  const totalPages = Math.ceil(dataSource.length / rowsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const onNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const onPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const paginations = useMemo(() => {
    console.log("=======");
    let _paginations = [];
    if (totalPages < 8) {
      for (let i = 1; i < totalPages + 1; i++) {
        _paginations.push(i);
      }
      return _paginations;
    }
    if (currentPage < 4) {
      return [1, 2, 3, "-4", totalPages];
    } else {
      _paginations = [1, `-${currentPage - 2}`];
    }
    const start = parseInt((currentPage - 1) / 3) * 3 + 1;
    let end = start + 2;
    if (end >= totalPages) {
      for (let i = start; i < totalPages + 1; i++) {
        _paginations.push(i);
      }
      return _paginations;
    }
    for (let i = start; i < end + 1; i++) {
      _paginations.push(i);
    }
    if (end === totalPages - 2) {
      _paginations.push(totalPages - 1);
    } else {
      _paginations.push(`-${end + 1}`);
    }
    _paginations.push(totalPages);
    return _paginations;
  }, [currentPage, totalPages]);

  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    return sortedData.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );
  }, [sortedData, currentPage]);
  //////////////////////////////

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
        {paginatedData.map((data, index) => (
          <Row
            data={data}
            key={`row-${index}`}
            expandedRowRender={expandedRowRender}
            totalColSpan={totalColSpan}
            columns={columns}
            onClickRow={onClickRow}
          />
        ))}
        {!loading && sortedData.length === 0 && (
          <div className="flex w-full flex-row items-center justify-center bg-white py-10 text-black">
            No Data
          </div>
        )}
      </div>
      {pagination && (
        <div className="mt-4 flex w-full flex-row items-center justify-end gap-2">
          <NormalButton
            className="flex h-8 w-8 items-center justify-center rounded  border text-primary-4"
            onClick={onPrevPage}
          >
            <ChevronLeftIcon className="h-6" />
          </NormalButton>
          {paginations.map((page) => (
            <NormalButton
              className={clsx(
                "flex h-8 w-8 items-center justify-center rounded  border",
                currentPage === page ? "text-risk-4" : "text-primary-4"
              )}
              key={page}
              onClick={() => {
                setCurrentPage(page < 0 ? Math.abs(page) + 1 : page);
              }}
            >
              {page < 0 ? <EllipsisHorizontalIcon className="w-4" /> : page}
            </NormalButton>
          ))}
          <NormalButton
            className="flex h-8 w-8 items-center justify-center rounded  border text-primary-4"
            onClick={onNextPage}
          >
            <ChevronRightIcon className="h-6" />
          </NormalButton>
        </div>
      )}
    </>
  );
};

Table.defaultProps = {
  pagination: true,
  rowsPerPage: 10,
};

Table.propTypes = TablePropType;

export default Table;
