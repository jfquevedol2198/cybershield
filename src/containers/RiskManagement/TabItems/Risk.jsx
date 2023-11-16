import { ArrowUpIcon } from "@heroicons/react/24/outline";

import EventCard from "../../../components/EventCard";
import GaugeChart from "../../../components/d3/GaugeChart";

export const TabRisk = () => {
  return (
    <div className="relative h-[6.875rem] w-[12.5rem]">
      <div className="text-center">Risk</div>
      <div className="flex items-center justify-center">
        <GaugeChart percent={92} />
      </div>
      <div className="absolute right-3 top-3 flex flex-row items-center justify-center gap-1 text-base text-risk-2">
        <ArrowUpIcon className="h-3" />
        25%
      </div>
    </div>
  );
};

export const PanelRisk = () => {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-5 border-b-[1px] border-background pb-5 text-base font-normal text-gray-5">
        Track cyber security risk per threat category for better priorization of
        your mitigation efforts.
      </div>
      <div className="h-full flex-auto overflow-y-auto">
        <EventCard
          title="Host Events"
          description="Events that occurs on one host, including vulnerabilities."
          score={92}
        />
        <EventCard
          title="Industrial Control Systems"
          description="Events that describe industrial operations, devices, concepts, or protocols."
          score={72}
        />
        <EventCard
          title="Network Events"
          description="Events that describe industrial operations, devices, concepts, or protocols."
          score={12}
        />
        <EventCard
          title="Network Events"
          description="Events that describe industrial operations, devices, concepts, or protocols."
          score={12}
        />
        <EventCard
          title="Network Events"
          description="Events that describe industrial operations, devices, concepts, or protocols."
          score={12}
        />
      </div>
    </div>
  );
};
