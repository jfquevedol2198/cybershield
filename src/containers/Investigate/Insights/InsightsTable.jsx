import PropTypes from "prop-types";

import Table from "../../../components/Table";
import Tag from "../../../components/Tag";
import { SortDataType } from "../../../utils";
import { RiskLevel, getRiskLevel } from "../../../utils/risk";

const columns = [
  {
    title: "Insight ID",
    dataIndex: "insightId",
    key: "insightId",
    sort: true,
    sortDataType: SortDataType.String,
    colSpan: 0.8,
    className: "",
    align: "left",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    sort: true,
    sortDataType: SortDataType.String,
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Severity",
    dataIndex: "score",
    key: "score",
    sort: true,
    sortDataType: SortDataType.Number,
    colSpan: 1,
    className: "",
    render: (value) => <Tag riskLevel={RiskLevel[getRiskLevel(value * 100)]} />,
    align: "left",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    sort: true,
    sortDataType: SortDataType.String,
    colSpan: 1,
    className: "",
    render: (value) => <span className="text-link">{value}</span>,
    align: "left",
  },
  {
    title: "Updated Time",
    dataIndex: "updatedTime",
    key: "updatedTime",
    sort: true,
    sortDataType: SortDataType.Date,
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Cell",
    dataIndex: "cell",
    key: "cell",
    sort: true,
    sortDataType: SortDataType.String,
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Related alerts",
    dataIndex: "relatedAlerts",
    key: "relatedAlerts",
    sort: true,
    sortDataType: SortDataType.Number,
    colSpan: 1,
    className: "",
    render: (value) => <span className="text-link">{value}</span>,
    align: "left",
  },
];

const InsightsTable = ({ data, loading }) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      rowsPerPage={10}
      loading={loading}
    />
  );
};

InsightsTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  loading: PropTypes.bool,
};

export default InsightsTable;
