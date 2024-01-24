import Button from "../../../components/Button";
import CustomTap from "../../../components/CustomTap";
import ExportButton from "../../../components/ExportButton";
import RiskModal from "../../../components/RiskModal";
import Tag from "../../../components/Tag";
import { ButtonVariant } from "../../../utils";
import { RiskLevel } from "../../../utils/risk";
import { AlertInfoTab, AlertInfoTabPanel } from "./TabItems/AlertInfo";
import { AlertStatusTab, AlertStatusTabPanel } from "./TabItems/AlertStatus";
import { MitigationTab, MitigationTabPanel } from "./TabItems/Mitigation";
import { MitreTab, MitreTabPanel } from "./TabItems/Mitre";
import { RelatedToTab, RelatedToTabPanel } from "./TabItems/RelatedTo";

const DetailModal = ({ ...rest }) => {
  return (
    <RiskModal
      riskLevel="critical"
      title="Network Events / Firewall Policy"
      {...rest}
    >
      <div className="w-[56.25rem]">
        <div>
          <div className="mb-3 flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <span className="text-[1.625rem] font-bold text-gray-4">
                Insecured Internal Communication
              </span>
              <Tag riskLevel={RiskLevel["critical"]} />
            </div>
          </div>
          <div className="mb-4 flex flex-row gap-6 bg-white p-4">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-4">ID</span>
              <span className="text-sm font-normal text-gray-4">1781</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-4">Status</span>
              <span className="text-sm font-normal text-gray-4">New</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-4">Alert time</span>
              <span className="text-sm font-normal text-gray-4">
                30 Nov 2023 | 20:00:58
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-4">Asset name</span>
              <span className="text-sm font-normal text-link">
                Palo Alto Firewall 127
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-4">Asset IP</span>
              <span className="text-sm font-normal text-gray-4">
                192.168.100.25
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-4">MITRE ID</span>
              <span className="text-sm font-normal text-gray-4">N/A</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-4">Assignee</span>
              <span className="text-sm font-normal text-gray-4">
                Unassigned
              </span>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <CustomTap
            tabs={[
              <AlertInfoTab key="alert_info" />,
              <MitigationTab key="mitigation" />,
              <MitreTab key="mitre" />,
              <RelatedToTab key="related_to" />,
              <AlertStatusTab key="alert_status" />,
            ]}
            tabPanels={[
              <AlertInfoTabPanel key="alert_info" />,
              <MitigationTabPanel key="mitigation" />,
              <MitreTabPanel key="mitre" />,
              <RelatedToTabPanel key="related_to" />,
              <AlertStatusTabPanel key="alert_status" />,
            ]}
            tabListClassName="overflow-x-hidden overflow-y-hidden"
            tabPanelClassName="px-1 py-1 bg-gray-1"
            tabActiveClassName="bg-gray-1 text-primary-4"
            tabNormalClassName="bg-white text-gray-3"
          />
        </div>
        <div className="flex flex-row items-center justify-end gap-2">
          <ExportButton name="incidents" label="EXPORT REPORT" />
          <Button variant={ButtonVariant.filled} onClick={rest.closeModal}>
            CREATE INCIDENT
          </Button>
        </div>
      </div>
    </RiskModal>
  );
};

export default DetailModal;
