import PropTypes from "prop-types";
import { useState } from "react";

import Table from "../../components/Table";
import Tag from "../../components/Tag";
import { SortDataType } from "../../utils";
import { RiskLevel, getRiskLevel } from "../../utils/risk";
import DetailModal from "./AssetDetailModal";

const columns = [
  {
    title: "Incident ID",
    dataIndex: "id",
    key: "id",
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
    title: "Risk",
    dataIndex: "risk",
    key: "risk",
    sort: true,
    sortDataType: SortDataType.Number,
    colSpan: 1,
    render: (value) => <Tag riskLevel={RiskLevel[getRiskLevel(value * 10)]} />,
    className: "",
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
    title: "Creation Time",
    dataIndex: "creationTime",
    key: "creationTime",
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
    title: "Owner",
    dataIndex: "owner",
    key: "owner",
    sort: true,
    sortDataType: SortDataType.String,
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Last Updated",
    dataIndex: "updatedAt",
    key: "updatedAt",
    sort: true,
    sortDataType: SortDataType.Date,
    colSpan: 1,
    className: "",
    align: "left",
  },
];

const IncidentsTable = ({ currPage, totalPages, data, loading }) => {
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

IncidentsTable.propTypes = {
  currPage: PropTypes.number,
  totalPages: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.any),
  loading: PropTypes.bool,
};

export default IncidentsTable;
