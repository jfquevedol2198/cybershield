import { FunnelIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

import api from "../../api8000";
import ActivityIndicator from "../../components/ActivityIndicator";
import ExportButton from "../../components/ExportButton";
import FactoryShopCell from "../../components/FactoryShopCell";
import NormalButton from "../../components/NormalButton";
import SearchAndFilter from "../../components/SearchAndFilter";
import SearchInput from "../../components/SearchInput";
import useSearchAndFilter from "../../hooks/useSearchAndFilter";
import { ButtonVariant } from "../../utils";
import { getFilterOptions } from "../../utils/filter";
import { parseCells } from "../../utils/parse";
import FilterCells from "./FilterCells";

const Cells = () => {
  const [searchParams] = useSearchParams();
  const shopId = searchParams.get("shopId");
  const shopName = searchParams.get("shopName");
  const { siteId } = useParams();
  const [loading, setLoading] = useState(false);

  const [filterCellOptions, setFilterCellOptions] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { setPageData, filterData, addFilter } = useSearchAndFilter();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data } = await (shopId
        ? api.getCellsOfShop({ shopId })
        : api.getSiteCells(siteId));
      const cells = parseCells(data);
      setPageData(cells);
      setFilterCellOptions(getFilterOptions(cells));
      setLoading(false);
    };
    fetch();
  }, [shopId, siteId]);

  const onFilterCells = (data) => {
    addFilter(data);
    setIsFilterOpen(false);
  };

  return (
    <Fragment>
      {/* Header */}
      <div className="mb-3 flex flex-row items-center justify-between bg-background px-8">
        <div className="flex flex-row items-center gap-2">
          <span className="text-[1.625rem] font-bold text-gray-4">
            {shopId && shopName ? (
              <>
                <Link
                  to={`/dashboard/site/${siteId}/shops`}
                  className="text-link"
                >
                  All Shops
                </Link>
                {" > "}
                <>{shopName}</>
              </>
            ) : (
              <>Cells</>
            )}
          </span>
        </div>
        <div className="flex flex-row items-center gap-4">
          <ExportButton name="cells" label="EXPORT CELLS LIST" />
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

      <div className="px-6">
        <SearchAndFilter />
      </div>

      {loading && <ActivityIndicator />}

      <div className="mt-4 grid w-full grid-cols-1 gap-4 overflow-x-auto px-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {filterData.map((cell) => {
          return (
            <Link
              key={cell.description}
              to={`/dashboard/site/${siteId}/assets?cellId=${cell.cell_id}&cellName=${cell.cell_name}`}
            >
              <FactoryShopCell
                name={cell.cell_name}
                description={cell.description}
                score={cell.risk_score}
                location={cell.celllocation}
                assets={cell.asset_count}
              />
            </Link>
          );
        })}
      </div>
      <FilterCells
        isOpen={isFilterOpen}
        filterOptions={filterCellOptions}
        onSubmit={onFilterCells}
        onClose={() => setIsFilterOpen(false)}
      />
    </Fragment>
  );
};

export default Cells;
