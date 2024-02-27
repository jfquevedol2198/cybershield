import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useState } from "react";

import CustomTap from "../../../components/CustomTap";
import Tag from "../../../components/Tag";
import { RiskLevel, getRiskLevel } from "../../../utils/risk";
import {
  AdditionalInfoTab,
  AdditionalInfoTabPanel,
} from "./TabItems/AssetsTab/AdditionalInfo";
import {
  NetworkingTab,
  NetworkingTabPanel,
} from "./TabItems/AssetsTab/Networking";
import { OverviewTab, OverviewTabPanel } from "./TabItems/AssetsTab/Overview";
import {
  PhysicalAdjacentDevicesTab,
  PhysicalAdjacentDevicesTabPanel,
} from "./TabItems/AssetsTab/PhysicalAdjacentDevices";

const AssetRow = ({ data }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="shadow-dropdown">
      <div
        className="flex cursor-pointer flex-row gap-2 bg-background p-2"
        onClick={() => setExpanded(!expanded)}
      >
        <span
          className={clsx(
            "flex h-auto w-2 flex-[0_0_8px] rounded-full",
            `bg-${RiskLevel[getRiskLevel(data?.severity)].color}`
          )}
        />
        <div className="flex flex-auto flex-col justify-between space-y-1 px-2 py-2">
          <div className="text-base font-bold text-gray-5">Siemens</div>
          <div className="text-base font-normal text-gray-5">
            Oil Wells/South Well
          </div>
        </div>
        <div className="flex flex-row items-center space-x-2">
          <span className="text-[2.5rem] font-light text-gray-5">
            <Tag riskLevel={RiskLevel[getRiskLevel(data?.severity)]} />
          </span>
          {expanded ? (
            <ChevronUpIcon className="w-6" />
          ) : (
            <ChevronDownIcon className="w-6" />
          )}
        </div>
      </div>
      {expanded && (
        <div className="bg-background">
          <CustomTap
            tabs={[
              <OverviewTab key="overview" />,
              <AdditionalInfoTab key="additional_info" />,
              <NetworkingTab key="networking" />,
              <PhysicalAdjacentDevicesTab key="physical_adjacent_devices" />,
            ]}
            tabPanels={[
              <OverviewTabPanel key="overview" data={data} />,
              <AdditionalInfoTabPanel key="additional_info" data={data} />,
              <NetworkingTabPanel key="networking" data={data} />,
              <PhysicalAdjacentDevicesTabPanel
                key="physical_adjacent_devices"
                data={data}
              />,
            ]}
            tabListClassName="overflow-x-hidden overflow-y-hidden pl-6"
            tabPanelClassName="px-1 py-1 bg-gray-1"
            tabActiveClassName="bg-gray-1 text-primary-4"
            tabNormalClassName="bg-white text-gray-3"
          />
        </div>
      )}
    </div>
  );
};

AssetRow.propTypes = {
  data: PropTypes.shape(PropTypes.any),
};

export default AssetRow;
