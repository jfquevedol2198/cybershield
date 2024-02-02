import PropTypes from "prop-types";

import { dateFormat } from "../../../../../utils";

const AlertInfoTab = () => {
  return <div>Alert Summary</div>;
};

const AlertInfoTabPanel = () => {
  return (
    <div key="overview" className="space-y-1">
      <div className="space-y-2 bg-white p-4">
        <div>
          <div className="text-base font-bold">Alert Type</div>
          <div className="text-base font-normal text-gray-4">
            Authentication
          </div>
        </div>
        <div>
          <div className="text-base font-bold">Alert Category</div>
          <div className="text-base font-normal text-gray-4">
            Industrial Control System
          </div>
        </div>
        <div>
          <div className="text-base font-bold">Alert sub-type</div>
          <div className="text-base font-normal text-gray-4">Admin Login</div>
        </div>
        <div>
          <div className="text-base font-bold">Description</div>
          <div className="text-base font-normal text-gray-4">
            Industrial Control Systems (ICS) Authentication Admin Login is a
            cyber alert that focuses on how to protect access to ICS Systems.
            This alert focuses on the importance of strong, secure
            administrative login.
          </div>
        </div>
        <div>
          <div className="text-base font-bold">Assigned</div>
          <div className="text-base font-normal text-gray-4">
            Industrial Control Systems (ICS) Authentication Admin Login is a
            cyber alert that focuses on how to protect access to ICS Systems.
            This alert focuses on the importance of strong, secure
            administrative login.
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-6 bg-white p-4">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-4">Alert ID</span>
          <span className="text-sm font-normal text-gray-4">Other</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-4">Alert time</span>
          <span className="text-sm font-normal text-gray-4">
            {dateFormat(new Date())}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-4">Collected by</span>
          <span className="text-sm font-normal text-gray-4">
            Data Extractor
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-4">Asset name</span>
          <span className="text-sm font-normal text-gray-4">OS Client1</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-4">Asset IP</span>
          <span className="text-sm font-normal text-gray-4">192.168.70.85</span>
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
