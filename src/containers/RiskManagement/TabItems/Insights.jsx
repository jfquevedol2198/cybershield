import PropTypes from "prop-types";

export const TabInsights = ({ value }) => {
  return (
    <div className="w-25 h-[6.875rem]">
      <div className="mb-2 text-base font-normal">Insights</div>
      <div className="mb-1 text-[2.75rem] leading-[52px]">{value}</div>
    </div>
  );
};

TabInsights.propTypes = {
  value: PropTypes.number,
};

export const PanelInsights = () => {
  return <div className="">Insights</div>;
};
