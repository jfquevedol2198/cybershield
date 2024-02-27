import PropTypes from "prop-types";

import DataRow from "../../../components/DataRow";
import { dateFormat, stringFormat } from "../../../utils";

const OverviewTab = () => {
  return <div>Overview</div>;
};

const OverviewTabPanel = ({ data }) => {
  return (
    <div key="overview" className="">
      <div className="mb-1 bg-white px-4 py-2">
        <div className="mb-2 text-base font-bold">Description</div>
        <div className="text-base font-normal">
          {stringFormat(data?.description)}
        </div>
      </div>
      <div className="flex w-full flex-row gap-1">
        <div className="flex-auto bg-white p-5">
          <div className="mb-3 border-b border-background pb-3 text-base font-bold">
            Summary
          </div>
          <div>
            <DataRow property="Shop" value={data?.shops_name} />
            <DataRow property="Cell" value={data?.cellsname} />
            <DataRow
              property="Asset owner"
              value={stringFormat(data?.owner_user)}
            />
            <DataRow
              property="Location"
              value={stringFormat(data?.location_sites)}
            />
            <DataRow property="State" value={stringFormat(data?.state)} />
            <DataRow
              property="First Seen"
              value={dateFormat(data?.first_seen)}
            />
            <DataRow property="Last Seen" value={dateFormat(data?.lastseen)} />
            <DataRow
              property="Vendor"
              value={stringFormat(data?.vendor_name)}
            />
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
            <DataRow property="Family" value={stringFormat(data?.family)} />
            <DataRow property="Model" value={stringFormat(data?.model_name)} />
            <DataRow
              property="Catalog number"
              value={stringFormat(data?.catalog_number)}
            />
            <DataRow
              property="Serial"
              value={stringFormat(data?.serial_value)}
            />
            <DataRow
              property="Firmware Version"
              value={stringFormat(data?.firmware_version)}
            />
            <DataRow
              isLast
              property="Hardware version"
              value={stringFormat(data?.hardware_version)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

OverviewTabPanel.propTypes = {
  data: PropTypes.shape(PropTypes.any),
};

export { OverviewTab, OverviewTabPanel };
