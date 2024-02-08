import PropTypes from "prop-types";
import { useState } from "react";

import Table from "../../../components/Table";
import Tag from "../../../components/Tag";
import { SortDataType, dateFormat } from "../../../utils";
import { RiskLevel, getRiskLevel } from "../../../utils/risk";
import CreateIncidentModal from "../../Incidents/CreateIncidentModal";
import DetailModal from "./DetailModal";

const columns = [
  {
    title: "Alert ID",
    dataIndex: "numeric_id",
    key: "numeric_id",
    sort: true,
    sortDataType: SortDataType.String,
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Type",
    dataIndex: "type_name",
    key: "type_name",
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Severity",
    dataIndex: "severity",
    key: "severity",
    sort: true,
    sortDataType: SortDataType.Number,
    colSpan: 1,
    className: "",
    render: (value) => <Tag riskLevel={RiskLevel[getRiskLevel(value)]} />,
    align: "left",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    sort: true,
    sortDataType: SortDataType.String,
    colSpan: 1,
    className: "text-link",
    align: "left",
  },
  {
    title: "Alert Time",
    dataIndex: "created_at",
    key: "created_at",
    sort: true,
    sortDataType: SortDataType.Date,
    render: dateFormat,
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Asset Name",
    dataIndex: "nameasset",
    key: "nameasset",
    colSpan: 1,
    sort: true,
    sortDataType: SortDataType.String,
    className: "",
    align: "left",
  },
  {
    title: "IP",
    dataIndex: "destination_asset_ip",
    key: "destination_asset_ip",
    sort: true,
    sortDataType: SortDataType.String,
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Cell",
    dataIndex: "cellname",
    key: "cellname",
    sort: true,
    sortDataType: SortDataType.String,
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Last Updated",
    dataIndex: "updated_at",
    key: "updated_at",
    sort: true,
    sortDataType: SortDataType.Date,
    colSpan: 1,
    render: dateFormat,
    className: "",
    align: "left",
  },
];

const AlertsTable = ({ data = [], loading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateIncident, setIsCreateIncident] = useState(false);
  const [selData, setSelData] = useState(null);
  const onClickRow = (rowData) => {
    console.log("rowData in alerts section", rowData);
    setSelData(rowData);
    setIsOpen(true);
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        rowsPerPage={10}
        loading={loading}
        onClickRow={onClickRow}
      />
      <DetailModal
        riskLevel="low"
        isOpen={isOpen}
        data={selData}
        closeModal={() => setIsOpen(false)}
        onCreateIncident={() => {
          setIsOpen(false);
          setIsCreateIncident(true);
        }}
      />
      <CreateIncidentModal
        isOpen={isCreateIncident}
        onClose={() => setIsCreateIncident(false)}
      />
    </>
  );
};

AlertsTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  loading: PropTypes.bool,
};

export default AlertsTable;
