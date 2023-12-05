import dayjs from "dayjs";
import PropTypes from "prop-types";

import Table from "../../../components/Table";
import Tag from "../../../components/Tag";
import { SortDataType } from "../../../utils";
import { RiskLevel, getRiskLevel } from "../../../utils/risk";

const columns = [
  {
    title: "Alert ID",
    dataIndex: "alertId",
    key: "alertId",
    sort: true,
    sortDataType: SortDataType.String,
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
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
    dataIndex: "alertTime",
    key: "alertTime",
    sort: true,
    sortDataType: SortDataType.Date,
    render: (value) => dayjs(value).format("DD MMM YYYY | HH:mm:ss"),
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Asset Name",
    dataIndex: "assetName",
    key: "assetName",
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "IP",
    dataIndex: "ip",
    key: "ip",
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Cell",
    dataIndex: "cell",
    key: "cell",
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "last Updated",
    dataIndex: "updatedAt",
    key: "updatedAt",
    sort: true,
    sortDataType: SortDataType.Date,
    colSpan: 1,
    render: (value) => dayjs(value).format("DD MMM YYYY | HH:mm:ss"),
    className: "",
    align: "left",
  },
];

const AlertsTable = ({ data, loading }) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      rowsPerPage={10}
      loading={loading}
    />
  );
};

AlertsTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  loading: PropTypes.bool,
};

export default AlertsTable;
