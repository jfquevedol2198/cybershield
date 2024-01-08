import PropTypes from "prop-types";
import { useState } from "react";

import Table from "../../components/Table";
import Tag from "../../components/Tag";
import { SortDataType } from "../../utils";
import { RiskLevel, getRiskLevel } from "../../utils/risk";
import DetailModal from "./DetailModal";

const columns = [
  {
    title: "Asset ID",
    dataIndex: "assetId",
    key: "assetId",
    sort: true,
    sortDataType: SortDataType.String,
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
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
    sort: true,
    sortDataType: SortDataType.String,
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Risk",
    dataIndex: "risk",
    key: "risk",
    sort: true,
    sortDataType: SortDataType.Number,
    colSpan: 1,
    render: (value) => <Tag riskLevel={RiskLevel[getRiskLevel(value)]} />,
    className: "",
    align: "left",
  },
  {
    title: "Mac",
    dataIndex: "mac",
    key: "mac",
    sort: true,
    sortDataType: SortDataType.String,
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
    title: "Vendor",
    dataIndex: "vendor",
    key: "vendor",
    sort: true,
    sortDataType: SortDataType.String,
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Last Seen",
    dataIndex: "lastSeenAt",
    key: "lastSeenAt",
    sort: true,
    sortDataType: SortDataType.Date,
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
    sort: true,
    sortDataType: SortDataType.String,
    colSpan: 1,
    className: "",
    align: "left",
  },
];

const AssetsTable = ({ currPage, totalPages, data, loading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClickRow = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        currPage={currPage}
        totalPages={totalPages}
        loading={loading}
        onClickRow={onClickRow}
      />
      <DetailModal
        riskLevel="critical"
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
      />
    </>
  );
};

AssetsTable.propTypes = {
  currPage: PropTypes.number,
  totalPages: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.any),
  loading: PropTypes.bool,
};

export default AssetsTable;
