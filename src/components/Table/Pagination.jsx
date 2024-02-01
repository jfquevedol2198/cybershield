import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";

import NormalButton from "../NormalButton";

const Pagination = ({ dataSource, rowsPerPage, onChangePage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(dataSource.length / rowsPerPage);

  const onNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const onPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const paginations = useMemo(() => {
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

  useEffect(() => {
    onChangePage(1);
  }, [dataSource]);

  return (
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
            onChangePage(page < 0 ? Math.abs(page) + 1 : page);
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
  );
};

Pagination.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.any),
  rowsPerPage: PropTypes.number,
  onChangePage: PropTypes.func,
  paginations: PropTypes.arrayOf(
    PropTypes.oneOf([PropTypes.number, PropTypes.string])
  ),
};

export default Pagination;
