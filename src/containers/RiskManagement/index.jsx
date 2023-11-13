import { Fragment } from "react";

import Tag, { RiskLevel } from "../../components/Tag";

const RiskManagement = () => {
  return (
    <Fragment>
      {/* Header */}
      <div className="flex flex-row items-center justify-between px-8">
        <div className="flex flex-row items-center gap-2">
          <span className="text-[1.625rem] font-bold text-gray-4">
            Global Risk
          </span>
          <Tag riskLevel={RiskLevel.critical} />
        </div>
        <div className="text-gray-5 text-right text-sm font-medium">
          LAST SCAN 30
          <br />
          Nov 2023 | 20:00:58
        </div>
      </div>
      {/* Content */}
    </Fragment>
  );
};

export default RiskManagement;
