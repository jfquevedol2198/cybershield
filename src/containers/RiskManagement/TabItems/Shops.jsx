import PropTypes from "prop-types";

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

export const PanelShops = () => {
  return <div className="">Shops</div>;
};
