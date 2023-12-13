import clsx from "clsx";
import PropTypes from "prop-types";

const Stats = ({ count, label, isLeftBorder, isRightBorder }) => {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-start gap-2 px-3",
        isLeftBorder && "border-l-[1px] border-gray-1",
        isRightBorder && "border-r-[1px] border-gray-1"
      )}
    >
      <span className="text-xl text-link">{`${count}`.padStart(2, "0")}</span>
      <span className="max-w-[25rem] text-sm font-normal text-gray-4">
        {label}
      </span>
    </div>
  );
};

Stats.propTypes = {
  count: PropTypes.number,
  label: PropTypes.string,
  isLeftBorder: PropTypes.bool,
  isRightBorder: PropTypes.bool,
};

export default Stats;
