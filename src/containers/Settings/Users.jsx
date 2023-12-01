import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import Button from "../../components/Button";
import NormalButton from "../../components/NormalButton";
import Table from "../../components/Table";
import Tag, { TagVariant } from "../../components/Tag";
import { ButtonVariant } from "../../utils";
import CreateUserModal from "./CreateUserModal";

const columns = [
  {
    title: "User name",
    dataIndex: "username",
    key: "username",
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Full Name",
    dataIndex: "fullname",
    key: "fullname",
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    colSpan: 2.5,
    className: "",
    align: "left",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "risk",
    render: (value) => (
      <Tag
        variant={value ? TagVariant.positive : TagVariant.inactive}
        label={value ? "Active" : "Inactive"}
      />
    ),
    colSpan: 1,
    className: "",
    align: "left",
  },
  {
    title: "Email address",
    dataIndex: "email",
    key: "email",
    colSpan: 2.5,
    className: "",
    align: "left",
  },
  {
    title: "Phone number",
    dataIndex: "phone",
    key: "phone",
    colSpan: 2.5,
    className: "",
    align: "left",
  },
  {
    title: "Assigned factories",
    dataIndex: "assigned",
    key: "assigned",
    colSpan: 2.5,
    className: "",
    align: "left",
  },
  {
    title: "MFA",
    dataIndex: "isMfaEnabled",
    key: "isMfaEnabled",
    render: (value) => (
      <Tag
        variant={value ? TagVariant.positive : TagVariant.inactive}
        label={value ? "Enabled" : "Disabled"}
      />
    ),
    colSpan: 1,
    className: "",
    align: "left",
  },
];
const data = [
  {
    username: "Fernando",
    fullname: "Fernando",
    role: "admin",
    status: true,
    email: "fernando@windustries.com",
    phone: "+1 320 874 3089",
    assigned: "All",
    isMfaEnabled: true,
  },
];

const Users = () => {
  const [isCreateUser, setCreateUser] = useState(false);
  return (
    <div>
      <div className="mb-2 text-[1.625rem] font-bold">Users</div>
      <div className="mb-5 text-base font-normal">
        Create new or edit existing customers users for the central management
        platform.
      </div>
      <div className="mb-5">
        <div className="flex flex-row items-center justify-end gap-8">
          <NormalButton variant={ButtonVariant.icon} className="h-full">
            <MagnifyingGlassIcon className="h-6 w-6" />
          </NormalButton>
          <NormalButton variant={ButtonVariant.icon} className="h-full">
            <FunnelIcon className="h-6 w-6" />
          </NormalButton>
          <Button
            variant={ButtonVariant.filled}
            onClick={() => setCreateUser(true)}
          >
            CREATE USER
          </Button>
        </div>
      </div>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CreateUserModal
        isOpen={isCreateUser}
        onClose={() => setCreateUser(false)}
      />
    </div>
  );
};

export default Users;
