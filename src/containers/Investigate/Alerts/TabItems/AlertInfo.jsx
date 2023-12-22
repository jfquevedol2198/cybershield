import DataRow from "../../../../components/DataRow";

const AlertInfoTab = () => {
  return <div>Alert Info</div>;
};

const AlertInfoTabPanel = () => {
  return (
    <div key="overview" className="">
      <div className="mb-1 bg-white px-4 py-2">
        <div className="mb-2 text-base font-bold">Description</div>
        <div className="text-base font-normal text-gray-4">
          A Firewall Policy Unsecured Internal Communication alert occurs when
          communication is detected between two or more internal systems are not
          secured by a firewall. This type of alert may be triggered if a
          malicious actor has gained access to a system, or if a system has been
          compromised in some way, and is now trying to communicate with other
          systems on the network. this type of alert is important to detect and
          address quickly, as it may indicate a breach or other malicious
          activity on the network.
        </div>
      </div>
      <div className="bg-white px-4 py-2">
        <div className="mb-3 border-b border-background pb-3 text-base font-bold">
          Summary
        </div>
        <div className="flex flex-row gap-2">
          <div className="w-1/2">
            <DataRow property="Alert Category" value="Network Events" />
            <DataRow property="Alert Type" value="Firewall Policy" />
            <DataRow
              property="Alert Sub-Type"
              value="Unsecured Internal Communication"
            />
          </div>
          <div className="w-1/2">
            <DataRow property="Asset Owner" value="-" />
            <DataRow property="Cell" value="Internet connected" />
            <DataRow property="Alert Collected by" value="Palo Alto Firewall" />
          </div>
        </div>
      </div>
    </div>
  );
};

export { AlertInfoTab, AlertInfoTabPanel };
