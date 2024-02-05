import PropTypes from "prop-types";

import CustomTap from "../../../components/CustomTap";
import RiskModal from "../../../components/RiskModal";
import Tag from "../../../components/Tag";
import { dateFormat } from "../../../utils";
import { RiskLevel, getRiskLevel } from "../../../utils/risk";
// import { AlertsTab, AlertsTabPanel } from "./TabItems/Alerts";
// import { AssetsTab, AssetsTabPanel } from "./TabItems/Assets";
import { InformationTab, InformationTabPanel } from "./TabItems/Information";

const DetailModal = ({ isOpen, data, closeModal }) => {
  return (
    <RiskModal
      isOpen={isOpen}
      riskLevel={RiskLevel[getRiskLevel(data?.severity)]}
      title="Oil Wells/South Well"
      closeModal={closeModal}
    >
      <div className="w-[56.25rem]">
        <div className="mb-3 flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <span className="text-[1.625rem] font-bold text-gray-4">
              Siemens
            </span>
            <Tag riskLevel={RiskLevel[getRiskLevel(data?.severity)]} />
          </div>
          {/* <div className="flex flex-row items-center">
            <Stats count={5} label="Related Alerts" />
            <Stats
              count={9}
              label="Affected Assets"
              isLeftBorder
              isRightBorder
            />
            <Stats count={2} label="Duration Time" />
          </div> */}
        </div>
        <div className="mb-4 flex w-[56.25rem] flex-row gap-6 bg-white p-4">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-4">Status</span>
            <span className="text-sm font-normal text-gray-4">
              {data?.state}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-4">Type</span>
            <span className="text-sm font-normal text-gray-4">
              {data?.subcategory}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-4">Cell</span>
            <span className="text-sm font-normal text-gray-4">
              {data?.location}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-4">Creation time</span>
            <span className="text-sm font-normal text-gray-4">
              {dateFormat(data?.opened_at)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-4">Last updated</span>
            <span className="text-sm font-normal text-gray-4">
              {dateFormat(data?.sys_updated_on)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-4">
              Assignment group
            </span>
            <span className="text-sm font-normal text-gray-4">
              {data?.assignment_group}
            </span>
          </div>
        </div>
      </div>
      <div className="w-[56.25rem]">
        <CustomTap
          tabs={[
            <InformationTab key="information" data={data} />,
            // <AlertsTab key="alerts" data={data} />,
            // <AssetsTab key="assets" data={data} />,
          ]}
          tabPanels={[
            <InformationTabPanel key="information" data={data} />,
            // <AlertsTabPanel key="alerts" data={data} />,
            // <AssetsTabPanel key="assets" data={data} />,
          ]}
          tabListClassName="overflow-x-hidden overflow-y-hidden"
          tabPanelClassName="px-1 py-1 bg-gray-1"
          tabActiveClassName="bg-gray-1 text-primary-4"
          tabNormalClassName="bg-white text-gray-3"
        />
      </div>
    </RiskModal>
  );
};

DetailModal.propTypes = {
  isOpen: PropTypes.bool,
  data: PropTypes.shape(PropTypes.any),
  closeModal: PropTypes.func,
};

export default DetailModal;
