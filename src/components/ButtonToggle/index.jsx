import clsx from "clsx";
import PropTypes from "prop-types";

const ButtonToggle = ({ on = false, label, onClick }) => {
  return (
    <div
      className={clsx(
        "flex h-[60px] w-[150px] cursor-pointer items-center justify-center rounded border bg-white text-[1.375rem] shadow-input",
        on
          ? "border-2 border-primary-4 bg-background text-primary-4"
          : "bg-white"
      )}
      onClick={onClick}
    >
      {label}
    </div>
  );
};

ButtonToggle.propTypes = {
  on: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func,
};

export default ButtonToggle;
