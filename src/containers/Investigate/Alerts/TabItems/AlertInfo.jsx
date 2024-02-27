import PropTypes from "prop-types";

import DataRow from "../../../../components/DataRow";

const AlertInfoTab = () => {
  return <div>Alert Info</div>;
};

const AlertInfoTabPanel = ({ data }) => {
  return (
    <div key="overview" className="">
      <div className="mb-1 bg-white px-4 py-2">
        <div className="mb-2 text-base font-bold">Description</div>
        <div className="text-base font-normal text-gray-4">
          {data.description || "N/A"}
        </div>
      </div>
      <div className="bg-white px-4 py-2">
        <div className="mb-3 border-b border-background pb-3 text-base font-bold">
          Summary
        </div>
        <div className="flex flex-row gap-2">
          <div className="w-1/2">
            <DataRow
              property="Alert Category"
              value={data.category_name || "-"}
            />
            <DataRow property="Alert Type" value={data.type_name || "-"} />
            <DataRow
              property="Alert Sub-Type"
              value={data.subtype_name || "-"}
            />
          </div>
          <div className="w-1/2">
            <DataRow property="Asset Owner" value={data.owner_user || "-"} />
            <DataRow property="Cell" value={data.cellname || "-"} />
            <DataRow
              property="Alert Collected by"
              value={data.owner_user || "-"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

AlertInfoTabPanel.defaultProps = {
  data: {},
};

AlertInfoTabPanel.propTypes = {
  data: PropTypes.shape(PropTypes.any),
};

export { AlertInfoTab, AlertInfoTabPanel };
