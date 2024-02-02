import PropTypes from "prop-types";

import AssetRow from "../AssetRow";

const AssetsTab = () => {
  return <div>Assets</div>;
};

const AssetsTabPanel = ({ data }) => {
  return (
    <div className="max-h-[40rem] overflow-y-auto bg-background px-6 py-5">
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((index) => (
          <AssetRow data={data} key={`row-${index}`} />
        ))}
      </div>
    </div>
  );
};

AssetsTabPanel.defaultProps = {
  data: {},
};

AssetsTabPanel.propTypes = {
  data: PropTypes.shape(PropTypes.any),
};

export { AssetsTab, AssetsTabPanel };
