import PropTypes from "prop-types";

import Accordion from "../../../components/Accordion";
import Collapsible from "../../../components/Collapsible";
import DataRow from "../../../components/DataRow";

const PhysicalAdjacentDevicesTab = () => {
  return <div>Physical adjacent devices</div>;
};

const PhysicalAdjacentDevicesTabPanel = () => {
  return (
    <div className="w-full">
      <Accordion title="Discovered interfaces" headerClassName="pt-1">
        <div className="mt-2 bg-white p-5">
          <div className="w-1/2">
            <DataRow property="Local port" value="Unknown_local_port" />
            <DataRow
              property="Discovered MAC address"
              value="leftxbscalancea6fe"
            />
          </div>
        </div>
      </Accordion>
      <div className="mt-2">
        <Accordion title="Additional neighbors details" headerClassName="pt-1">
          <div className="mt-1 bg-white p-5">
            <div className="w-1/2">
              <Collapsible showCount={2}>
                <DataRow
                  property="Neighbor Address"
                  value="leftxbscalancea6fe"
                />
                <DataRow property="Neighbor Name" value="scalance_x208" />
                <DataRow property="Catalog" value="6ES7 511-1FK01-0AB0" />
                <DataRow property="Model" value="cpu 1511f-1 pn" />
                <DataRow property="Version" value="2.8.3" />
              </Collapsible>
            </div>
          </div>
        </Accordion>
      </div>
    </div>
  );
};

PhysicalAdjacentDevicesTabPanel.propTypes = {
  data: PropTypes.shape(PropTypes.any),
};

export { PhysicalAdjacentDevicesTab, PhysicalAdjacentDevicesTabPanel };
