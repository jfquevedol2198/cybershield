import dayjs from "dayjs";
import { Fragment, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

import api from "../../api8000";
import ActivityIndicator from "../../components/ActivityIndicator";
import Button from "../../components/Button";
import ColorBar from "../../components/ColorBar";
import CustomTap from "../../components/CustomTap";
import DropdownSelect from "../../components/DropdownSelect";
import Tag from "../../components/Tag";
import RiskLineChart from "../../components/d3/RiskLineChart";
import { ButtonVariant, SizeVariant } from "../../utils";
import { parseAssets, parseRiskView, parseShops } from "../../utils/parse";
import { RiskLevel, getRiskLevel } from "../../utils/risk";
import AffectAssetsTable from "./AffectedAssetsTable";
import {
  PanelAlerts,
  PanelIncidents,
  PanelRisk,
  PanelShops,
  TabAlerts,
  TabIncidents,
  TabRisk,
  TabShops,
  TabVulnerabilities,
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
  const [alerts, setAlerts] = useState([]);
  const [risks, setRisks] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [assignedIncidents, setAssignedIncidents] = useState([]);
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [riskOverTime, setRiskOverTime] = useState([]);
  const [filteredRiskOverTime, setFilteredRiskOverTime] =
    useState(riskOverTime);
  const [unassignedAssets, setUnassignedAssets] = useState(0);

  const { siteId } = useParams();

  const [width, setWidth] = useState(0);
  const [lastUpdated, setLastUpdated] = useState("");

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
      try {
        setLoading(true);

        // Update date
        const { data: updateDateData } = await api.getUpdateDate();
        const fechaUTC = updateDateData?.[0]?.etl_fecha;
        if (fechaUTC) {
          const formattedDate = formatDate(fechaUTC);
          setLastUpdated(formattedDate);
        } else {
          console.error(
            "Fecha inválida después de crear el objeto Date:",
            fechaUTC
          );
        }

        // assets
        const { data } = await api.getSiteAssets(siteId);
        const assets = parseAssets(data);

        setUnassignedAssets(
          assets.filter(
            (asset) =>
              asset.asset_id === "99999" ||
              asset.id === "99999" ||
              asset.cell_id === "99999"
          ).length
        );

        const risksByLevel = calculateRisksByLevel(assets);
        setRiskByLevel(risksByLevel);
        setAssets(assets);

        // Shops
        const { data: shopsData } = siteId
          ? await api.getSiteShops(siteId)
          : await api.getShops();
        const shops = parseShops(shopsData);
        setShops(shops);

        // Alerts
        const { data: alertsData } = await api.getAlertsView(siteId);
        setAlerts(alertsData);

        // Risks
        const { data: _risksData } = await api.getRisks(siteId);
        const risksData = parseRiskView(_risksData);
        setRisks(risksData);

        // Incidents
        const { data: incidentsData } = await api.getIncidents();
        setIncidents(incidentsData);

        const { data: _assignedIncidents } = await api.getAssignedIncidents();
        setAssignedIncidents(_assignedIncidents);

        // vulnerabilities
        const { data: vulnerabilitiesData } = await api.getVulnerabilities();
        setVulnerabilities(vulnerabilitiesData);

        // riskOverTime
        const { data: riskOverTimeData } = await api.getRiskOverTime(siteId);

        if (siteId) {
          // filter riskOverTimeData by siteId
          const filteredBySiteIdData = riskOverTimeData.filter(
            (item) => item.sites_id === siteId
          );
          setRiskOverTime(filteredBySiteIdData);
        } else {
          setRiskOverTime(riskOverTimeData);
        }

        // Average Risk
        setAverageRisk(
          siteId
            ? risksData[0]?.total_risk_score_by_site
            : risksData[0]?.total_risk_score
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [siteId]);

  useEffect(() => {
    setFilteredRiskOverTime(riskOverTime);
  }, [riskOverTime]);

  const formatDate = (fechaUTC) => {
    const fechaObj = new Date(fechaUTC);
    if (!isNaN(fechaObj.getTime())) {
      return dayjs(fechaObj).format("DD MMM YYYY | HH:mm:ss");
    } else {
      console.error("Invalid date after creating Date object:", fechaUTC);
      return null;
    }
  };

  const calculateRisksByLevel = (assets) => {
    const risksByLevel = {};
    assets.forEach(({ risk_score }) => {
      const riskLevel = getRiskLevel(risk_score);
      risksByLevel[riskLevel] = (risksByLevel[riskLevel] || 0) + 1;
    });
    return risksByLevel;
  };

  const handleRiskOverTimeDate = (selectedPeriod) => {
    if (!riskOverTime || riskOverTime.length === 0) {
      return [];
    }

    if (!selectedPeriod) {
      setFilteredRiskOverTime(riskOverTime);
      return;
    }

    const filteredData = filterRiskOverTime(riskOverTime, selectedPeriod);
    setFilteredRiskOverTime(filteredData);
  };

  const filterRiskOverTime = (data, selectedPeriod) => {
    const currentDate = new Date();
    return data.filter((item) => {
      const itemDate = new Date(item.date_recorded);

      switch (selectedPeriod.value) {
        case "last_7_days":
          return itemDate >= new Date(currentDate - 7 * 24 * 60 * 60 * 1000);
        case "last_15_days":
          return itemDate >= new Date(currentDate - 15 * 24 * 60 * 60 * 1000);
        case "last_month":
          return (
            itemDate >=
            new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() - 1,
              currentDate.getDate()
            )
          );
        case "last_2_months":
          return (
            itemDate >=
            new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() - 2,
              currentDate.getDate()
            )
          );
        default:
          return true;
      }
    });
  };

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
          LAST UPDATED
          <br />
          {lastUpdated}
        </div>
      </div>
      {loading && <ActivityIndicator />}
      {/* Content */}
      <div className="grid grid-cols-1 gap-5 bg-background px-8 2xl:grid-cols-2">
        <div>
          <CustomTap
            tabs={[
              <TabRisk key="risk" value={Math.ceil(averageRisk * 10)} />,
              <TabAlerts key="alerts" value={alerts.length} />,
              <TabShops key="shops" value={shops.length} />,
              <TabIncidents key="incidents" value={incidents.length} />,
              <TabVulnerabilities
                key="vulnerabilities"
                value={vulnerabilities.length}
              />,
            ]}
            tabPanels={[
              <PanelRisk key="risk" risks={risks} />,
              <PanelAlerts
                key="alerts"
                alerts={alerts}
                assignedIncidents={assignedIncidents}
              />,
              <PanelShops key="shops" shops={shops} />,
              <PanelIncidents key="incidents" incidents={incidents} />,
            ]}
            tabListClassName="overflow-x-hidden overflow-y-hidden"
            tabPanelClassName="px-7 py-8 bg-white h-[35rem]"
          />
          <div className="mt-4 bg-white p-7">
            <div className="flex flex-row items-center justify-between">
              <span className="text-xl font-bold text-gray-4">
                Risk Over Time
              </span>
              <div className="w-50">
                <DropdownSelect
                  data={Period}
                  onSelect={(e) => handleRiskOverTimeDate(e)}
                />
              </div>
            </div>
            <div className="mt-6 overflow-hidden" ref={riskLineChartRef}>
              <RiskLineChart
                width={width}
                height={250}
                riskLineData={filteredRiskOverTime}
              />
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
              <div className="text-[1.375rem] font-bold">Assets by Risk</div>
              <div>
                <span className="mr-1 text-[2.75rem] font-light">
                  {assets.length}
                </span>
                <span className="text-[1.5rem] font-light">Assets</span>
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
          <div className="mb-8 flex flex-row items-center gap-x-2 text-base">
            <span className="text-5xl">{unassignedAssets}</span>
            <span>Unassigned assets</span>
          </div>
          <AffectAssetsTable data={assets} isGlobal={!!siteId} />
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
