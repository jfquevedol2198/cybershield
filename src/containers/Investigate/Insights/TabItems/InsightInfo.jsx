const InsightInfoTab = () => {
  return <div>Insight Info</div>;
};

const InsightInfoTabPanel = () => {
  return (
    <div key="overview" className="">
      <div className="bg-white px-4 py-2">
        <div className="mb-2 text-base font-bold">Description</div>
        <div className="text-base font-normal text-gray-4">
          The system identified an unprotected asset 192.168.101.120, that
          requires immediate attention based on the related alerts. This asset
          poses a security risk to the network, since it can be easily accessed
          by a malicious actor due to it lacking protection mechanism.
        </div>
      </div>
    </div>
  );
};

export { InsightInfoTab, InsightInfoTabPanel };
