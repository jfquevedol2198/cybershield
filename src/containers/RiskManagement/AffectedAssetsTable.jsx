import PropTypes from "prop-types";

import Table from "../../components/Table";
import Tag from "../../components/Tag";
import { SortDataType, SortDirection } from "../../utils";
import { RiskLevel, getRiskLevel } from "../../utils/risk";

const columns = [
  {
    title: "Asset ID",
    dataIndex: "numeric_id",
    key: "numeric_id",
    sortDataType: SortDataType.Number,
    sort: true,
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Name",
    dataIndex: "asset_name",
    key: "asset_name",
    sortDataType: SortDataType.String,
    sort: true,
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    sortDataType: SortDataType.String,
    sort: true,
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Risk",
    dataIndex: "risk_score",
    key: "risk_score",
    render: (value) => <Tag riskLevel={RiskLevel[getRiskLevel(value)]} />,
    sortDataType: SortDataType.Number,
    sort: true,
    colSpan: 0.5,
    className: "",
    align: "left",
  },
];

const columns_global = [
  {
    title: "Asset ID",
    dataIndex: "numeric_id",
    key: "numeric_id",
    sortDataType: SortDataType.Number,
    sort: true,
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Name",
    dataIndex: "name_",
    key: "asset_name",
    sortDataType: SortDataType.String,
    sort: true,
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    sortDataType: SortDataType.String,
    sort: true,
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Risk",
    dataIndex: "risk_score",
    key: "risk_score",
    render: (value) => <Tag riskLevel={RiskLevel[getRiskLevel(value)]} />,
    sortDataType: SortDataType.Number,
    sort: true,
    colSpan: 0.5,
    className: "",
    align: "left",
  },
];

const DEFAULT_SORTS = [
  {
    direction: SortDirection.ASC,
    key: "type",
    type: SortDataType.String,
  },
  {
    direction: SortDirection.ASC,
    key: "numeric_id",
    type: SortDataType.Number,
  },
  {
    direction: SortDirection.ASC,
    key: "risk_score",
    type: SortDataType.Number,
  },
];

const AffectAssetsTable = ({ data, isGlobal }) => {
  return (
    <Table
      columns={isGlobal ? columns_global : columns}
      dataSource={data}
      pagination={false}
      defaultSorts={DEFAULT_SORTS}
    />
  );
};

AffectAssetsTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  isGlobal: PropTypes.bool,
};

export default AffectAssetsTable;
