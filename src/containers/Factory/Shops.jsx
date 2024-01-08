import { FunnelIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../api";
import Button from "../../components/Button";
import FactoryShopCard from "../../components/FactoryShopCard";
import NormalButton from "../../components/NormalButton";
import SearchInput from "../../components/SearchInput";
import { ButtonVariant } from "../../utils";
import { applyFilter, getFilterOptions } from "../../utils/filter";
import { parseShops } from "../../utils/parse";
import FilterShops from "./FilterShops";

const Shops = () => {
  const [shops, setShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [filterShopOptions, setFilterShopOptions] = useState([]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data } = await api.getShops();
      const shops = parseShops(data);
      setShops(shops);
      setFilteredShops(shops);
      setFilterShopOptions(getFilterOptions(shops));
      setLoading(false);
    };
    fetch();
  }, []);

  /**
   * Filter
   * @param {*} data
   */
  const onFilterShops = (data) => {
    const filtered = Object.keys(data).filter((key) => !!data[key]);
    if (filtered.length === 0) return;
    setFilteredShops(
      applyFilter(
        shops,
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
          <span className="text-[1.625rem] font-bold text-gray-4">Shops</span>
        </div>
        <div className="flex flex-row items-center gap-4">
          <Button variant={ButtonVariant.outline}>EXPORT SHOPS LIST</Button>
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
      {loading && (
        <div className="flex h-full w-full items-center justify-center">
          Loading
        </div>
      )}
      <div className="mt-2 grid w-full grid-cols-1 gap-4 overflow-x-auto px-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {filteredShops.map((shop) => {
          return (
            <Link
              key={shop.id}
              to={`/dashboard/factory-1/cells?shopId=${shop.id}&shopName=${shop.name}`}
            >
              <FactoryShopCard
                cells={shop.cells}
                name={shop.name}
                description={shop.description}
                score={shop.riskScore * 100}
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
