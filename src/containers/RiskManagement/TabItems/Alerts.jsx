import { ArrowUpIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

export const TabAlerts = ({ value }) => {
  return (
    <div className="w-25 h-[6.875rem]">
      <div className="mb-2 text-base font-normal">Alerts</div>
      <div className="mb-1 text-[2.75rem] leading-[52px]">{value}</div>
      <div className="flex flex-row items-center justify-center gap-1 text-base text-risk-2">
        <ArrowUpIcon className="h-3" />
        15%
      </div>
    </div>
  );
};

TabAlerts.propTypes = {
  value: PropTypes.number,
};

export const PanelAlerts = () => {
  return <div className="">Alerts</div>;
};
