import PropTypes from "prop-types";
import { useState } from "react";

import Table from "../../components/Table";
import Tag from "../../components/Tag";
import { SortDataType, SortDirection } from "../../utils";
import { RiskLevel, getRiskLevel } from "../../utils/risk";
import CreateIncidentModal from "../Incidents/CreateIncidentModal";
import DetailModal from "./DetailModal";

const columns = [
  {
    title: "Asset ID",
    dataIndex: "numeric_id",
    key: "numeric_id",
    sort: true,
    sortDataType: SortDataType.Number,
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Name",
    dataIndex: "name_",
    key: "name_",
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
    dataIndex: "risk_score",
    key: "risk_score",
    sort: true,
    sortDataType: SortDataType.Number,
    colSpan: 1,
    render: (value) => <Tag riskLevel={RiskLevel[getRiskLevel(value)]} />,
    className: "",
    align: "left",
  },
  {
    title: "Mac",
    dataIndex: "interfaces_mac",
    key: "interfaces_mac",
    sort: true,
    sortDataType: SortDataType.String,
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "IP",
    dataIndex: "interfaces_ip",
    key: "interfaces_ip",
    colSpan: 1,
    sort: true,
    sortDataType: SortDataType.String,
    className: "",
    align: "left",
  },
  {
    title: "Cell",
    dataIndex: "cellsname",
    key: "cellsname",
    colSpan: 1,
    sort: true,
    sortDataType: SortDataType.String,
    className: "",
    align: "left",
  },
  {
    title: "Vendor",
    dataIndex: "vendor_name",
    key: "vendor_name",
    sort: true,
    sortDataType: SortDataType.String,
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Last Seen",
    dataIndex: "lastseen",
    key: "lastseen",
    sort: true,
    sortDataType: SortDataType.Date,
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Location",
    dataIndex: "location_sites",
    key: "location_sites",
    sort: true,
    sortDataType: SortDataType.String,
    colSpan: 1,
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
const AssetsTable = ({ data, loading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateIncident, setIsCreateIncident] = useState(false);

  const [selData, setSelData] = useState(null);
  const onClickRow = (data) => {
    setIsOpen(true);
    setSelData(data);
  };
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        onClickRow={onClickRow}
        rowsPerPage={20}
        defaultSorts={DEFAULT_SORTS}
      />
      <DetailModal
        data={selData}
        isOpen={isOpen}
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

AssetsTable.propTypes = {
  currPage: PropTypes.number,
  totalPages: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.any),
  loading: PropTypes.bool,
};

export default AssetsTable;
