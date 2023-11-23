import PropTypes from "prop-types";

import AssetsSvg from "../../assets/images/assets-icon.svg";
import CellSvg from "../../assets/images/cell.svg";
import PinSvg from "../../assets/images/pin.svg";
import Tag from "../../components/Tag";
import { RiskLevel, getRiskLevel } from "../../utils/risk";

const FactoryShopCard = ({
  category,
  score,
  description,
  cells,
  assets,
  state,
}) => {
  return (
    <div className="flex w-full min-w-[18rem] cursor-pointer flex-col gap-3 bg-white p-5 hover:opacity-60">
      <div className="flex flex-row items-center justify-between">
        <span className="text-[1.375rem] font-bold">{category}</span>
        <Tag riskLevel={RiskLevel[getRiskLevel(score)]} />
      </div>
      <p className="text-base font-normal text-gray-3">{description}</p>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2">
          <div className="flex flex-row items-center gap-1">
            <img className="w-6" src={CellSvg} alt="" />
            <span className="text-base font-light text-gray-3">{cells}</span>
          </div>
          <div className="flex flex-row items-center gap-1">
            <img className="w-6" src={AssetsSvg} alt="" />
            <span className="text-base font-light text-gray-3">{assets}</span>
          </div>
        </div>

        <div className="flex flex-row items-center gap-1">
          <img className="w-6" src={PinSvg} alt="" />
          <span className="text-base font-light text-gray-3">{state}</span>
        </div>
      </div>
    </div>
  );
};

FactoryShopCard.propTypes = {
  category: PropTypes.string,
  score: PropTypes.number,
  description: PropTypes.string,
  cells: PropTypes.number,
  assets: PropTypes.number,
  state: PropTypes.string,
};

export default FactoryShopCard;
