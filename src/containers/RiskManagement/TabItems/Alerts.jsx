/* eslint-disable react/prop-types */
// import { ArrowUpIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useMemo } from "react";

import Button from "../../../components/Button";
import Table from "../../../components/Table";
import { ButtonVariant, SortDataType } from "../../../utils";
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

const data = [
  {
    id: 1,
    type: "Default Cre",
    ip: "192.168.1.1",
    cell: "Test",
    age: 200,
    risk: 90,
  },
  {
    id: 2,
    type: "Default Cre",
    ip: "192.168.1.1",
    cell: "Test",
    age: 200,
    risk: 90,
  },
  {
    id: 3,
    type: "Default Cre",
    ip: "192.168.1.1",
    cell: "Test",
    age: 200,
    risk: 90,
  },
  {
    id: 4,
    type: "Default Cre",
    ip: "192.168.1.1",
    cell: "Test",
    age: 200,
    risk: 90,
  },
  {
    id: 5,
    type: "Default Cre",
    ip: "192.168.1.1",
    cell: "Test",
    age: 200,
    risk: 90,
  },
  {
    id: 6,
    type: "Default Cre",
    ip: "192.168.1.1",
    cell: "Test",
    age: 200,
    risk: 90,
  },
  {
    id: 7,
    type: "Default Cre",
    ip: "192.168.1.1",
    cell: "Test",
    age: 200,
    risk: 90,
  },
  {
    id: 8,
    type: "Default Cre",
    ip: "192.168.1.1",
    cell: "Test",
    age: 200,
    risk: 90,
  },
  {
    id: 9,
    type: "Default Cre",
    ip: "192.168.1.1",
    cell: "Test",
    age: 200,
    risk: 90,
  },
  {
    id: 10,
    type: "Default Cre",
    ip: "192.168.1.1",
    cell: "Test",
    age: 200,
    risk: 90,
  },
];

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
    title: "Cell",
    dataIndex: "cell",
    key: "cell",
    sortDataType: SortDataType.Number,
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

export const PanelAlerts = ({ alerts = [] }) => {
  const assignedAlerts = useMemo(
    () => alerts.filter((alert) => !!alert.assignee_user_id),
    [alerts]
  );
  return (
    <div className="flex h-full flex-col">
      <div className="mb-5 flex flex-row items-center justify-between border-b-[1px] border-background pb-5 text-base font-normal text-gray-5">
        <div>
          <div className="mb-1 text-base font-medium text-gray-5">
            Assigned to users
          </div>
          <div>
            <span className="text-[1.75rem] text-gray-5">
              {assignedAlerts.length}
            </span>
            <span className="text-base text-gray-5">/{alerts.length}</span>
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
        <Table dataSource={data} columns={columns} />
      </div>
    </div>
  );
};
