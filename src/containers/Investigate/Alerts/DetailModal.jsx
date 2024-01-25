import dayjs from "dayjs";
import PropTypes from "prop-types";

import Button from "../../../components/Button";
import CustomTap from "../../../components/CustomTap";
import ExportButton from "../../../components/ExportButton";
import RiskModal from "../../../components/RiskModal";
import Tag from "../../../components/Tag";
import { ButtonVariant } from "../../../utils";
import { RiskLevel, getRiskLevel } from "../../../utils/risk";
import { AlertInfoTab, AlertInfoTabPanel } from "./TabItems/AlertInfo";
import { AlertStatusTab, AlertStatusTabPanel } from "./TabItems/AlertStatus";
import { MitigationTab, MitigationTabPanel } from "./TabItems/Mitigation";
import { MitreTab, MitreTabPanel } from "./TabItems/Mitre";
import { RelatedToTab, RelatedToTabPanel } from "./TabItems/RelatedTo";

const DetailModal = ({ data, ...rest }) => {
  if (!data) return <div>Data Error</div>;
  const {
    severity,
    numeric_id,
    status,
    created_at,
    nameasset,
    destination_asset_ip,
    assignee_user_id,
    category_name,
    type_name,
    subtype_name,
  } = data;
  return (
    <RiskModal
      title={`${category_name || "N/A"} / ${type_name || "N/A"}`}
      {...rest}
      riskLevel={RiskLevel[getRiskLevel(severity)]}
    >
      <div className="w-[56.25rem]">
        <div>
          <div className="mb-3 flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <span className="text-[1.625rem] font-bold text-gray-4">
                {subtype_name || "N/A"}
              </span>
              <Tag riskLevel={RiskLevel[getRiskLevel(severity)]} />
            </div>
          </div>
          <div className="mb-4 flex flex-row gap-6 bg-white p-4">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-4">ID</span>
              <span className="text-sm font-normal text-gray-4">
                {numeric_id}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-4">Status</span>
              <span className="text-sm font-normal text-gray-4">{status}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-4">Alert time</span>
              <span className="text-sm font-normal text-gray-4">
                {dayjs(created_at).format("DD MMM YYYY | HH:mm:ss")}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-4">Asset name</span>
              <span className="text-sm font-normal text-link">{nameasset}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-4">Asset IP</span>
              <span className="text-sm font-normal text-gray-4">
                {destination_asset_ip}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-4">MITRE ID</span>
              <span className="text-sm font-normal text-gray-4">N/A</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-4">Assignee</span>
              <span className="text-sm font-normal text-gray-4">
                {assignee_user_id || "Unassigned"}
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
              <AlertInfoTabPanel key="alert_info" data={data} />,
              <MitigationTabPanel key="mitigation" />,
              <MitreTabPanel key="mitre" />,
              <RelatedToTabPanel key="related_to" />,
              <AlertStatusTabPanel key="alert_status" data={data} />,
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

DetailModal.defaultProps = {
  data: {},
};

DetailModal.propTypes = {
  data: PropTypes.shape(PropTypes.any),
};

export default DetailModal;
