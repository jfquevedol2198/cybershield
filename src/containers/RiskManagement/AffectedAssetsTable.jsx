import PropTypes from "prop-types";

import Table from "../../components/Table";
import Tag from "../../components/Tag";
import { SortDataType } from "../../utils";
import { RiskLevel, getRiskLevel } from "../../utils/risk";

const columns = [
  {
    title: "Asset ID",
    dataIndex: "assetId",
    key: "assetId",
    sortDataType: SortDataType.Number,
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
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
    dataIndex: "risk",
    key: "risk",
    render: (value) => <Tag riskLevel={RiskLevel[getRiskLevel(value)]} />,
    sortDataType: SortDataType.Number,
    colSpan: 0.5,
    className: "",
    align: "left",
  },
];

const AffectAssetsTable = ({ data }) => {
  return <Table columns={columns} dataSource={data} />;
};

AffectAssetsTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
};

export default AffectAssetsTable;
