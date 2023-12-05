import { zodResolver } from "@hookform/resolvers/zod";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "../../../components/Button";
import Checkbox from "../../../components/Checkbox";
import FormControl from "../../../components/FormControl";
import MultiSelect from "../../../components/MultiSelect";
import SlideOver from "../../../components/SlideOver";
import { ButtonVariant, SizeVariant } from "../../../utils";
import { DateFilterOptions } from "../../../utils/filter";
import { RiskLevel } from "../../../utils/risk";

const schema = z
  .object({
    category: z.string(),
    type: z.string(),
    subType: z.string(),
    alertId: z.string(),
    severity: z.string(),
    assignee: z.string(),
    status: z.string(),
    alertTime: z.object({ min: z.date(), max: z.date() }).optional(),
    ip: z.string(),
    shop: z.string(),
    cell: z.string(),
    lastUpdated: z.object({ min: z.date(), max: z.date() }).optional(),
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

const Filter = ({ filterOptions, isOpen, onSubmit, onClose }) => {
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
      alertTime: undefined,
      lastUpdated: undefined,
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
        <div className="flex-auto overflow-hidden hover:overflow-y-auto">
          <div className="mb-5 flex flex-col gap-5 bg-gray-1 px-4 py-5">
            <div className="text-base text-gray-4">Alert types</div>
            <FormControl
              id="category"
              label="Category"
              inputType="dropdown"
              size={SizeVariant.small}
              error={form.formState.errors.category?.message}
              data={filterOptions["category"]}
              setValue={form.setValue}
              {...form.register("category")}
            />
            <FormControl
              id="type"
              label="Type"
              inputType="dropdown"
              size={SizeVariant.small}
              error={form.formState.errors.type?.message}
              data={filterOptions["type"]}
              setValue={form.setValue}
              {...form.register("type")}
            />
            <FormControl
              id="subType"
              label="Sub Type"
              inputType="dropdown"
              size={SizeVariant.small}
              error={form.formState.errors.subType?.message}
              data={filterOptions["subtype"]}
              setValue={form.setValue}
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
            inputType="dropdown"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.severity?.message}
            data={Object.keys(RiskLevel).map((key) => ({
              value: key,
              label: RiskLevel[key].label,
            }))}
            setValue={form.setValue}
            {...form.register("severity")}
          />
          <FormControl
            id="assignee"
            label="Assignee"
            inputType="dropdown"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.assignee?.message}
            data={filterOptions["assignee"]}
            setValue={form.setValue}
            {...form.register("assignee")}
          />
          <MultiSelect
            id="status"
            label="Status"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.status?.message}
            data={filterOptions["status"]}
            {...form.register("status")}
          />
          <FormControl
            id="alertTime"
            label="Alert Time"
            inputType="dropdown"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.alertTime?.message}
            data={DateFilterOptions}
            setValue={form.setValue}
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
            data={filterOptions["shop"]}
            setValue={form.setValue}
            {...form.register("shop")}
          />
          <FormControl
            id="cell"
            label="Cell"
            inputType="dropdown"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.cell?.message}
            data={filterOptions["cell"]}
            setValue={form.setValue}
            {...form.register("cell")}
          />
          <FormControl
            id="lastUpdated"
            label="Last Updated"
            inputType="dropdown"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.lastUpdated?.message}
            data={DateFilterOptions}
            setValue={form.setValue}
            {...form.register("lastUpdated")}
          />
          <FormControl
            id="pluginName"
            label="Plug-in Name"
            inputType="dropdown"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.pluginName?.message}
            data={filterOptions["pluginName"]}
            setValue={form.setValue}
            {...form.register("pluginName")}
          />
          <div className="mb-2 text-base font-bold text-gray-4">
            Unassigned assets&apos;s alerts
          </div>
          <div className="mb-2 text-base font-bold text-gray-4">
            <Checkbox
              id="isUnassigned"
              label="Unassigned assets's alerts"
              {...form.register("shop")}
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-end gap-2 pt-5">
          <Button variant={ButtonVariant.outline}>CANCEL</Button>
          <Button variant={ButtonVariant.filled} isSubmit>
            FILTER
          </Button>
        </div>
      </form>
    </SlideOver>
  );
};

Filter.propTypes = {
  isOpen: PropTypes.bool,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  filterOptions: PropTypes.shape(PropTypes.any),
};

export default Filter;
