import DataRow from "../../../../../components/DataRow";

const AlertDetailsTab = () => {
  return <div>Alert Details</div>;
};

const AlertDetailsTabPanel = () => {
  return (
    <div className="w-full space-y-1">
      <div className="flex w-full flex-row space-x-1">
        <div className="flex-auto bg-white p-5">
          <div>
            <DataRow property="Asset Owner" value="Admin" />
            <DataRow property="Location" value="-" />
            <DataRow property="State" value="-" />
            <DataRow property="First Seen" value="08 Feb 2023 | 10:18:35" />
            <DataRow property="Vendor" value="Microsoft" />
            <DataRow property="Device Type" value="Operator Station Client" />
            <DataRow property="Family" value="-" />
            <DataRow property="Model" value="-" />
            <DataRow property="Catalog number" value="-" />
          </div>
        </div>
        <div className="flex-auto bg-white p-5">
          <div>
            <DataRow property="Serial" value="-" />
            <DataRow property="Firmware Version" value="-" />
            <DataRow property="Hardware Version" value="-" />
            <DataRow property="OS name" value="Microsoft Windows 7" />
            <DataRow property="OS Version" value="6.1" />
            <DataRow property="OS bit" value="64" />
            <DataRow property="Service pack" value="1" />
            <DataRow property="Windows patch ID" value="KB5011487" />
            <DataRow property="Patch installed on" value="04-08-2922" />
          </div>
        </div>
      </div>
      <div className="mb-1 bg-white px-4 py-2">
        <div className="mb-2 text-base font-bold">Interfaces</div>
        <div className="flex flex-row gap-6 bg-white">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-4">MAC</span>
            <span className="text-sm font-normal text-gray-4">-</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-4">IP</span>
            <span className="text-sm font-normal text-gray-4">-</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-4">Subnet</span>
            <span className="text-sm font-normal text-gray-4">-</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AlertDetailsTab, AlertDetailsTabPanel };
