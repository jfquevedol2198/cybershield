import { FunnelIcon } from "@heroicons/react/24/outline";
import AWS from "aws-sdk";
import { useEffect, useState } from "react";

import EditSvg from "../../assets/images/edit.svg";
import awsconfig from "../../aws-exports";
import Button from "../../components/Button";
import NormalButton from "../../components/NormalButton";
import SearchInput from "../../components/SearchInput";
import Table from "../../components/Table";
import Tag, { TagVariant } from "../../components/Tag";
import config from "../../config";
import { ButtonVariant } from "../../utils";
import { applyFilter, getFilterOptions } from "../../utils/filter";
import { parseCognitoUsers } from "../../utils/parse";
import CreateUserModal from "./CreateUserModal";
import EditUserModal from "./EditUserModal";
import FilterUsers from "./FilterUsers";

const Users = () => {
  const [isCreateUser, setCreateUser] = useState(false);
  const [isEditUser, setIsEditUser] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selUser, setSelUser] = useState(null);

  const onClickEdit = (data) => {
    setSelUser(data);
    setIsEditUser(true);
  };

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
      dataIndex: "assigned",
      key: "assigned",
      colSpan: 1,
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
    AWS.config.update({
      region: awsconfig.aws_cognito_region, // replace with your AWS region
      credentials: {
        accessKeyId: config.awsAccessKeyId,
        secretAccessKey: config.awsSecretAccessKey,
      },
    });
    const cognito = new AWS.CognitoIdentityServiceProvider();
    const params = {
      UserPoolId: "us-east-2_siYKlWDc5", // replace with your User Pool ID
    };

    cognito.listUsers(params, (err, data) => {
      if (err) {
        setUsers([]);
      } else {
        const users = parseCognitoUsers(data.Users);
        setUsers(users);
        setFilteredUsers(users);
        setFilterOptions(getFilterOptions(users));
      }
    });
  }, []);

  const onFilter = (data) => {
    const filtered = Object.keys(data).filter((key) => !!data[key]);
    if (filtered.length === 0) return;
    setFilteredUsers(
      applyFilter(
        users,
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
      />
      {selUser && (
        <EditUserModal
          data={selUser}
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
