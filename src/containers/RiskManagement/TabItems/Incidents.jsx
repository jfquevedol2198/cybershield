import clsx from "clsx";
import PropTypes from "prop-types";

import Button from "../../../components/Button";
import Table from "../../../components/Table";
import { ButtonVariant } from "../../../utils";
import { RiskLevel, getRiskLevel } from "../../../utils/risk";

export const TabIncidents = ({ value }) => {
  return (
    <div className="w-25 h-[6.875rem]">
      <div className="mb-2 text-base font-normal">Incidents</div>
      <div className="mb-1 text-[2.75rem] leading-[52px]">{value}</div>
    </div>
  );
};

TabIncidents.propTypes = {
  value: PropTypes.number,
};

const data = [
  {
    id: 1,
    type: "Potential Ma...",
    alerts: 2,
    cell: "Test",
    age: 200,
    risk: 90,
  },
  {
    id: 2,
    type: "Potential Ma...",
    alerts: 2,
    cell: "Test",
    age: 200,
    risk: 90,
  },
  {
    id: 3,
    type: "Potential Ma...",
    alerts: 2,
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
    sortDataType: "number",
    colSpan: 0.2,
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
    sortDataType: "string",
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Related Alerts",
    dataIndex: "alerts",
    key: "alerts",
    sortDataType: "number",
    colSpan: 0.7,
    className: "",
    align: "left",
  },
  {
    title: "Cell",
    dataIndex: "cell",
    key: "cell",
    sortDataType: "number",
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    sortDataType: "number",
    colSpan: 0.5,
    className: "",
    align: "left",
  },
  {
    title: "",
    dataIndex: "",
    key: "action",
    colSpan: 1.2,
    render: () => (
      <Button variant={ButtonVariant.outline}>GO TO INCIDENT</Button>
    ),
    align: "center",
  },
];

export const PanelIncidents = () => {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-5 flex flex-row items-center justify-between border-b-[1px] border-background pb-5 text-base font-normal text-gray-5">
        <div>
          <div className="mb-1 text-base font-medium text-gray-5">
            Reported incidents that needs to be addressed to improve the risk
            position.
          </div>
        </div>
        <Button variant={ButtonVariant.filled}>VIEW INCIDENTS</Button>
      </div>
      <div className="h-full flex-auto overflow-y-auto">
        <Table dataSource={data} columns={columns} />
      </div>
    </div>
  );
};
