import { FunnelIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import _ from "lodash";
import { Fragment, useEffect, useState } from "react";

import api from "../../api";
import Button from "../../components/Button";
import FactoryShopCard from "../../components/FactoryShopCard";
import FactoryShopCell from "../../components/FactoryShopCell";
import NormalButton from "../../components/NormalButton";
import SearchInput from "../../components/SearchInput";
import { ButtonVariant } from "../../utils";
import { applyFilter, getFilterOptions } from "../../utils/filter";
import { parseAssets } from "../../utils/parse";
import AssetsTable from "../Assets/AssetsTable";
import FilterCells from "./FilterCells";
import FilterShops from "./FilterShops";

const Shops = () => {
  const [steps, setSteps] = useState([{ name: "All Shops", id: "all_shops" }]);
  const [cells, setCells] = useState([]);
  const [filteredCells, setFilteredCells] = useState([]);
  const [filterCellOptions, setFilterCellOptions] = useState([]);

  const [shops, setShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [filterShopOptions, setFilterShopOptions] = useState([]);

  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [filterAssetOptions, setFilterAssetOptions] = useState([]);

  const [loading, setLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const {
        data: { data },
      } = await api.getShops();
      setShops(data);
      setFilteredShops(data);
      setFilterShopOptions(getFilterOptions(data));
      setLoading(false);
    };
    fetch();
  }, []);

  const fetchCells = async (shop) => {
    setLoading(true);
    const {
      data: { data },
    } = await api.getCells({ shopId: shop.id });
    setSteps([...steps, shop]);
    setCells(data);
    setFilteredCells(data);
    setFilterCellOptions(getFilterOptions(data));
    setLoading(false);
  };

  const fetchAssets = async (cell) => {
    setLoading(true);
    const {
      data: { data },
    } = await api.getAssets({ cellId: cell.id });
    setSteps([...steps, cell]);
    const assets = parseAssets(data);
    setAssets(assets);
    setFilteredAssets(assets);
    setFilterAssetOptions(getFilterOptions(assets));
    setLoading(false);
  };

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
  const onFilterCells = (data) => {
    const filtered = Object.keys(data).filter((key) => !!data[key]);
    if (filtered.length === 0) return;
    setFilteredShops(
      applyFilter(
        cells,
        filtered.reduce(
          (filter, key) => [...filter, { key, value: data[key] }],
          []
        )
      )
    );
    setIsFilterOpen(false);
  };
  const onFilterAssets = (data) => {
    const filtered = Object.keys(data).filter((key) => !!data[key]);
    if (filtered.length === 0) return;
    setFilteredShops(
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
            {steps.length === 1 && <>Shops</>}
            {steps.length > 1 && (
              <div className="flex flex-row gap-2">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex flex-row gap-2">
                    <span
                      className={clsx(
                        index < steps.length - 1
                          ? "cursor-pointer text-link"
                          : ""
                      )}
                      onClick={() => setSteps(steps.slice(0, index + 1))}
                    >
                      {step.name}
                    </span>
                    {index < steps.length - 1 && <span>&gt;</span>}
                  </div>
                ))}
              </div>
            )}
          </span>
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
        {steps.length === 1 &&
          filteredShops.map((shop) => {
            return (
              <div key={shop.id} onClick={() => fetchCells(shop)}>
                <FactoryShopCard
                  cells={(_.get(shop, "level2") || []).length}
                  name={shop.name}
                  description={shop.description}
                  score={shop.riskScore * 100}
                  location={shop.location}
                  assets={shop.assets}
                />
              </div>
            );
          })}
        {steps.length === 2 &&
          _.map(filteredCells, (cell) => {
            return (
              <div key={cell.id} onClick={() => fetchAssets(cell)}>
                <FactoryShopCell
                  name={cell.name}
                  description={cell.description}
                  score={cell.riskScore * 100}
                  location={cell.location}
                  assets={cell.assets}
                />
              </div>
            );
          })}
      </div>
      <div className="mt-2 w-full overflow-x-auto px-5">
        {steps.length === 3 && <AssetsTable data={filteredAssets} />}
      </div>
      {steps.length === 1 && (
        <FilterShops
          isOpen={isFilterOpen}
          filterOptions={filterShopOptions}
          onSubmit={onFilterShops}
          onClose={() => setIsFilterOpen(false)}
        />
      )}
      {steps.length === 2 && (
        <FilterCells
          isOpen={isFilterOpen}
          filterOptions={filterCellOptions}
          onSubmit={onFilterCells}
          onClose={() => setIsFilterOpen(false)}
        />
      )}
      {steps.length === 3 && (
        <FilterShops
          isOpen={isFilterOpen}
          filterOptions={filterAssetOptions}
          onSubmit={onFilterAssets}
          onClose={() => setIsFilterOpen(false)}
        />
      )}
    </Fragment>
  );
};

export default Shops;
