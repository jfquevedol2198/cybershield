import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Fragment, useState } from "react";

import Button from "../../components/Button";
import FactoryShopCard from "../../components/FactoryShopCard";
import FactoryShopCell from "../../components/FactoryShopCell";
import NormalButton from "../../components/NormalButton";
import { ButtonVariant } from "../../utils";
import AssetsTable from "../Assets/AssetsTable";
import { shops } from "./data";

const Shops = () => {
  const [steps, setSteps] = useState([{ value: "All Shops" }]);
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
                  <div key={step} className="flex flex-row gap-2">
                    <span
                      className={clsx(
                        index < steps.length - 1
                          ? "cursor-pointer text-link"
                          : ""
                      )}
                      onClick={() => setSteps(steps.slice(0, index + 1))}
                    >
                      {step.value}
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
          <NormalButton variant={ButtonVariant.icon} className="h-full">
            <FunnelIcon className="h-6 w-6" />
          </NormalButton>
        </div>
      </div>
      <div className="mt-2 grid w-full grid-cols-1 gap-4 overflow-x-auto px-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {steps.length === 1 &&
          shops.map((shop) => {
            return (
              <div
                key={shop.category}
                onClick={() =>
                  setSteps([...steps, { ...shop, value: shop.category }])
                }
              >
                <FactoryShopCard
                  cells={shop.cells.length}
                  category={shop.category}
                  description={shop.description}
                  score={shop.score}
                  state={shop.state}
                  assets={shop.assets}
                />
              </div>
            );
          })}
        {steps.length === 2 &&
          steps[1].cells.map((shop) => {
            return (
              <div
                key={shop.category}
                onClick={() =>
                  setSteps([...steps, { ...shop, value: shop.description }])
                }
              >
                <FactoryShopCell
                  category={shop.category}
                  description={shop.description}
                  score={shop.score}
                  state={shop.state}
                  assets={shop.assets}
                />
              </div>
            );
          })}
      </div>
      <div className="mt-2 w-full overflow-x-auto px-5">
        {steps.length === 3 && <AssetsTable />}
      </div>
    </Fragment>
  );
};

export default Shops;
