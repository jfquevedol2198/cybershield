import PropTypes from "prop-types";

import AssetsSvg from "../../assets/images/assets-icon.svg";
import PinSvg from "../../assets/images/pin.svg";
import { RiskLevel, getRiskLevel } from "../../utils/risk";
import Tag from "../Tag";

const FactoryShopCell = ({ name, score, description, assets, location }) => {
  return (
    <div className="flex w-full min-w-[18rem] cursor-pointer flex-col gap-3 bg-white p-5 hover:opacity-60">
      <div className="flex flex-row items-center justify-between">
        <span className="text-[1.375rem] font-bold">{name}</span>
        <Tag riskLevel={RiskLevel[getRiskLevel(score)]} />
      </div>
      <p className="text-base font-normal text-gray-3">{description}</p>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2">
          <div className="flex flex-row items-center gap-1">
            <img className="w-6" src={AssetsSvg} alt="" />
            <span className="text-base font-light text-gray-3">{assets}</span>
          </div>
        </div>

        <div className="flex flex-row items-center gap-1">
          <img className="w-6" src={PinSvg} alt="" />
          <span className="text-base font-light text-gray-3">{location}</span>
        </div>
      </div>
    </div>
  );
};

FactoryShopCell.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
  description: PropTypes.string,
  assets: PropTypes.number,
  location: PropTypes.string,
};

export default FactoryShopCell;
