import clsx from "clsx";
import PropTypes from "prop-types";

import { RiskLevel, getRiskLevel } from "../../utils/risk";

const EventCard = ({ title, description, score }) => {
  return (
    <div className="mx-2 my-2 flex flex-row gap-2 p-2 shadow-dropdown">
      <span
        className={clsx(
          "flex h-auto w-2 flex-[0_0_8px] rounded-full",
          `bg-${RiskLevel[getRiskLevel(score)].color}`
        )}
      />
      <div className="flex flex-auto flex-col justify-between gap-2 px-2 py-2">
        {title && (
          <div className="text-[1.375rem] font-bold text-gray-5">{title}</div>
        )}
        {description && (
          <div className="text-base font-normal text-gray-5">{description}</div>
        )}
      </div>
      <div className="flex flex-col justify-center text-center">
        <span className="text-sm font-normal text-gray-5">Risk score</span>
        <span className="text-[2.5rem] font-light text-gray-5">{score}%</span>
      </div>
    </div>
  );
};

EventCard.defaultProps = {
  title: undefined,
  description: undefined,
};

EventCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  score: PropTypes.number.isRequired,
};

export default EventCard;
