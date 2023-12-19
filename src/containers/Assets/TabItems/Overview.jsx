import DataRow from "../../../components/DataRow";

const OverviewTab = () => {
  return <div>Overview</div>;
};

const OverviewTabPanel = () => {
  return (
    <div key="overview" className="">
      <div className="mb-1 bg-white px-4 py-2">
        <div className="mb-2 text-base font-bold">Description</div>
        <div className="text-base font-normal">
          IMATIC S7-1500F-1 PN, CENTRAL PROCESSING UNIT
        </div>
      </div>
      <div className="flex w-full flex-row gap-1">
        <div className="flex-auto bg-white p-5">
          <div className="mb-3 border-b border-background pb-3 text-base font-bold">
            Summary
          </div>
          <div>
            <DataRow property="Shop" value="Oil Wells" />
            <DataRow property="Cell" value="South Well" />
            <DataRow property="Asset owner" value="admin" />
            <DataRow property="Location" value="-" />
            <DataRow property="State" value="-" />
            <DataRow property="First Seen" value="08 Feb 2023 | 10:18:35" />
            <DataRow property="Last Seen" value="30 Nov 2023 | 20:00:58" />
            <DataRow property="Vendor" value="Siemens" />
            <DataRow
              isLast
              property="Asset collected by"
              value="Tread intelligence, Safe Active Que..."
            />
          </div>
        </div>
        <div className="flex-auto bg-white p-5">
          <div className="mb-3 border-b border-background pb-3 text-base font-bold">
            Asset Information
          </div>
          <div>
            <DataRow property="Family" value="SIMATIC S7-1500" />
            <DataRow property="Model" value="CPU 1511F-1 PN" />
            <DataRow property="Catalog number" value="6ES7511-1FK01-0AB0" />
            <DataRow property="Serial" value="-" />
            <DataRow property="Firmware Version" value="-" />
            <DataRow
              isLast
              property="Hardware version"
              value="08 Feb 2023 | 10:18:35"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { OverviewTab, OverviewTabPanel };
