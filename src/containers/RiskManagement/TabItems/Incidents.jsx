import clsx from "clsx";
import PropTypes from "prop-types";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/Button";
import Table from "../../../components/Table";
import { ButtonVariant, SortDataType } from "../../../utils";
import { RiskLevel, getRiskLevel } from "../../../utils/risk";

export const TabIncidents = ({ value }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard/investigate/vulnerabilities");
  };

  return (
    <div className="w-25 h-[6.875rem]" onClick={handleClick}>
      <div className="mb-2 text-base font-normal">Incidents</div>
      <div className="mb-1 flex flex-row items-center justify-center gap-x-1">
        <span className="text-[2.75rem] leading-[52px]">{value}</span>
        <ArrowTopRightOnSquareIcon className="h-6 w-6" />
      </div>
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
    sortDataType: SortDataType.Number,
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
    sortDataType: SortDataType.String,
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Related Alerts",
    dataIndex: "alerts",
    key: "alerts",
    sortDataType: SortDataType.Number,
    colSpan: 0.7,
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
    colSpan: 1.2,
    render: () => (
      <Button variant={ButtonVariant.outline} href="/dashboard/incidents">
        GO TO INCIDENT
      </Button>
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
        <Button variant={ButtonVariant.filled} href="/dashboard/incidents">
          VIEW INCIDENTS
        </Button>
      </div>
      <div className="h-full flex-auto overflow-y-auto">
        <Table dataSource={data} columns={columns} />
      </div>
    </div>
  );
};
