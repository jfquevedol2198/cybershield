import { FunnelIcon } from "@heroicons/react/24/outline";
import _ from "lodash";
import { Fragment, useEffect, useState } from "react";

import api from "../../api";
import Button from "../../components/Button";
import NormalButton from "../../components/NormalButton";
import SearchInput from "../../components/SearchInput";
import { ButtonVariant } from "../../utils";
import { applyFilter, getFilterOptions } from "../../utils/filter";
import { parseAssets } from "../../utils/parse";
import AssetsTable from "./AssetsTable";
import Filter from "./Filter";

const Assets = () => {
  const [assets, setAssets] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const {
        data: { data },
      } = await api.getAssets();
      setCurrPage(_.get(data, "currentPage"));
      setTotalPages(_.get(data, "totalPages"));
      const assets = parseAssets(_.get(data, "assets"));
      setAssets(assets);
      setFilteredAssets(assets);
      setFilterOptions(getFilterOptions(assets));
      setLoading(false);
    };
    fetch();
  }, []);

  /**
   * Filter
   * @param {*} data
   */
  const onFilter = (data) => {
    const filtered = Object.keys(data).filter((key) => !!data[key]);
    if (filtered.length === 0) return;
    setFilteredAssets(
      applyFilter(
        assets,
        filtered.reduce(
          (filter, key) => [...filter, { key, value: data[key] }],
          []
        )
      )
    );
    setIsFilterOpen(false);
  };

  return (
    <Fragment>
      {/* Header */}
      <div className="mb-3 flex flex-row items-center justify-between bg-background px-8">
        <div className="flex flex-row items-center gap-2">
          <span className="text-[1.625rem] font-bold text-gray-4">
            Assets ({filteredAssets.length})
          </span>
        </div>
        <div className="flex flex-row items-center gap-4">
          <Button variant={ButtonVariant.outline}>EXPORT ASSETS LIST</Button>
          <SearchInput onSearch={() => {}} />
          <NormalButton
            variant={ButtonVariant.icon}
            className="h-full"
            onClick={() => setIsFilterOpen(true)}
          >
            <FunnelIcon className="h-6 w-6" />
          </NormalButton>
        </div>
      </div>
      {/* Content */}
      <div className="gap-4 px-7 py-4">
        <AssetsTable
          currPage={currPage}
          totalPages={totalPages}
          data={filteredAssets}
          loading={loading}
        />
      </div>
      {/* Filter */}
      <Filter
        isOpen={isFilterOpen}
        onSubmit={onFilter}
        onClose={() => setIsFilterOpen(false)}
        filterOptions={filterOptions}
      />
    </Fragment>
  );
};

export default Assets;
