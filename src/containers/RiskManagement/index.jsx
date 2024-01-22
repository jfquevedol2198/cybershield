import { Fragment, useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import api from "../../api";
import ActivityIndicator from "../../components/ActivityIndicator";
import Button from "../../components/Button";
import ColorBar from "../../components/ColorBar";
// import CreateIncidentModal from "../../components/CreateIncidentModal";
import CustomTap from "../../components/CustomTap";
import DropdownSelect from "../../components/DropdownSelect";
import Tag from "../../components/Tag";
import RiskLineChart from "../../components/d3/RiskLineChart";
import { ButtonVariant, SizeVariant } from "../../utils";
import { parseAssets, parseShops } from "../../utils/parse";
import { RiskLevel, getRiskLevel } from "../../utils/risk";
import AffectAssetsTable from "./AffectedAssetsTable";
import {
  PanelAlerts, // PanelIncidents,
  // PanelInsights,
  PanelRisk,
  PanelShops,
  TabAlerts, // TabIncidents,
  // TabInsights,
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
    label: "Last 2 months",
    value: "last_2_months",
  },
];

const RiskManagement = () => {
  const riskLineChartRef = useRef(null);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [averageRisk, setAverageRisk] = useState(0);
  const [risksByLevel, setRiskByLevel] = useState({});
  const [shops, setShops] = useState([]);

  const [width, setWidth] = useState(0);

  const debounced = useDebouncedCallback(() => {
    setWidth(riskLineChartRef.current.clientWidth);
  }, 500);

  useEffect(() => {
    setWidth(riskLineChartRef.current.clientWidth);
    window.addEventListener("resize", debounced);
    return window.removeEventListener("resize", () => {});
  }, [debounced]);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      // assets
      const { data } = await api.getAssets({});
      const assets = parseAssets(data);
      const averageRisk = parseInt(
        assets.reduce((sum, asset) => sum + asset.risk, 0) / assets.length
      );
      const risksByLevel = {};
      assets.forEach(({ risk }) => {
        const riskLevel = getRiskLevel(risk);
        if (risksByLevel[riskLevel]) {
          risksByLevel[riskLevel]++;
        } else {
          risksByLevel[riskLevel] = 1;
        }
      });
      setRiskByLevel(risksByLevel);

      setAverageRisk(averageRisk);
      setAssets(assets);

      // shops
      const { data: shopsData } = await api.getShops();
      const shops = parseShops(shopsData);
      setShops(shops);

      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <Fragment>
      {/* Header */}
      <div className="mb-3 flex flex-row items-center justify-between bg-background px-8">
        <div className="flex flex-row items-center gap-2">
          <span className="text-[1.625rem] font-bold text-gray-4">
            Global Risk
          </span>
          <Tag riskLevel={RiskLevel[getRiskLevel(averageRisk)]} />
        </div>
        <div className="text-right text-sm font-medium text-gray-5">
          LAST SCAN 30
          <br />
          Nov 2023 | 20:00:58
        </div>
      </div>
      {loading && <ActivityIndicator />}
      {/* Content */}
      <div className="grid grid-cols-1 gap-5 bg-background px-8 2xl:grid-cols-2">
        <div>
          <CustomTap
            tabs={[
              <TabRisk key="risk" value={averageRisk} />,
              <TabAlerts key="alerts" value={253} />,
              <TabShops key="shops" value={shops.length} />,
              // <TabInsights key="insights" value={3} />,
              // <TabIncidents key="incidents" value={2} />,
            ]}
            tabPanels={[
              <PanelRisk key="risk" />,
              <PanelAlerts key="alerts" />,
              <PanelShops key="shops" shops={shops} />,
              // <PanelInsights key="insights" />,
              // <PanelIncidents key="incidents" />,
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
        <div
          className="h-auto overflow-auto bg-white px-7 py-5"
          style={{ height: "calc(100vh - 200px)" }}
        >
          <div className="mb-3">
            <div className="mb-3 flex flex-row items-end justify-between">
              <div className="text-[1.375rem] font-bold">Affected Assets</div>
              <div>
                <span className="mr-1 text-[2.75rem] font-light">52</span>
                <span className="text-[1.5rem] font-light">
                  /{assets.length}
                </span>
              </div>
            </div>
            <ColorBar
              data={[
                risksByLevel["critical"] || 0,
                risksByLevel["high"] || 0,
                risksByLevel["medium"] || 0,
                risksByLevel["low"] || 0,
                risksByLevel["none"] || 0,
              ]}
            />
          </div>
          <div className="mb-8 text-base font-normal">
            Review the affected assets.
          </div>
          <AffectAssetsTable data={assets} />
          <Button
            className="mt-4"
            variant={ButtonVariant.outline}
            size={SizeVariant.small}
            onClick={() => (location.href = "/dashboard/assets")}
          >
            SEE ALL AFFECTED ASSETS
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default RiskManagement;
