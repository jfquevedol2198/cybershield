import { zodResolver } from "@hookform/resolvers/zod";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "../../../components/Button";
import FormControl from "../../../components/FormControl";
import SlideOver from "../../../components/SlideOver";
import { ButtonVariant, SizeVariant } from "../../../utils";

const schema = z
  .object({
    category: z.string(),
    type: z.string(),
    subType: z.string(),
    alertId: z.string(),
    serverity: z.string(),
    assignee: z.string(),
    status: z.array(z.string()),
    alertTime: z.string(),
    ip: z.string(),
    shop: z.string(),
    cell: z.string(),
    lastUpdated: z.string(),
    pluginName: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });

const Categories = [
  {
    label: "test1",
    value: "Text 1",
  },
  {
    label: "test2",
    value: "Text 2",
  },
];

const Filter = ({ isOpen, onSubmit, onClose }) => {
  const getDefaultValues = () => {
    return {
      fullname: undefined,
      username: undefined,
      email: undefined,
      phone: undefined,
      role: undefined,
      factory: undefined,
      password: undefined,
      confirmPassword: undefined,
    };
  };
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues(),
  });
  const onHandleSubmit = form.handleSubmit(onSubmit);

  return (
    <SlideOver title="Filter" isOpen={isOpen} onClose={onClose}>
      <form className="flex h-full flex-col" onSubmit={onHandleSubmit}>
        <div className="flex-auto overflow-y-auto">
          <div className="mb-5 flex flex-col gap-5 bg-gray-1 px-4 py-5">
            <div className="text-base text-gray-4">Alert types</div>
            <FormControl
              id="category"
              label="Category"
              inputType="dropdown"
              size={SizeVariant.small}
              error={form.formState.errors.category?.message}
              data={Categories}
              {...form.register("category")}
            />
            <FormControl
              id="type"
              label="Type"
              inputType="dropdown"
              size={SizeVariant.small}
              error={form.formState.errors.type?.message}
              data={Categories}
              {...form.register("type")}
            />
            <FormControl
              id="subType"
              label="Sub Type"
              inputType="dropdown"
              size={SizeVariant.small}
              error={form.formState.errors.subType?.message}
              data={Categories}
              {...form.register("subType")}
            />
          </div>
          <FormControl
            id="alertId"
            label="Alert ID"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.alertId?.message}
            {...form.register("alertId")}
          />
          <FormControl
            id="severity"
            label="Severity"
            inputType="severity"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.severity?.message}
            data={Categories}
            {...form.register("severity")}
          />
          <FormControl
            id="assignee"
            label="Assignee"
            inputType="dropdown"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.assignee?.message}
            data={Categories}
            {...form.register("assignee")}
          />
          <FormControl
            id="status"
            label="Status"
            inputType="dropdown"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.status?.message}
            data={Categories}
            {...form.register("status")}
          />
          <FormControl
            id="alertTime"
            label="Alert Time"
            inputType="dropdown"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.alertTime?.message}
            data={Categories}
            {...form.register("alertTime")}
          />
          <FormControl
            id="ip"
            label="IP"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.ip?.message}
            {...form.register("ip")}
          />
          <FormControl
            id="shop"
            label="Shop"
            inputType="dropdown"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.shop?.message}
            data={Categories}
            {...form.register("shop")}
          />
          <FormControl
            id="cell"
            label="Cell"
            inputType="dropdown"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.cell?.message}
            data={Categories}
            {...form.register("cell")}
          />
          <FormControl
            id="lastUpdated"
            label="Last Updated"
            inputType="dropdown"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.lastUpdated?.message}
            data={Categories}
            {...form.register("lastUpdated")}
          />
          <FormControl
            id="pluginName"
            label="Plug-in Name"
            inputType="dropdown"
            size={SizeVariant.small}
            error={form.formState.errors.pluginName?.message}
            data={Categories}
            {...form.register("pluginName")}
          />
        </div>
        <div className="flex flex-row items-center justify-end gap-2 pt-5">
          <Button variant={ButtonVariant.outline}>CANCEL</Button>
          <Button variant={ButtonVariant.filled}>FILTER</Button>
        </div>
      </form>
    </SlideOver>
  );
};

Filter.propTypes = {
  isOpen: PropTypes.bool,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
};

export default Filter;
