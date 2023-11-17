import {
  ArrowDownIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Fragment } from "react";

import Button from "../../../components/Button";
import NormalButton from "../../../components/NormalButton";
import DonutChart from "../../../components/d3/DonutChart";
import { ButtonVariant } from "../../../utils";
import VulnerabilityTable from "./VulnerabilityTable";

const data = [
  { riskLevel: "medium", value: 50 },
  { riskLevel: "critical", value: 100 },
  { riskLevel: "high", value: 30 },
  { riskLevel: "low", value: 50 },
];

const Vulnerabilities = () => {
  return (
    <Fragment>
      {/* Header */}
      <div className="mb-3 flex flex-row items-center justify-between bg-background px-8">
        <div className="flex flex-row items-center gap-2">
          <span className="text-[1.625rem] font-bold text-gray-4">
            Vulnerabilities
          </span>
        </div>
        <div className="flex flex-row items-center gap-4">
          <Button variant={ButtonVariant.outline}>
            Export vulnerabilities list
          </Button>
          <NormalButton variant={ButtonVariant.icon} className="h-full">
            <MagnifyingGlassIcon className="h-6 w-6" />
          </NormalButton>
          <NormalButton variant={ButtonVariant.icon} className="h-full">
            <FunnelIcon className="h-6 w-6" />
          </NormalButton>
        </div>
      </div>
      <div className="flex flex-row items-start justify-start gap-4 px-7 py-4">
        <div className="flex flex-col items-center bg-white p-4">
          <div className="mb-2 text-base font-bold">Total Vulnerabilities</div>
          <DonutChart
            width={100}
            height={100}
            innerRadius={40}
            outerRadius={50}
            data={data}
          />
          <div className="text-green mt-2 flex flex-row items-center justify-center gap-1 text-base">
            <ArrowDownIcon className="h-3" />
            15%
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="gap-4 px-7 py-4">
        <VulnerabilityTable />
      </div>
    </Fragment>
  );
};

export default Vulnerabilities;
