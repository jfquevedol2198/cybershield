import clsx from "clsx";
import PropTypes from "prop-types";
import { useState } from "react";

const ButtonToggle = ({ on = false, label }) => {
  const [isOn, setIsOn] = useState(on);

  return (
    <div
      className={clsx(
        "flex h-[60px] w-[150px] cursor-pointer items-center justify-center rounded border bg-white text-[1.375rem] shadow-input",
        isOn
          ? "border-2 border-primary-4 bg-background text-primary-4"
          : "bg-white"
      )}
      onClick={() => setIsOn(!isOn)}
    >
      {label}
    </div>
  );
};

ButtonToggle.propTypes = {
  on: PropTypes.bool,
  label: PropTypes.string,
};

export default ButtonToggle;
