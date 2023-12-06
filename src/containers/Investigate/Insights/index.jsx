import { ArrowDownIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import api from "../../../api";
import Button from "../../../components/Button";
import NormalButton from "../../../components/NormalButton";
import PrioritizationItem from "../../../components/PrioritizationItem";
import SearchInput from "../../../components/SearchInput";
import DonutChart from "../../../components/d3/DonutChart";
import StackedAreaChart from "../../../components/d3/StackedAreaChart";
import { ButtonVariant } from "../../../utils";
import { groupByKey } from "../../../utils/parse";
import InsightsTable from "./InsightsTable";

const dataArea = [
  {
    date: "04/09",
    Rejected: 10,
    New: 20,
    Mitigated: 30,
    "In Progress": 60,
  },
  {
    date: "05/09",
    Rejected: 20,
    New: 30,
    Mitigated: 40,
    "In Progress": 50,
  },
  {
    date: "06/09",
    Rejected: 30,
    New: 40,
    Mitigated: 50,
    "In Progress": 60,
  },
  {
    date: "07/09",
    Rejected: 40,
    New: 50,
    Mitigated: 65,
    "In Progress": 70,
  },
  {
    date: "08/09",
    Rejected: 20,
    New: 35,
    Mitigated: 40,
    "In Progress": 60,
  },
  {
    date: "09/09",
    Rejected: 10,
    New: 40,
    Mitigated: 60,
    "In Progress": 80,
  },
  {
    date: "10/09",
    Rejected: 15,
    New: 25,
    Mitigated: 35,
    "In Progress": 40,
  },
];

const colors = {
  "In Progress": "--secondary-color-1",
  Mitigated: "--primary-color-3",
  New: "--link-color",
  Rejected: "--gray-color-2",
};

const Insights = () => {
  const stackAreaChartRef = useRef(null);
  const [width, setWidth] = useState(0);

  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState([]);
  const [riskData, setRiskData] = useState([]);
  const [groupByType, setGroupByType] = useState([]);

  const debounced = useDebouncedCallback(() => {
    setWidth(stackAreaChartRef.current.clientWidth);
    console.log(stackAreaChartRef.current.clientWidth);
  }, 500);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const {
        data: { data },
      } = await api.getInsights();
      const insights = data;
      setInsights(insights);
      setGroupByType(groupByKey(insights, "type"));

      const riskData = insights.reduce(
        (_data, vul) => {
          const severity = vul.score * 10;
          if (severity > 0 && severity <= 3.5) {
            _data.low++;
          } else if (severity > 3.5 && severity <= 5.5) {
            _data.medium++;
          } else if (severity > 5.5 && severity <= 7.5) {
            _data.high++;
          } else {
            _data.critical++;
          }
          return _data;
        },
        { medium: 0, critical: 0, high: 0, low: 0 }
      );
      setRiskData([
        { riskLevel: "low", value: riskData["low"] },
        { riskLevel: "medium", value: riskData["medium"] },
        { riskLevel: "high", value: riskData["high"] },
        { riskLevel: "critical", value: riskData["critical"] },
      ]);

      setLoading(false);
    };
    fetch();

    setWidth(stackAreaChartRef.current.clientWidth);
    window.addEventListener("resize", debounced);
    return window.removeEventListener("resize", () => {});
  }, []);

  return (
    <Fragment>
      {/* Header */}
      <div className="mb-3 flex flex-row items-center justify-between bg-background px-8">
        <div className="flex flex-row items-center gap-2">
          <span className="text-[1.625rem] font-bold text-gray-4">
            Insights
          </span>
        </div>
        <div className="flex flex-row items-center gap-4">
          <Button variant={ButtonVariant.outline}>EXPORT INSIGHTS LIST</Button>
          <SearchInput onSearch={() => {}} />
          <NormalButton variant={ButtonVariant.icon} className="h-full">
            <FunnelIcon className="h-6 w-6" />
          </NormalButton>
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <div className="flex min-w-[90rem] flex-row items-start justify-start gap-4 px-7 py-4">
          <div className="flex min-w-[220px] flex-col items-center bg-white p-4">
            <div className="mb-2 text-base font-bold">Total Insights</div>
            <DonutChart
              width={100}
              height={100}
              innerRadius={40}
              outerRadius={50}
              data={riskData}
            />
            <div className="mt-2 flex flex-row items-center justify-center gap-1 text-base text-green">
              <ArrowDownIcon className="h-3" />
              15%
            </div>
          </div>
          <div
            className="flex flex-auto flex-col items-center bg-white p-4"
            ref={stackAreaChartRef}
          >
            <div className="flex w-full flex-row items-center justify-between">
              <span className="text-base font-bold">
                Insights status timeline
              </span>
              <div className="flex flex-row items-center gap-2 text-sm font-light">
                {Object.keys(colors).map((key) => {
                  return (
                    <div key={key} className="flex flex-row items-center gap-1">
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: `var(${colors[key]})` }}
                      />
                      <span>{key}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <StackedAreaChart
              width={width - 32}
              height={140}
              data={dataArea}
              colors={colors}
            />
          </div>
          <div className="flex h-[12.25rem] w-[33.25rem] min-w-fit flex-col items-center bg-white p-4 pb-3">
            <div className="flex w-full flex-row items-center justify-between">
              <span className="text-base font-bold">Insight types</span>
            </div>
            {loading && (
              <div className="flex h-full w-full items-center justify-center">
                Loading...
              </div>
            )}
            {!loading && (
              <div className="mt-2 grid grid-cols-2 grid-rows-3 gap-x-5 gap-y-2">
                {groupByType.map((group) => (
                  <PrioritizationItem
                    key={group.type}
                    isReverse
                    percent={group.percent}
                    name={group.type}
                    count={group.count}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="gap-4 px-7 py-4">
        <InsightsTable data={insights} loading={loading} />
      </div>
    </Fragment>
  );
};

export default Insights;
