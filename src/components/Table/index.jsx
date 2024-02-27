import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useMemo, useState } from "react";

import { SortDirection } from "../../utils";
import { sortFunc } from "../../utils/sort";
import Pagination from "./Pagination";
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
  defaultSorts,
}) => {
  const [sorts, setSorts] = useState(defaultSorts);
  const [currentPage, setCurrentPage] = useState(1);

  ///////// pagination /////////
  const [paginatedData, setPaginatedData] = useState([]);

  const { totalColSpan } = useMemo(() => {
    const totalColSpan = columns.reduce((sum, col) => sum + col.colSpan, 0);
    return { totalColSpan };
  }, [columns]);

  const sortedData = useMemo(() => {
    let data = dataSource;
    for (const sort of sorts) {
      data = sortFunc(data, sort);
    }
    setPaginatedData(
      data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
    );
    return data;
  }, [dataSource, currentPage, sorts]);

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

  const onChangePage = (currentPage) => {
    setCurrentPage(currentPage);
    setPaginatedData(
      sortedData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      )
    );
  };
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
                <span className="flex-grow truncate">{column.title}</span>
                {column.sort &&
                  (sort && sort.direction === SortDirection.ASC ? (
                    <ArrowUpIcon
                      className="h-4 flex-shrink-0 cursor-pointer"
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
                      className="h-4 flex-shrink-0 cursor-pointer"
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
        {(pagination ? paginatedData : sortedData).map((data, index) => (
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
        <Pagination
          dataSource={dataSource}
          rowsPerPage={20}
          onChangePage={onChangePage}
        />
      )}
    </>
  );
};

Table.defaultProps = {
  pagination: true,
  rowsPerPage: 20,
  defaultSorts: [],
};

Table.propTypes = TablePropType;

export default Table;
