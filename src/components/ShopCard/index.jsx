import clsx from "clsx";
import PropTypes from "prop-types";

import { ButtonVariant } from "../../utils";
import { RiskLevel, getRiskLevel } from "../../utils/risk";
import Button from "../Button";

const ShopCard = ({ category, score }) => {
  return (
    <div className="mx-2 my-2 flex h-20 flex-row items-center gap-2 p-2 shadow-dropdown">
      <span
        className={clsx(
          "flex h-16 w-2 flex-[0_0_8px] rounded-full",
          `bg-${RiskLevel[getRiskLevel(score)].color}`
        )}
      />
      <div className="flex flex-auto flex-col justify-between gap-2 px-2 py-2">
        {category}
      </div>
      <Button variant={ButtonVariant.filled}>GO TO ALERTS</Button>
    </div>
  );
};

ShopCard.propTypes = {
  category: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default ShopCard;
