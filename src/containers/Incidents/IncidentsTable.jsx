import PropTypes from "prop-types";
import { useState } from "react";

import Table from "../../components/Table";
import Tag from "../../components/Tag";
import { SortDataType, dateFormat } from "../../utils";
import { RiskLevel, getRiskLevel } from "../../utils/risk";

const columns = [
  {
    title: "Incident ID",
    dataIndex: "origin_id",
    key: "origin_idid",
    sort: true,
    sortDataType: SortDataType.String,
    colSpan: 0.7,
    className: "",
    align: "left",
  },
  {
    title: "Name",
    dataIndex: "short_description",
    key: "short_description",
    sort: true,
    sortDataType: SortDataType.String,
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Risk",
    dataIndex: "severity",
    key: "risk",
    sort: true,
    sortDataType: SortDataType.Number,
    colSpan: 0.5,
    render: (value) => <Tag riskLevel={RiskLevel[getRiskLevel(value)]} />,
    className: "",
    align: "left",
  },
  {
    title: "Status",
    dataIndex: "state",
    key: "state",
    sort: true,
    sortDataType: SortDataType.String,
    colSpan: 0.5,
    className: "",
    align: "left",
  },
  {
    title: "Type",
    dataIndex: "subcategory",
    key: "subcategory",
    sort: true,
    sortDataType: SortDataType.String,
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Creation Time",
    dataIndex: "opened_at",
    key: "opened_at",
    colSpan: 1,
    className: "",
    render: dateFormat,
    align: "left",
  },
  {
    title: "Cell",
    dataIndex: "location",
    key: "location",
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Assignment Group",
    dataIndex: "assignment_group",
    key: "assignment_group",
    sort: true,
    sortDataType: SortDataType.String,
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Last Updated",
    dataIndex: "sys_updated_on",
    key: "sys_updated_on",
    sort: true,
    sortDataType: SortDataType.Date,
    render: dateFormat,
    colSpan: 1,
    className: "",
    align: "left",
  },
];

const IncidentsTable = ({ currPage, totalPages, data, loading }) => {
  const [, setIsOpen] = useState(false);
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
      {/* <DetailModal
        riskLevel="critical"
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
      /> */}
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
