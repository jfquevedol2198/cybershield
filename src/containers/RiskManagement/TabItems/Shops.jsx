import PropTypes from "prop-types";

import ShopCard from "../../../components/ShopCard";

export const TabShops = ({ value }) => {
  return (
    <div className="w-25 h-[6.875rem]">
      <div className="mb-2 text-base font-normal">Shops</div>
      <div className="mb-1 text-[2.75rem] leading-[52px]">{value}</div>
    </div>
  );
};

TabShops.propTypes = {
  value: PropTypes.number,
};

export const PanelShops = ({ shops }) => {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-5 border-b-[1px] border-background pb-5 text-base font-normal text-gray-5">
        Track cyber security risk per threat category for better priorization of
        your mitigation efforts.
      </div>{" "}
      <div className="h-full flex-auto overflow-y-auto">
        {shops.map((shop) => (
          <ShopCard key={shop.id} category={shop.name} score={shop.riskScore} />
        ))}
      </div>
    </div>
  );
};

PanelShops.propTypes = {
  shops: PropTypes.arrayOf(PropTypes.any),
};
