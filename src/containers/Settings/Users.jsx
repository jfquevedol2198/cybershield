import { FunnelIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

import Button from "../../components/Button";
import NormalButton from "../../components/NormalButton";
import SearchInput from "../../components/SearchInput";
import Table from "../../components/Table";
import Tag, { TagVariant } from "../../components/Tag";
import { ButtonVariant } from "../../utils";
import { applyFilter, getFilterOptions } from "../../utils/filter";
import CreateUserModal from "./CreateUserModal";
import FilterUsers from "./FilterUsers";

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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    setFilteredUsers(data);
    setFilterOptions(getFilterOptions(data));
  }, []);

  const onFilter = (data) => {
    const filtered = Object.keys(data).filter((key) => !!data[key]);
    if (filtered.length === 0) return;
    setFilteredUsers(
      applyFilter(
        data,
        filtered.reduce(
          (filter, key) => [...filter, { key, value: data[key] }],
          []
        )
      )
    );
    setIsFilterOpen(false);
  };

  return (
    <div>
      <div className="mb-2 text-[1.625rem] font-bold">Users</div>
      <div className="mb-5 text-base font-normal">
        Create new or edit existing customers users for the central management
        platform.
      </div>
      <div className="mb-5">
        <div className="flex flex-row items-center justify-end gap-8">
          <SearchInput onSearch={() => {}} />
          <NormalButton
            variant={ButtonVariant.icon}
            className="h-full"
            onClick={() => setIsFilterOpen(true)}
          >
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
        <Table columns={columns} dataSource={filteredUsers} />
      </div>
      <CreateUserModal
        isOpen={isCreateUser}
        onClose={() => setCreateUser(false)}
      />{" "}
      <FilterUsers
        isOpen={isFilterOpen}
        filterOptions={filterOptions}
        onSubmit={onFilter}
        onClose={() => setIsFilterOpen(false)}
      />
    </div>
  );
};

export default Users;
