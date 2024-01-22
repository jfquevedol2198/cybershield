import { FunnelIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";

import api from "../../api";
import ExportButton from "../../components/ExportButton";
import NormalButton from "../../components/NormalButton";
import SearchAndFilter from "../../components/SearchAndFilter";
import SearchInput from "../../components/SearchInput";
import useSearchAndFilter from "../../hooks/useSearchAndFilter";
import { ButtonVariant } from "../../utils";
import { getFilterOptions } from "../../utils/filter";
import { parseAssets } from "../../utils/parse";
import AssetsTable from "./AssetsTable";
import Filter from "./Filter";

const Assets = () => {
  const [loading, setLoading] = useState(false);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState([]);

  const { setPageData, filterData } = useSearchAndFilter();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data } = await api.getAssets({});
      const assets = parseAssets(data);
      setPageData(assets);
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
    // const filtered = Object.keys(data).filter((key) => !!data[key]);
    // if (filtered.length === 0) return;
    // setFilteredAssets(
    //   applyFilter(
    //     assets,
    //     filtered.reduce(
    //       (filter, key) => [...filter, { key, value: data[key] }],
    //       []
    //     )
    //   )
    // );
    setIsFilterOpen(false);
  };

  return (
    <Fragment>
      {/* Header */}
      <div className="mb-3 flex flex-row items-center justify-between bg-background px-8">
        <div className="flex flex-row items-center gap-2">
          <span className="text-[1.625rem] font-bold text-gray-4">
            Assets ({filterData.length})
          </span>
        </div>
        <div className="flex flex-row items-center gap-4">
          <ExportButton name="assets" label="EXPORT ASSETS LIST" />
          <SearchInput />
          <NormalButton
            variant={ButtonVariant.icon}
            className="h-full"
            onClick={() => setIsFilterOpen(true)}
          >
            <FunnelIcon className="h-6 w-6" />
          </NormalButton>
        </div>
      </div>
      <div className="px-8">
        <SearchAndFilter />
      </div>
      {/* Content */}
      <div className="gap-4 px-7 py-4">
        <AssetsTable data={filterData} loading={loading} />
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
