import Button from "../../components/Button";
import CustomTap from "../../components/CustomTap";
import ExportButton from "../../components/ExportButton";
import RiskModal from "../../components/RiskModal";
import Stats from "../../components/Stats";
import Tag from "../../components/Tag";
import { ButtonVariant } from "../../utils";
import { RiskLevel } from "../../utils/risk";
import {
  AdditionalInfoTab,
  AdditionalInfoTabPanel,
} from "./TabItems/AdditionalInfo";
import { NetworkingTab, NetworkingTabPanel } from "./TabItems/Networking";
import { OverviewTab, OverviewTabPanel } from "./TabItems/Overview";
import {
  PhysicalAdjacentDevicesTab,
  PhysicalAdjacentDevicesTabPanel,
} from "./TabItems/PhysicalAdjacentDevices";

const DetailModal = ({ ...rest }) => {
  return (
    <RiskModal riskLevel="critical" title="Oil Wells/South Well" {...rest}>
      <div className="w-[56.25rem]">
        <div className="mb-3 flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <span className="text-[1.625rem] font-bold text-gray-4">
              Siemens
            </span>
            <Tag riskLevel={RiskLevel["critical"]} />
          </div>
          <div className="flex flex-row items-center">
            <Stats count={5} label="Related Alerts" />
            <Stats
              count={9}
              label="Vulnerabilities"
              isLeftBorder
              isRightBorder
            />
            <Stats count={2} label="Incidents" />
          </div>
        </div>
        <div className="mb-4 flex flex-row gap-6 bg-white p-4">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-4">ID</span>
            <span className="text-sm font-normal text-gray-4">122</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-4">Type</span>
            <span className="text-sm font-normal text-gray-4">Controller</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-4">MAC</span>
            <span className="text-sm font-normal text-gray-4">
              ac:64:17:09:7b:d3 +2
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-4">IP</span>
            <span className="text-sm font-normal text-gray-4">
              192.168.100.91
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-4">EXTERNAL ID</span>
            <span className="text-sm font-normal text-gray-4">N/A</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-4">Vendor</span>
            <span className="text-sm font-normal text-gray-4">Siemens</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-4">Impact level</span>
            <span className="text-sm font-normal text-gray-4">None</span>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <CustomTap
          tabs={[
            <OverviewTab key="overview" />,
            <AdditionalInfoTab key="additional_info" />,
            <NetworkingTab key="networking" />,
            <PhysicalAdjacentDevicesTab key="physical_adjacent_devices" />,
          ]}
          tabPanels={[
            <OverviewTabPanel key="overview" />,
            <AdditionalInfoTabPanel key="additional_info" />,
            <NetworkingTabPanel key="networking" />,
            <PhysicalAdjacentDevicesTabPanel key="physical_adjacent_devices" />,
          ]}
          tabListClassName="overflow-x-hidden overflow-y-hidden"
          tabPanelClassName="px-1 py-1 bg-gray-1"
          tabActiveClassName="bg-gray-1 text-primary-4"
          tabNormalClassName="bg-white text-gray-3"
        />
      </div>
      <div className="flex flex-row items-center justify-end gap-2">
        <ExportButton name="incident" label="EXPORT REPORT" />
        <Button variant={ButtonVariant.filled} isSubmit>
          OPEN INCIDENT
        </Button>
      </div>
    </RiskModal>
  );
};

export default DetailModal;
