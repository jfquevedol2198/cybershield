import Table from "../../components/Table";
import Tag from "../../components/Tag";
import { SortDataType } from "../../utils";
import { RiskLevel, getRiskLevel } from "../../utils/risk";

const data = [
  {
    assetId: 122,
    name: "C9300-24T-A",
    type: "Network Device",
    risk: 95,
    mac: "00:0f:8f:9c:23:71",
    ip: "192.168.100.25",
    cell: "Internet Co...",
    vendor: "Cisco",
    lastSeenAt: "30 Nov 2023 | 20:00:58",
    location: "Server room",
  },
  {
    assetId: 102,
    name: "Siemens",
    type: "Controller",
    risk: 95,
    mac: "ac:64:17:09:7b:d3 +2",
    ip: "192.168.100.91",
    cell: "South Well",
    vendor: "Siemens",
    lastSeenAt: "30 Nov 2023 | 20:00:58",
    location: "-",
  },
];

const columns = [
  {
    title: "Asset ID",
    dataIndex: "assetId",
    key: "assetId",
    sort: true,
    sortDataType: SortDataType.Number,
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sort: true,
    sortDataType: SortDataType.Number,
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    sort: true,
    sortDataType: SortDataType.Number,
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

const AssetsTable = () => {
  return <Table columns={columns} dataSource={data} rowsPerPage={10} />;
};

export default AssetsTable;
