import CustomTap from "../../../components/CustomTap";
import RiskModal from "../../../components/RiskModal";
import Tag from "../../../components/Tag";
import { RiskLevel } from "../../../utils/risk";
import { InsightInfoTab, InsightInfoTabPanel } from "./TabItems/InsightInfo";
import {
  InsightStatusTab,
  InsightStatusTabPanel,
} from "./TabItems/InsightStatus";
import { RelatedToTab, RelatedToTabPanel } from "./TabItems/RelatedTo";

const DetailModal = ({ ...rest }) => {
  return (
    <RiskModal riskLevel="critical" title="Vulnerable host" {...rest}>
      <div className="w-[56.25rem]">
        <div>
          <div className="mb-3 flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <span className="text-[1.625rem] font-bold text-gray-4">
                Asset no Protected
              </span>
              <Tag riskLevel={RiskLevel["low"]} />
            </div>
          </div>
          <div className="mb-4 flex flex-row gap-6 bg-white p-4">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-4">ID</span>
              <span className="text-sm font-normal text-gray-4">1</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-4">
                Affected assets
              </span>
              <span className="text-sm font-normal text-gray-4">1</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-4">
                Related alerts
              </span>
              <span className="text-sm font-normal text-gray-4">1</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-4">
                Rule version
              </span>
              <span className="text-sm font-normal text-gray-4">1.1</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-4">Start time</span>
              <span className="text-sm font-normal text-gray-4">
                27 Sep 2023 | 07:29:58
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-4">End time</span>
              <span className="text-sm font-normal text-gray-4">
                15 Oct 2023 | 07:31:46
              </span>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <CustomTap
            tabs={[
              <InsightInfoTab key="insight_info" />,
              <RelatedToTab key="related_to" />,
              <InsightStatusTab key="insight_status" />,
            ]}
            tabPanels={[
              <InsightInfoTabPanel key="insight_info" />,
              <RelatedToTabPanel key="related_to" />,
              <InsightStatusTabPanel key="insight_status" />,
            ]}
            tabListClassName="overflow-x-hidden overflow-y-hidden"
            tabPanelClassName="px-1 py-1 bg-gray-1"
            tabActiveClassName="bg-gray-1 text-primary-4"
            tabNormalClassName="bg-white text-gray-3"
          />
        </div>
      </div>
    </RiskModal>
  );
};

export default DetailModal;
