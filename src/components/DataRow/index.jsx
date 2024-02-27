import clsx from "clsx";
import PropTypes from "prop-types";

const DataRow = ({ property, value, isLast = false }) => {
  return (
    <div
      className={clsx("flex flex-row items-center gap-2", !isLast && "mb-3")}
    >
      <div className="w-1/2 text-sm font-bold text-black">{property}</div>
      <div className="w-1/2 justify-start text-sm font-normal text-gray-4">
        {value}
      </div>
    </div>
  );
};

DataRow.propTypes = {
  property: PropTypes.string,
  value: PropTypes.string,
  isLast: PropTypes.bool,
};

export default DataRow;
