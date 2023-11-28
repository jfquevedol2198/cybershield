import clsx from "clsx";
import PropTypes from "prop-types";

const PrioritizationItem = ({ percent, name, count, isReverse }) => {
  return (
    <div
      className={clsx(
        "flex w-[15rem] items-center justify-between rounded bg-primary-1 p-1",
        isReverse ? "flex-row-reverse" : "flex-row"
      )}
    >
      <span className="flex flex-[0_0_48px] items-center justify-center rounded-sm bg-primary-4 px-2 py-1 text-base text-white">
        {percent}%
      </span>
      <span className="mx-2 flex flex-auto truncate text-base text-gray-4">
        {name}
      </span>
      <span className="text-base text-primary-4">{count}</span>
    </div>
  );
};

PrioritizationItem.propTypes = {
  percent: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  isReverse: PropTypes.bool,
};

export default PrioritizationItem;
