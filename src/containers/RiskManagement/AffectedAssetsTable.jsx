import Table from "../../components/Table";
import Tag from "../../components/Tag";
import { getRiskLevel } from "../../utils/risk";

const data = [
  { id: 122, name: "C9300-24-T-A", type: "Network Device", risk: 76 },
  { id: 101, name: "Euchner M...", type: "SIS", risk: 77 },
  { id: 100, name: "Hirschman", type: "Switch", risk: 78 },
  { id: 99, name: "Iynx", type: "Network Device", risk: 79 },
  { id: 98, name: "REDLION...", type: "Switch", risk: 80 },
  { id: 97, name: "C-2110-11P", type: "Camera", risk: 81 },
  { id: 96, name: "NP5110_lab", type: "OT Device", risk: 82 },
  { id: 91, name: "WIN-7HSN...", type: "Windows Match", risk: 83 },
  { id: 95, name: "WAGO OT...", type: "OT Device", risk: 84 },
  { id: 94, name: "EDS-G508...", type: "Network Device", risk: 85 },
  { id: 226, name: "MG", type: "Firewall", risk: 74 },
  { id: 92, name: "PNOZ m1p...", type: "Network Device", risk: 73 },
  { id: 93, name: "PNOZ m1p...", type: "Network Device", risk: 72 },
  { id: 103, name: "NP5112_lab", type: "OT Device", risk: 71 },
  { id: 90, name: "WAGO OT", type: "OT Devive", risk: 35 },
];

const columns = [
  {
    title: "Asset ID",
    dataIndex: "id",
    key: "id",
    sortDataType: "number",
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sortDataType: "string",
    colSpan: 2,
    className: "",
    align: "left",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    sortDataType: "number",
    colSpan: 2.5,
    className: "",
    align: "left",
  },
  {
    title: "Risk",
    dataIndex: "risk",
    key: "risk",
    render: (value) => <Tag riskLevel={getRiskLevel(value)} />,
    sortDataType: "number",
    colSpan: 1,
    className: "",
    align: "left",
  },
];

const AffectAssetsTable = () => {
  return <Table columns={columns} dataSource={data} />;
};

export default AffectAssetsTable;
