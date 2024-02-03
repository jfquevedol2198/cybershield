/* eslint-disable react/prop-types */
// import { ArrowUpIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useMemo } from "react";

import Button from "../../../components/Button";
import Table from "../../../components/Table";
import { ButtonVariant, SortDataType } from "../../../utils";
import {
  calculateItemAge,
  normalizeString,
  stringFormat,
} from "../../../utils/common";
import { RiskLevel, getRiskLevel } from "../../../utils/risk";

export const TabAlerts = ({ value }) => {
  return (
    <div className="w-25 h-[6.875rem]">
      <div className="mb-2 text-base font-normal">Alerts</div>
      <div className="mb-1 text-[2.75rem] leading-[52px]">{value}</div>
      {/* <div className="flex flex-row items-center justify-center gap-1 text-base text-risk-2">
        <ArrowUpIcon className="h-3" />
        15%
      </div> */}
    </div>
  );
};

TabAlerts.propTypes = {
  value: PropTypes.number,
};

const columns = [
  {
    title: "",
    dataIndex: "risk",
    key: "risk",
    sortDataType: SortDataType.Number,
    colSpan: 0.3,
    className: "",
    render: (value) => (
      <span
        className={clsx(
          "flex h-8 w-2 flex-[0_0_8px] rounded-full",
          `bg-${RiskLevel[getRiskLevel(value)].color}`
        )}
      />
    ),
    align: "left",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    sortDataType: SortDataType.String,
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "IP",
    dataIndex: "ip",
    key: "ip",
    sortDataType: SortDataType.Number,
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Cell",
    dataIndex: "cell",
    key: "cell",
    sortDataType: SortDataType.String,
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    sortDataType: SortDataType.Number,
    colSpan: 0.5,
    className: "",
    align: "left",
  },
  {
    title: "",
    dataIndex: "",
    key: "action",
    colSpan: 1,
    render: () => <Button variant={ButtonVariant.outline}>GO TO ALERT</Button>,
    align: "center",
  },
];

// format alert data to match table columns
const formatAlert = (alert) => ({
  id: alert.idalerts,
  type: stringFormat(normalizeString(alert.type)),
  ip: stringFormat(alert.ip),
  cell: stringFormat(alert.namecells),
  age: stringFormat(calculateItemAge(alert.fecha_creacion)),
  // TODO: RISK is a temporary value, 
  // it should be replaced with the actual risk/severity level which does not come in new endpoint yet
  risk: alert.severity || "3.5", 
});

export const PanelAlerts = ({ alerts, assignedIncidents }) => {
  const { total_incidents, assigned_incidents: assigned } = assignedIncidents?.[0] ?? [];
  console.log("alerts", alerts);
  const alertsDataFormatted = useMemo(() => (alerts ?? []).map(formatAlert), [alerts]);

  return (
    <div className="flex h-full flex-col">
      <div className="mb-5 flex flex-row items-center justify-between border-b-[1px] border-background pb-5 text-base font-normal text-gray-5">
        <div>
          <div className="mb-1 text-base font-medium text-gray-5">
            Assigned to users
          </div>
          <div>
            <span className="text-[1.75rem] text-gray-5">{assigned}</span>
            <span className="text-base text-gray-5">/{total_incidents}</span>
          </div>
        </div>
        <Button
          variant={ButtonVariant.filled}
          href="/dashboard/investigate/alerts?filter_status=OPEN"
        >
          VIEW OPEN ALERTS
        </Button>
      </div>
      <div className="h-full flex-auto overflow-y-auto">
        <Table dataSource={alertsDataFormatted} columns={columns} />
      </div>
    </div>
  );
};
