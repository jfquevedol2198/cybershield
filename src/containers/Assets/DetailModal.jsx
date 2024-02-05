import PropTypes from "prop-types";

import Button from "../../components/Button";
import CustomTap from "../../components/CustomTap";
import ExportButton from "../../components/ExportButton";
import RiskModal from "../../components/RiskModal";
import Stats from "../../components/Stats";
import Tag from "../../components/Tag";
import { ButtonVariant, stringFormat } from "../../utils";
import { RiskLevel, getRiskLevel } from "../../utils/risk";
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

const DetailModal = ({ data, closeModal, isOpen, onCreateIncident }) => {
  return (
    <RiskModal
      riskLevel={RiskLevel[getRiskLevel(data?.risk_score * 10)]}
      isOpen={isOpen}
      closeModal={closeModal}
    >
      <div className="w-[56.25rem]">
        <div className="mb-3 flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <span className="text-[1.625rem] font-bold text-gray-4">
              {data?.vendor_name}
            </span>
            <Tag riskLevel={RiskLevel[getRiskLevel(data?.risk_score * 10)]} />
          </div>
          <div className="flex flex-row items-center">
            <Stats
              count={data?.related_alerts_count || 0}
              label="Related Alerts"
              isLink={false}
            />
            <Stats
              count={data?.related_vulnerabilities_count || 0}
              label="Vulnerabilities"
              isLeftBorder
              isRightBorder
              isLink={false}
            />
            <Stats
              count={data?.count_incident}
              label="Incidents"
              isLink={false}
            />
          </div>
        </div>
        <div className="mb-4 flex flex-row gap-6 bg-white p-4 ">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-4">ID</span>
            <span className="text-sm font-normal text-gray-4">
              {stringFormat(data?.numeric_id)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-4">Type</span>
            <span className="text-sm font-normal text-gray-4">
              {stringFormat(data?.type)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-4">MAC</span>
            <span className="text-sm font-normal text-gray-4">
              {stringFormat(data?.interfaces_mac)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-4">IP</span>
            <span className="text-sm font-normal text-gray-4">
              {stringFormat(data?.interfaces_ip)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-4">EXTERNAL ID</span>
            <span className="text-sm font-normal text-gray-4">
              {stringFormat(data?.external_id_sites)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-4">Vendor</span>
            <span className="text-sm font-normal text-gray-4">
              {stringFormat(data?.vendor_name)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-4">Impact level</span>
            <span className="text-sm font-normal text-gray-4">None</span>
          </div>
        </div>
      </div>
      <div className="mb-4 w-[56.25rem]">
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
          tabListClassName="overflow-x-hidden overflow-y-hidden"
          tabPanelClassName="px-1 py-1 bg-gray-1"
          tabActiveClassName="bg-gray-1 text-primary-4"
          tabNormalClassName="bg-white text-gray-3"
        />
      </div>
      <div className="flex flex-row items-center justify-end gap-2">
        <ExportButton name="incident" label="EXPORT REPORT" />
        <Button variant={ButtonVariant.filled} onClick={onCreateIncident}>
          CREATE INCIDENT
        </Button>
      </div>
    </RiskModal>
  );
};

DetailModal.propTypes = {
  isOpen: PropTypes.bool,
  data: PropTypes.shape(PropTypes.any),
  closeModal: PropTypes.func,
  onCreateIncident: PropTypes.func,
};

export default DetailModal;
