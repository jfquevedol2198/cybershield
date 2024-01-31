import { FunnelIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import api from "../../api8000";
import ActivityIndicator from "../../components/ActivityIndicator";
import ExportButton from "../../components/ExportButton";
import FactoryShopCard from "../../components/FactoryShopCard";
import NormalButton from "../../components/NormalButton";
import SearchAndFilter from "../../components/SearchAndFilter";
import SearchInput from "../../components/SearchInput";
import useSearchAndFilter from "../../hooks/useSearchAndFilter";
import { ButtonVariant } from "../../utils";
import { getFilterOptions } from "../../utils/filter";
import { parseShops } from "../../utils/parse";
import FilterShops from "./FilterShops";

const Shops = () => {
  const [loading, setLoading] = useState(false);
  const [filterShopOptions, setFilterShopOptions] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { siteId } = useParams();

  const { setPageData, filterData, addFilter } = useSearchAndFilter();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data } = await api.getSiteShops(siteId);
      const shops = parseShops(data);
      setPageData(shops);
      setFilterShopOptions(getFilterOptions(shops));
      setLoading(false);
    };
    fetch();
  }, [siteId]);

  /**
   * Filter
   * @param {*} data
   */
  const onFilterShops = (data) => {
    addFilter(data);
    setIsFilterOpen(false);
  };

  return (
    <Fragment>
      {loading && <ActivityIndicator />}
      {/* Header */}
      <div className="mb-3 flex flex-row items-center justify-between bg-background px-8">
        <div className="flex flex-row items-center gap-2">
          <span className="text-[1.625rem] font-bold text-gray-4">Shops</span>
        </div>
        <div className="flex flex-row items-center gap-4">
          <ExportButton name="shops" label="EXPORT SHOPS LIST" />
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

      <div className="mt-2 grid w-full grid-cols-1 gap-4 overflow-x-auto px-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {filterData.map((shop) => {
          return (
            <Link
              key={shop.id}
              to={`/dashboard/site/${siteId}/cells?shopId=${shop.id}&shopName=${shop.name_}`}
            >
              <FactoryShopCard
                cells={shop.cells?.length || 0}
                name={shop.name_}
                description={shop.description}
                score={shop.risk_score}
                location={shop.location}
                assets={shop.assets}
              />
            </Link>
          );
        })}
      </div>
      <FilterShops
        isOpen={isFilterOpen}
        filterOptions={filterShopOptions}
        onSubmit={onFilterShops}
        onClose={() => setIsFilterOpen(false)}
      />
    </Fragment>
  );
};

export default Shops;
