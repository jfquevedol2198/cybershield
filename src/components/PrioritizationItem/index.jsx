import PropTypes from "prop-types";

const PrioritizationItem = ({ percent, name, count }) => {
  return (
    <div className="flex w-[15rem] flex-row items-center justify-between rounded bg-primary-1 p-1">
      <span className="flex items-center justify-center rounded-sm bg-primary-4 px-2 py-1 text-base text-white">
        {percent}%
      </span>
      <span className="mx-2 flex flex-auto text-base text-gray-4">{name}</span>
      <span className="text-base text-primary-4">{count}</span>
    </div>
  );
};

PrioritizationItem.propTypes = {
  percent: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

export default PrioritizationItem;
