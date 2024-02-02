import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useState } from "react";

import CustomTap from "../../../components/CustomTap";
import Tag from "../../../components/Tag";
import { dateFormat } from "../../../utils";
import { RiskLevel, getRiskLevel } from "../../../utils/risk";
import {
  AlertDetailsTab,
  AlertDetailsTabPanel,
} from "./TabItems/AlertsTab/AlertDetails";
import {
  AlertInfoTab,
  AlertInfoTabPanel,
} from "./TabItems/AlertsTab/AlertInfo";
import {
  AlertStatusTab,
  AlertStatusTabPanel,
} from "./TabItems/AlertsTab/AlertStatus";
import {
  MitigationTab,
  MitigationTabPanel,
} from "./TabItems/AlertsTab/Mitigation";
import { MitreTab, MitreTabPanel } from "./TabItems/AlertsTab/Mitre";

const AlertRow = ({ data }) => {
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
          <div className="text-base font-bold text-gray-5">Failure</div>
          <div className="text-base font-normal text-gray-5">
            {data?.assignment_group} ({dateFormat(data?.opened_at)})
          </div>
        </div>
        <div className="flex flex-row items-center space-x-2">
          <span className="text-sm font-normal text-gray-5">{data?.state}</span>
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
              <AlertInfoTab key="alert_summary" />,
              <AlertDetailsTab key="alert_details" />,
              <MitigationTab key="mitigation" />,
              <AlertStatusTab key="alert_status" />,
              <MitreTab key="mitre" />,
            ]}
            tabPanels={[
              <AlertInfoTabPanel key="alert_summary" data={data} />,
              <AlertDetailsTabPanel key="alert_details" />,
              <MitigationTabPanel key="mitigation" />,
              <AlertStatusTabPanel key="alert_status" data={data} />,
              <MitreTabPanel key="mitre" />,
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

AlertRow.propTypes = {
  data: PropTypes.shape(PropTypes.any),
};

export default AlertRow;
