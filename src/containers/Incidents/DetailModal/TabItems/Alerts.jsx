import PropTypes from "prop-types";

import AlertRow from "../AlertRow";

const AlertsTab = () => {
  return <div>Alerts</div>;
};

const AlertsTabPanel = ({ data }) => {
  return (
    <div className="max-h-[40rem] overflow-y-auto bg-background px-6 py-5">
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((index) => (
          <AlertRow data={data} key={`row-${index}`} />
        ))}
      </div>
    </div>
  );
};

AlertsTabPanel.defaultProps = {
  data: {},
};

AlertsTabPanel.propTypes = {
  data: PropTypes.shape(PropTypes.any),
};

export { AlertsTab, AlertsTabPanel };
