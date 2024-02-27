import { FunnelIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

import apiClient from "../../api8000";
import EditSvg from "../../assets/images/edit.svg";
import ActivityIndicator from "../../components/ActivityIndicator";
import Button from "../../components/Button";
import NormalButton from "../../components/NormalButton";
import SearchAndFilter from "../../components/SearchAndFilter";
import SearchInput from "../../components/SearchInput";
import Table from "../../components/Table";
import Tag, { TagVariant } from "../../components/Tag";
import useSearchAndFilter from "../../hooks/useSearchAndFilter";
import { ButtonVariant } from "../../utils";
import { getFilterOptions } from "../../utils/filter";
import { parseCognitoUsers } from "../../utils/parse";
import CreateUserModal from "./CreateUserModal";
import EditUserModal from "./EditUserModal";
import FilterUsers from "./FilterUsers";

const Users = () => {
  const [loading, setLoading] = useState(false);

  const [isCreateUser, setCreateUser] = useState(false);
  const [isEditUser, setIsEditUser] = useState(false);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState([]);

  const [selUser, setSelUser] = useState(null);

  const { setPageData, filterData, addFilter } = useSearchAndFilter();

  const onClickEdit = (data) => {
    setSelUser(data);
    setIsEditUser(true);
  };

  const columns = [
    {
      title: "User name",
      dataIndex: "user_name",
      key: "user_name",
      colSpan: 1,
      className: "",
      align: "left",
    },
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
      colSpan: 1,
      className: "",
      align: "left",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      colSpan: 1.5,
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
      colSpan: 0.8,
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
      colSpan: 1.5,
      className: "",
      align: "left",
    },
    {
      title: "Sites",
      dataIndex: "sites",
      key: "sites",
      colSpan: 1,
      className: "",
      align: "left",
    },
    {
      title: "MFA",
      dataIndex: "enable_multifactor_authn",
      key: "enable_multifactor_authn",
      render: (value) => (
        <Tag
          variant={value ? TagVariant.positive : TagVariant.inactive}
          label={value ? "Enabled" : "Pending"}
        />
      ),
      colSpan: 1,
      className: "",
      align: "left",
    },
    {
      title: "ServiceNow",
      dataIndex: "isServiceNowEnabled",
      key: "isServiceNowEnabled",
      render: (value) => (
        <Tag
          variant={value ? TagVariant.positive : TagVariant.inactive}
          label={value ? "Enabled" : "Pending"}
        />
      ),
      colSpan: 1,
      className: "",
      align: "left",
    },
    {
      title: "",
      dataIndex: "",
      key: "actions",
      colSpan: 1,
      render: (_value, record) => (
        <span className="cursor-pointer" onClick={() => onClickEdit(record)}>
          <img src={EditSvg} alt="Edit" />
        </span>
      ),
    },
  ];

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data } = await apiClient.getSysUsers();
      const users = parseCognitoUsers(data);
      setPageData(users);
      setFilterOptions(getFilterOptions(users));
      setLoading(false);
    };
    fetch();
  }, []);

  const onFilter = (data) => {
    addFilter(data);
    setIsFilterOpen(false);
  };

  return (
    <div>
      {loading && <ActivityIndicator />}
      <div className="mb-2 text-[1.625rem] font-bold">Users</div>
      <div className="mb-5 text-base font-normal">
        Create new or edit existing customers users for the central management
        platform.
      </div>
      <div className="mb-5">
        <div className="flex flex-row items-center justify-end gap-8">
          <SearchInput />
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
      <div className="mb-4">
        <SearchAndFilter />
      </div>
      <div>
        <Table columns={columns} dataSource={filterData} />
      </div>
      <CreateUserModal
        isOpen={isCreateUser}
        onClose={() => setCreateUser(false)}
      />
      {selUser && (
        <EditUserModal
          user={selUser}
          isOpen={isEditUser}
          onClose={() => {
            setIsEditUser(false);
            setSelUser(null);
          }}
        />
      )}
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
