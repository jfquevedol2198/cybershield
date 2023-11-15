import clsx from "clsx";
import PropTypes from "prop-types";

import { RiskLevel, getRiskLevel } from "../../utils/risk";
import NormalButton from "../NormalButton";

const EventCard = ({ title, description, score }) => {
  return (
    <div className="shadow-dropdown mx-2 my-2 flex flex-row gap-2 p-2">
      <span
        className={clsx(
          "flex h-auto w-2 flex-[0_0_8px] rounded-full",
          `bg-${RiskLevel[getRiskLevel(score)].color}`
        )}
      />
      <div className="flex flex-auto flex-col justify-between gap-2 px-2 py-2">
        {title && (
          <div className="text-gray-5 text-[1.375rem] font-bold">{title}</div>
        )}
        {description && (
          <div className="text-gray-5 text-base font-normal">{description}</div>
        )}
        <NormalButton
          className="text-primary-4"
          label="Mitigate"
          onClick={() => alert("Mitigate")}
        />
      </div>
      <div className="flex flex-col justify-center text-center">
        <span className="text-gray-5 text-sm font-normal">Risk score</span>
        <span className="text-gray-5 text-[2.5rem] font-light">{score}%</span>
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
