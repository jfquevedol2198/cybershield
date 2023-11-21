import { Fragment, useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import Button from "../../components/Button";
import ColorBar from "../../components/ColorBar";
import CustomTap from "../../components/CustomTap";
import DropdownSelect from "../../components/DropdownSelect";
import Tag from "../../components/Tag";
import RiskLineChart from "../../components/d3/RiskLineChart";
import { ButtonVariant, SizeVariant } from "../../utils";
import { RiskLevel } from "../../utils/risk";
import AffectAssetsTable from "./AffectedAssetsTable";
import {
  PanelAlerts,
  PanelIncidents,
  PanelInsights,
  PanelRisk,
  PanelShops,
  TabAlerts,
  TabIncidents,
  TabInsights,
  TabRisk,
  TabShops,
} from "./TabItems";

const Period = [
  {
    label: "Last 7 days",
    value: "last_7_days",
  },
  {
    label: "Last 15 days",
    value: "last_15_days",
  },
  {
    label: "Last month",
    value: "last_month",
  },
  {
    label: "Last 2 montsh",
    value: "last_2_months",
  },
];

const RiskManagement = () => {
  const riskLineChartRef = useRef(null);
  const [width, setWidth] = useState(0);
  const debounced = useDebouncedCallback(() => {
    setWidth(riskLineChartRef.current.clientWidth);
    console.log(riskLineChartRef.current.clientWidth);
  }, 500);

  useEffect(() => {
    setWidth(riskLineChartRef.current.clientWidth);
    window.addEventListener("resize", debounced);
    return window.removeEventListener("resize", () => {});
  }, []);

  return (
    <Fragment>
      {/* Header */}
      <div className="mb-3 flex flex-row items-center justify-between bg-background px-8">
        <div className="flex flex-row items-center gap-2">
          <span className="text-[1.625rem] font-bold text-gray-4">
            Global Risk
          </span>
          <Tag riskLevel={RiskLevel.critical} />
        </div>
        <div className="text-right text-sm font-medium text-gray-5">
          LAST SCAN 30
          <br />
          Nov 2023 | 20:00:58
        </div>
      </div>
      {/* Content */}
      <div className="grid grid-cols-1 gap-5 bg-background px-8 2xl:grid-cols-2">
        <div>
          <CustomTap
            tabs={[
              <TabRisk key="risk" />,
              <TabAlerts key="alerts" value={253} />,
              <TabShops key="shops" value={4} />,
              <TabInsights key="insights" value={3} />,
              <TabIncidents key="incidents" value={2} />,
            ]}
            tabPanels={[
              <PanelRisk key="risk" />,
              <PanelAlerts key="alerts" />,
              <PanelShops key="shops" />,
              <PanelInsights key="insights" />,
              <PanelIncidents key="incidents" />,
            ]}
            tabListClassName="overflow-x-hidden overflow-y-hidden"
            tabPanelClassName="px-7 py-8 bg-white h-[35rem]"
          />
          <div className="mt-4 bg-white p-7">
            <div className="flex flex-row items-center justify-between">
              <span className="text-xl font-bold text-gray-4">
                Risk over time
              </span>
              <div className="w-50">
                <DropdownSelect data={Period} onSelect={() => {}} />
              </div>
            </div>
            <div className="mt-6 overflow-hidden" ref={riskLineChartRef}>
              <RiskLineChart width={width} height={250} />
            </div>
          </div>
        </div>
        {/* Affected Assets Table */}
        <div className="h-auto bg-white px-7 py-5">
          <div className="mb-3">
            <div className="mb-3 flex flex-row items-end justify-between">
              <div className="text-[1.375rem] font-bold">Affected Assets</div>
              <div>
                <span className="mr-1 text-[2.75rem] font-light">52</span>
                <span className="text-[1.5rem] font-light">/70</span>
              </div>
            </div>
            <ColorBar data={[5, 4, 3, 2, 1]} />
          </div>
          <div className="mb-8 text-base font-normal">
            Review the affected assets.
          </div>
          <AffectAssetsTable />
          <Button
            className="mt-4"
            variant={ButtonVariant.outline}
            size={SizeVariant.small}
          >
            SEE ALL AFFECTED ASSETS
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default RiskManagement;
