import { FunnelIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Fragment, useEffect, useState } from "react";

import api from "../../api";
import Button from "../../components/Button";
import FactoryShopCell from "../../components/FactoryShopCell";
import NormalButton from "../../components/NormalButton";
import SearchInput from "../../components/SearchInput";
import { ButtonVariant } from "../../utils";
import { parseAssets } from "../../utils/parse";
import AssetsTable from "../Assets/AssetsTable";
import FilterCells from "./FilterCells";

const Cells = () => {
  const [steps, setSteps] = useState([{ name: "All Cells", id: "all_cells" }]);
  const [cells, setCells] = useState([]);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const {
        data: { data },
      } = await api.getCells();
      setCells(data);
      setLoading(false);
    };
    fetch();
  }, []);

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
            {steps.length === 1 && <>Cells</>}
            {steps.length > 1 && (
              <div className="flex flex-row gap-2">
                {steps.map((step, index) => (
                  <div key={step} className="flex flex-row gap-2">
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
          cells.map((shop) => {
            return (
              <div key={shop.description} onClick={() => fetchAssets(shop)}>
                <FactoryShopCell
                  name={shop.name}
                  description={shop.description}
                  score={shop.riskScore * 100}
                  location={shop.location}
                  assets={shop.assets}
                />
              </div>
            );
          })}
      </div>
      <div className="mt-2 w-full overflow-x-auto px-5">
        {steps.length === 2 && <AssetsTable data={assets} />}
      </div>
      <FilterCells
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </Fragment>
  );
};

export default Cells;
