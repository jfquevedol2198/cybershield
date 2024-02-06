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
import Tag, { TagVariant } from "../../../components/Tag";
import DonutChart from "../../../components/d3/DonutChart";
import StackedAreaChartComponentVul from "../../../components/d3/StackedAreaChartComponentVul";
import useSearchAndFilter from "../../../hooks/useSearchAndFilter";
import { ButtonVariant, normalizeString } from "../../../utils";
import { getFilterOptions } from "../../../utils/filter";
import { groupByKey, parseVulnerabilities } from "../../../utils/parse";
import { getRiskDataByCategory, getRiskLevel } from "../../../utils/risk";
import Filter from "./Filter";
import VulnerabilityTable from "./VulnerabilityTable";

// const colors = {
//   "In Progress": "--secondary-color-1",
//   Mitigated: "--primary-color-3",
//   New: "--link-color",
//   Rejected: "--gray-color-2",
// };

const PRIORITIZED_TAGS = ["CVSS Score", "CVE ID", "Group"];

const Vulnerabilities = () => {
  const stackAreaChartRef = useRef(null);
  const [, setWidth] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [riskData, setRiskData] = useState([]);
  const [selectedTag, setSelectedTag] = useState(PRIORITIZED_TAGS[0]);
  const [prioritizedData, setPrioritizedData] = useState([]);
  const { setPageData, filterData, addFilter, hasFilterAndSearch } =
    useSearchAndFilter();
  const [filterCellOptions, setFilterCellOptions] = useState([]);
  const [selectedRiskLevel, setSelectedRiskLevel] = useState(null);

  const [vulnerabilitiesAssets, setVulnerabilitiesAssets] = useState([]);

  const debounced = useDebouncedCallback(() => {
    setWidth(stackAreaChartRef.current.clientWidth);
  }, 500);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);

      const { data } = await apiClient.getVulnerabilities();
      const vulnerabilities = parseVulnerabilities(data);

      const { data: dataVulnerabilitiesAssets } =
        await apiClient.getVulnerabilitiesAssetView();
      setVulnerabilitiesAssets(dataVulnerabilitiesAssets);

      const assetsCountByVulId = dataVulnerabilitiesAssets.reduce(
        (acc, asset) => {
          const vulId = asset.idvul;
          acc[vulId] = (acc[vulId] || 0) + 1;
          return acc;
        },
        {}
      );
      const venderByVulId = dataVulnerabilitiesAssets.reduce((acc, asset) => {
        const vulId = asset.idvul;
        acc[vulId] = asset.vendor_name;
        return acc;
      }, {});
      const combinedData = vulnerabilities.map((vul) => {
        return {
          ...vul,
          asset_count: assetsCountByVulId[vul.id] || 0,
          vendor: venderByVulId[vul.id],
          isExpanded: false,
        };
      });

      // Filter data by risk level when user has clicked on the donut chart
      if (selectedRiskLevel) {
        const filteredDataByRisk = combinedData.filter(
          (item) => getRiskLevel(item.cvescore) === selectedRiskLevel
        );
        setPageData(filteredDataByRisk);
      } else {
        setPageData(combinedData);
      }

      setFilterCellOptions(getFilterOptions(combinedData));

      const riskData = getRiskDataByCategory(vulnerabilities, "cvescore");
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
  }, [selectedRiskLevel]);

  useEffect(() => {
    if (selectedTag === PRIORITIZED_TAGS[0]) {
      setPrioritizedData(
        groupByKey(
          filterData,
          "cvescore",
          (key) => normalizeString(getRiskLevel(key)).toString() // Convertir a cadena para evitar problemas de comparación
        )
      );
    } else if (selectedTag === PRIORITIZED_TAGS[1]) {
      setPrioritizedData(
        groupByKey(
          filterData,
          "cvename",
          (key) => key.match(/CVE-\d{4}/)?.[0] || "N/D"
        )
      );
    } else {
      setPrioritizedData(groupByKey(filterData, "type", (key) => key || "N/D"));
    }
  }, [selectedTag, filterData]);

  /**
   * Filter
   * @param {*} data
   */
  const onFilter = (data) => {
    addFilter(data);
    setIsFilterOpen(false);
  };

  const handleChartClick = (e, data) => {
    setSelectedRiskLevel(data?.riskLevel ?? null);
  };

  return (
    <Fragment>
      {loading && <ActivityIndicator />}
      {/* Header */}
      <div className="mb-3 flex flex-row items-center justify-between bg-background px-8">
        <div className="flex flex-row items-center gap-2">
          <span className="text-[1.625rem] font-bold text-gray-4">
            Vulnerabilities
          </span>
        </div>
        <div className="flex flex-row items-center gap-4">
          <ExportButton
            name="vulnerabilities"
            label="EXPORT VULNERABILITIES LIST"
          />
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
            <div className="flex min-w-[220px] flex-col items-center bg-white p-8">
              <div className="mb-2 text-base font-bold">
                Total Vulnerabilities
              </div>
              <DonutChart
                width={100}
                height={100}
                innerRadius={40}
                outerRadius={50}
                data={riskData}
                handleClick={handleChartClick}
              />
              {/* <div className="mt-8 flex flex-row items-center justify-center gap-1 text-base text-green">
                <ArrowDownIcon className="h-3" />
                15%
              </div> */}
            </div>
            <div
              className="flex flex-auto flex-col items-center bg-white p-4"
              ref={stackAreaChartRef}
            >
              <div className="flex w-full flex-row items-center justify-between">
                <span className="text-base font-bold">
                  Vulnerabilities Affected Assets Status Timeline
                </span>
              </div>

              <StackedAreaChartComponentVul />
            </div>
            <div className="flex h-[12.25rem] w-[33.25rem] min-w-fit flex-col items-center bg-white p-4 pb-3">
              <div className="flex w-full flex-row items-center justify-between">
                <span className="text-base font-bold">
                  Vulnerability prioritization by
                </span>
                <div className="flex flex-row items-center gap-2 text-sm font-light">
                  {PRIORITIZED_TAGS.map((key) => (
                    <Tag
                      key={key}
                      variant={TagVariant.content}
                      label={key}
                      onSelect={(selectedLabel) =>
                        setSelectedTag(selectedLabel)
                      }
                      isSelected={key === selectedTag}
                    />
                  ))}
                </div>
              </div>
              {!loading && (
                <div className="mt-2 grid grid-cols-2 grid-rows-3 gap-x-5 gap-y-2">
                  {prioritizedData.map((group) => (
                    <PrioritizationItem
                      key={group.cvescore}
                      isReverse
                      percent={group.percent}
                      name={group.type}
                      count={group.count}
                      isVisible={group.type === selectedTag}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="gap-4 px-7 py-4">
        <VulnerabilityTable
          data={filterData}
          vulAssetsData={vulnerabilitiesAssets}
        />
      </div>
      {/* Filter */}
      <Filter
        isOpen={isFilterOpen}
        filterOptions={filterCellOptions}
        onSubmit={onFilter}
        onClose={() => setIsFilterOpen(false)}
      />
    </Fragment>
  );
};

export default Vulnerabilities;
