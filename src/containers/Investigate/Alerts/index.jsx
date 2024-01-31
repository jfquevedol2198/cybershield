import { FunnelIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import apiClient from "../../../api8000";
import ActivityIndicator from "../../../components/ActivityIndicator";
import ExportButton from "../../../components/ExportButton";
import NormalButton from "../../../components/NormalButton";
import PrioritizationItem from "../../../components/PrioritizationItem";
import SearchAndFilter from "../../../components/SearchAndFilter";
import SearchInput from "../../../components/SearchInput";
import DonutChart from "../../../components/d3/DonutChart";
import StackedAreaChartComponent from "../../../components/d3/StackedAreaChartComponent";
import useSearchAndFilter from "../../../hooks/useSearchAndFilter";
import { ButtonVariant } from "../../../utils";
import { getFilterOptions } from "../../../utils/filter";
import { groupByKey, parseAlerts } from "../../../utils/parse";
import { getRiskDataByCategory } from "../../../utils/risk";
import AlertsTable from "./AlertsTable";
import Filter from "./Filter";

// const colors = {
//   "In Progress": "--secondary-color-1",
//   Mitigated: "--primary-color-3",
//   New: "--link-color",
//   Rejected: "--gray-color-2",
// };

const Alerts = () => {
  const stackAreaChartRef = useRef(null);
  const [, setWidth] = useState(0);

  const [loading, setLoading] = useState(false);
  const [riskData, setRiskData] = useState([]);
  const [groupByType, setGroupByType] = useState([]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState([]);

  const { setPageData, filterData, addFilter, hasFilterAndSearch } =
    useSearchAndFilter();

  const debounced = useDebouncedCallback(() => {
    setWidth(stackAreaChartRef.current.clientWidth);
  }, 500);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);

      const { data } = await apiClient.getDwAlerts();
      const alerts = parseAlerts(data);

      setPageData(alerts);
      setGroupByType(groupByKey(alerts, "type_name"));
      setFilterOptions(getFilterOptions(alerts));

      const riskData = getRiskDataByCategory(alerts, "severity");
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

  /**
   * Filter
   * @param {*} data
   */
  const onFilter = (data) => {
    addFilter(data);
    setIsFilterOpen(false);
  };

  return (
    <Fragment>
      {loading && <ActivityIndicator />}
      {/* Header */}
      <div className="mb-3 flex flex-row items-center justify-between bg-background px-8">
        <div className="flex flex-row items-center gap-2">
          <span className="text-[1.625rem] font-bold text-gray-4">Alerts</span>
        </div>
        <div className="flex flex-row items-center gap-4">
          <ExportButton name="alerts" label="EXPORT ALERTS LIST" />
          <SearchInput />
          <NormalButton
            variant={ButtonVariant.icon}
            className="h-full"
            onClick={() => setIsFilterOpen(true)}
          >
            <FunnelIcon className="h-6 w-6" />
          </NormalButton>
        </div>
      </div>
      <div className="px-8">
        <SearchAndFilter />
      </div>
      {!hasFilterAndSearch && (
        <div className="w-full overflow-x-auto">
          <div className="flex min-w-[90rem] flex-row items-start justify-start gap-4 px-7 py-4">
            <div className="flex min-w-[220px] flex-col items-center bg-white p-4">
              <div
                className="mb-2 text-base font-bold"
                style={{ marginBottom: "65px" }}
              >
                Total Alerts
              </div>
              <p
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "65px",
                  zIndex: "0",
                  position: "relative",
                  color: "grey",
                  backgroundColor: "white",
                  fontSize: "11px",
                  alignSelf: "center",
                  marginBottom: "-75px",
                  borderRadius: "20px",
                }}
              >
                Alerts
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <DonutChart
                  width={100}
                  height={100}
                  innerRadius={40}
                  outerRadius={50}
                  data={riskData}
                />
              </div>
              <div className="mt-8 flex flex-row items-center justify-center gap-1 text-base text-green">
                {/* <ArrowDownIcon className="h-3" />
                15% */}
              </div>
            </div>
            <div
              className="flex flex-auto flex-col items-center bg-white p-4"
              ref={stackAreaChartRef}
            >
              <div className="flex w-full flex-row items-center justify-between">
                <span className="text-base font-bold">
                  Alerts status timeline
                </span>
              </div>
              {/* Nuevo grafico */}
              <StackedAreaChartComponent />
            </div>
            <div className="flex h-[12.25rem] w-[33.25rem] min-w-fit flex-col items-center bg-white p-4 pb-3">
              <div className="flex w-full flex-row items-center justify-between">
                <span className="text-base font-bold">Alert types</span>
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
                      key={group.type_name}
                      isReverse
                      percent={group.percent}
                      name={(group.type || "N/D")
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase())}
                      count={group.count}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Content */}
      <div className="gap-4 px-7 py-4">
        <AlertsTable data={filterData} />
      </div>
      {/* Filter */}
      <Filter
        isOpen={isFilterOpen}
        onSubmit={onFilter}
        onClose={() => setIsFilterOpen(false)}
        filterOptions={filterOptions}
      />
    </Fragment>
  );
};

export default Alerts;
