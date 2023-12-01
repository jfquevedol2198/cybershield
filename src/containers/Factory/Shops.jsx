import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import _ from "lodash";
import { Fragment, useEffect, useState } from "react";

import api from "../../api";
import Button from "../../components/Button";
import FactoryShopCard from "../../components/FactoryShopCard";
import FactoryShopCell from "../../components/FactoryShopCell";
import NormalButton from "../../components/NormalButton";
import { ButtonVariant } from "../../utils";
import { parseAssets } from "../../utils/parse";
import AssetsTable from "../Assets/AssetsTable";
import FilterShops from "./FilterShops";

const Shops = () => {
  const [steps, setSteps] = useState([{ name: "All Shops", id: "all_shops" }]);
  const [cells, setCells] = useState([]);
  const [shops, setShops] = useState([]);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const {
        data: { data },
      } = await api.getShops();
      setShops(data);
      setLoading(false);
    };
    fetch();
  }, []);

  const fetchCells = async (shop) => {
    setLoading(true);
    const {
      data: { data },
    } = await api.getCells({ shopId: shop.id });
    console.log(data);
    setSteps([...steps, shop]);
    setCells(data);
    setLoading(false);
  };

  const fetchAssets = async (cell) => {
    setLoading(true);
    const {
      data: { data },
    } = await api.getAssets({ cellId: cell.id });
    setSteps([...steps, cell]);
    setAssets(parseAssets(data));
    setLoading(false);
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
          <NormalButton variant={ButtonVariant.icon} className="h-full">
            <MagnifyingGlassIcon className="h-6 w-6" />
          </NormalButton>
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
          shops.map((shop) => {
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
          _.map(cells, (cell) => {
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
        {steps.length === 3 && <AssetsTable data={assets} />}
      </div>
      <FilterShops
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </Fragment>
  );
};

export default Shops;
