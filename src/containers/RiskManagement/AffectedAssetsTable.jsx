import PropTypes from "prop-types";

import Table from "../../components/Table";
import Tag from "../../components/Tag";
import { SortDataType } from "../../utils";
import { RiskLevel, getRiskLevel } from "../../utils/risk";

const columns = [
  {
    title: "Asset ID",
    dataIndex: "numeric_id",
    key: "numeric_id",
    sortDataType: SortDataType.Number,
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Name",
    dataIndex: "asset_name",
    key: "asset_name",
    sortDataType: SortDataType.String,
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    sortDataType: SortDataType.Number,
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Risk",
    dataIndex: "risk_score",
    key: "risk_score",
    render: (value) => <Tag riskLevel={RiskLevel[getRiskLevel(value * 10)]} />,
    sortDataType: SortDataType.Number,
    colSpan: 0.5,
    className: "",
    align: "left",
  },
];

const AffectAssetsTable = ({ data }) => {
  return <Table columns={columns} dataSource={data} pagination={false} />;
};

AffectAssetsTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
};

export default AffectAssetsTable;
