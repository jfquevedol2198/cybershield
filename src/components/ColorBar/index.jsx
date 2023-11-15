import clsx from "clsx";
import PropTypes from "prop-types";

import { RiskLevel, getRiskLevel } from "../../utils/risk";

const ColorBar = ({ data }) => {
  const total = data.reduce((sum, v) => sum + v, 0);

  return (
    <div className="flex h-[0.625rem] w-full flex-row overflow-hidden rounded-full bg-white">
      {data.map((v, i) => (
        <div
          key={`color-${i}`}
          className={clsx(
            "h-full",
            `bg-${RiskLevel[getRiskLevel((4 - i) * 25)].color}`
          )}
          style={{ width: `${(v / total) * 100}%` }}
        ></div>
      ))}
    </div>
  );
};

ColorBar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number),
};

export default ColorBar;
