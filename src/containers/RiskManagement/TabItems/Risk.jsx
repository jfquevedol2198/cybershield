import EventCard from "../../../components/EventCard";

export const TabRisk = () => {
  return <div className="h-[6.875rem] w-[12.5rem]">Risk</div>;
};

export const PanelRisk = () => {
  return (
    <div className="flex h-full flex-col">
      <div className="text-gray-5 mb-5 border-b-[1px] border-background pb-5 text-base font-normal">
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
