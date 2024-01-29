// import { ArrowUpIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

import EventCard from "../../../components/EventCard";
import GaugeChart from "../../../components/d3/GaugeChart";

export const TabRisk = ({ value }) => {
  return (
    <div className="relative h-[6.875rem] w-[12.5rem]">
      <div className="text-center">Risk</div>
      <div className="flex items-center justify-center">
        <GaugeChart percent={value} />
      </div>
      {/* <div className="absolute right-3 top-3 flex flex-row items-center justify-center gap-1 text-base text-risk-2">
        <ArrowUpIcon className="h-3" />
        25%
      </div> */}
    </div>
  );
};

TabRisk.propTypes = {
  value: PropTypes.number,
};

export const PanelRisk = ({ risks = [] }) => {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-5 border-b-[1px] border-background pb-5 text-base font-normal text-gray-5">
        Track cyber security risk per threat category for better priorization of
        your mitigation efforts.
      </div>
      <div className="h-full flex-auto overflow-y-auto">
        {risks.map((risk, index) => (
          <EventCard
            key={`${risk.type}-${index}`}
            title={risk.type}
            description="Events that occurs on one host, including vulnerabilities."
            score={Math.ceil(risk.total_risk_score_by_type_in_site * 10)}
          />
        ))}
      </div>
    </div>
  );
};

PanelRisk.propTypes = {
  risks: PropTypes.arrayOf(PropTypes.any),
};
