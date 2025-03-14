import { ArrowDownIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import api from "../../api8000";
import ActivityIndicator from "../../components/ActivityIndicator";
import Button from "../../components/Button";
import ExportButton from "../../components/ExportButton";
import NormalButton from "../../components/NormalButton";
import PrioritizationItem from "../../components/PrioritizationItem";
import SearchAndFilter from "../../components/SearchAndFilter";
import SearchInput from "../../components/SearchInput";
import DonutChart from "../../components/d3/DonutChart";
import StackedAreaChart from "../../components/d3/StackedAreaChart";
import useSearchAndFilter from "../../hooks/useSearchAndFilter";
import { ButtonVariant } from "../../utils";
import { getFilterOptions } from "../../utils/filter";
import { groupByKey, parseIncident } from "../../utils/parse";
import { getRiskDataByCategory } from "../../utils/risk";
import CreateIncidentModal from "./CreateIncidentModal";
import Filter from "./Filter";
import IncidentsTable from "./IncidentsTable";

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

const Incidents = () => {
  const stackAreaChartRef = useRef(null);
  const [width, setWidth] = useState(0);

  const [loading, setLoading] = useState(false);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState({});

  const [isCreateModal, setIsCreateModal] = useState(false);

  const [riskData, setRiskData] = useState([]);
  const [groupByCveID, setGroupByCveID] = useState([]);

  const { setPageData, filterData, addFilter, hasFilterAndSearch } =
    useSearchAndFilter();

  const debounced = useDebouncedCallback(() => {
    setWidth(stackAreaChartRef.current.clientWidth);
  }, 500);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const { data } = await api.getIncidents();
        const incidents = parseIncident(data);
        setPageData(incidents);
        setFilterOptions(getFilterOptions(incidents) || {});

        setGroupByCveID(groupByKey(incidents, "subcategory"));

        const riskData = getRiskDataByCategory(incidents, "severity");
        setRiskData([
          { riskLevel: "low", value: riskData["low"] },
          { riskLevel: "none", value: riskData["none"] },
          { riskLevel: "medium", value: riskData["medium"] },
          { riskLevel: "high", value: riskData["high"] },
          { riskLevel: "critical", value: riskData["critical"] },
        ]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
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
          <span className="text-[1.625rem] font-bold text-gray-4">
            Incidents ({filterData.length})
          </span>
        </div>
        <div className="flex flex-row items-center gap-4">
          <ExportButton name="incidents" label="EXPORT INCIDENTS LIST" />
          <SearchInput />
          <NormalButton
            variant={ButtonVariant.icon}
            className="h-full"
            onClick={() => setIsFilterOpen(true)}
          >
            <FunnelIcon className="h-6 w-6" />
          </NormalButton>
          <Button
            variant={ButtonVariant.filled}
            onClick={() => setIsCreateModal(true)}
          >
            CREATE INCIDENT
          </Button>
        </div>
      </div>
      <div className="px-8">
        <SearchAndFilter />
      </div>
      {!hasFilterAndSearch && (
        <div className="w-full overflow-x-auto">
          <div className="flex min-w-[90rem] flex-row items-start justify-start gap-4 px-7 py-4">
            <div className="flex min-w-[220px] flex-col items-center bg-white p-4">
              <div className="mb-2 text-base font-bold">Total incidents</div>
              <DonutChart
                width={100}
                height={100}
                innerRadius={40}
                outerRadius={50}
                data={riskData}
                handleClick={(e, d) => addFilter({ severity: d.riskLevel })}
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
                  Incidents status timeline
                </span>
                <div className="flex flex-row items-center gap-2 text-sm font-light">
                  {Object.keys(colors).map((key) => {
                    return (
                      <div
                        key={key}
                        className="flex flex-row items-center gap-1"
                      >
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
              {loading && (
                <div className="flex h-full w-full items-center justify-center">
                  Loading...
                </div>
              )}
              {!loading && (
                <div className="mt-2 grid grid-cols-2 grid-rows-3 gap-x-5 gap-y-2">
                  {groupByCveID.map((group) => (
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
      )}
      {/* Content */}
      <div className="gap-4 px-7 py-4">
        <IncidentsTable data={filterData} loading={loading} />
      </div>
      {/* Filter */}
      <Filter
        isOpen={isFilterOpen}
        onSubmit={onFilter}
        onClose={() => setIsFilterOpen(false)}
        filterOptions={filterOptions}
      />
      {/* Create Incident Modal */}
      <CreateIncidentModal
        isOpen={isCreateModal}
        onClose={() => setIsCreateModal(false)}
      />
    </Fragment>
  );
};

export default Incidents;
