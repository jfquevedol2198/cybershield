import dayjs from "dayjs";
import _ from "lodash";
import { useEffect, useState } from "react";

import api from "../../../../api";
import Accordion from "../../../../components/Accordion";
import Table from "../../../../components/Table";
import Tag from "../../../../components/Tag";
import { SortDataType } from "../../../../utils";
import { RiskLevel, getRiskLevel } from "../../../../utils/risk";

const RelatedToTab = () => {
  return <div>Related To</div>;
};

const columns = [
  {
    title: "ID",
    dataIndex: "numeric_id",
    key: "numeric_id",
    sort: true,
    sortDataType: SortDataType.String,
    colSpan: 0.5,
    className: "",
    align: "left",
  },
  {
    title: "Type",
    dataIndex: "type_name",
    key: "type_name",
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Sub type",
    dataIndex: "subtype_name",
    key: "subtype_name",
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Severity",
    dataIndex: "severity",
    key: "severity",
    sort: true,
    sortDataType: SortDataType.Number,
    colSpan: 1,
    className: "",
    render: (value) => <Tag riskLevel={RiskLevel[getRiskLevel(value)]} />,
    align: "left",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    sort: true,
    sortDataType: SortDataType.String,
    colSpan: 1,
    className: "text-link",
    align: "left",
  },
  {
    title: "Alert Time",
    dataIndex: "created_at",
    key: "created_at",
    sort: true,
    sortDataType: SortDataType.Date,
    render: (value) => dayjs(value).format("DD MMM YYYY | HH:mm:ss"),
    colSpan: 1.3,
    className: "",
    align: "left",
  },
];

const RelatedToTabPanel = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const {
        data: { data },
      } = await api.getAlerts();
      const alerts = _.get(data, "alerts") || [];
      setAlerts(alerts);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className="w-full">
      <Accordion title={`Cases (${alerts.length})`} headerClassName="pt-1">
        <div className="mt-2 max-h-64 overflow-auto bg-white p-5">
          <Table
            columns={columns}
            dataSource={alerts}
            rowsPerPage={10}
            loading={loading}
          />
        </div>
      </Accordion>
      <Accordion title={`Insights (${alerts.length})`} headerClassName="pt-1">
        <div className="mt-2 max-h-64 overflow-auto bg-white p-5">
          <Table
            columns={columns}
            dataSource={alerts}
            rowsPerPage={10}
            loading={loading}
          />
        </div>
      </Accordion>
    </div>
  );
};

export { RelatedToTab, RelatedToTabPanel };
