import PropTypes from "prop-types";

const InformationTab = () => {
  return <div>Information</div>;
};

const InformationTabPanel = ({ data }) => {
  return (
    <div className="">
      <div className="mb-1 bg-white px-4 py-2">
        <div className="mb-2 text-base font-bold">Description</div>
        <div className="text-base font-normal text-gray-4">
          {data.description || "N/A"}
        </div>
      </div>
      <div className="bg-white px-4 py-2">
        <div className="mb-2 text-base font-bold">Notes</div>
        <div className="text-base font-normal text-gray-4">
          {data.short_description || "N/A"}
        </div>
      </div>
    </div>
  );
};

InformationTabPanel.defaultProps = {
  data: {},
};

InformationTabPanel.propTypes = {
  data: PropTypes.shape(PropTypes.any),
};

export { InformationTab, InformationTabPanel };
