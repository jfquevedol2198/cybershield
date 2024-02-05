import { zodResolver } from "@hookform/resolvers/zod";
import PropTypes from "prop-types";
import { useEffect } from "react";
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

const schema = z.object({
  category_name: z.string(),
  type_name: z.string(),
  subtype_name: z.string(),
  numeric_id: z.string(),
  severity: z.string(),
  assignee_user_id: z.string(),
  status: z.string(),
  alertTime: z.string(),
  ip: z.string(),
  shopsname: z.string(),
  cellname: z.string(),
  updated_at: z.string(),
  pluginName: z.string(),
});

const Filter = ({ filterOptions, isOpen, onSubmit, onClose }) => {
  const defaultValues = () => {
    return {
      category_name: undefined,
      type_name: undefined,
      subtype_name: undefined,
      numeric_id: undefined,
      severity: undefined,
      assignee_user_id: undefined,
      status: undefined,
      alertTime: undefined,
      ip: undefined,
      shopsname: undefined,
      cellname: undefined,
      updated_at: undefined,
      pluginName: undefined,
    };
  };

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues(),
  });

  useEffect(() => {
    if (isOpen) {
      form.reset();
    }
  }, [isOpen]);

  const onHandleSubmit = form.handleSubmit(onSubmit);

  return (
    <SlideOver title="Filter" isOpen={isOpen} onClose={onClose}>
      <form className="flex h-full flex-col" onSubmit={onHandleSubmit}>
        <div className="flex-auto overflow-hidden hover:overflow-y-auto">
          <div className="mb-5 flex flex-col gap-5 bg-gray-1 px-4 py-5">
            <div className="text-base text-gray-4">Alert Types</div>
            <FormControl
              id="category_name"
              label="Category"
              inputType="dropdown"
              size={SizeVariant.small}
              error={form.formState.errors.category_name?.message}
              data={filterOptions["category_name"]}
              setValue={form.setValue}
              {...form.register("category_name")}
            />
            <FormControl
              id="type_name"
              label="Type"
              inputType="dropdown"
              size={SizeVariant.small}
              error={form.formState.errors.type_name?.message}
              data={filterOptions["type_name"]}
              setValue={form.setValue}
              {...form.register("type_name")}
            />
            <FormControl
              id="subtype_name"
              label="Sub Type"
              inputType="dropdown"
              size={SizeVariant.small}
              error={form.formState.errors.subtype_name?.message}
              data={filterOptions["subtype_name"]}
              setValue={form.setValue}
              {...form.register("subtype_name")}
            />
          </div>
          <FormControl
            id="numeric_id"
            label="Alert ID"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.numeric_id?.message}
            {...form.register("numeric_id")}
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
            id="assignee_user_id"
            label="Assignee"
            inputType="dropdown"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.assignee_user_id?.message}
            data={filterOptions["assignee_user_id"]}
            setValue={form.setValue}
            {...form.register("assignee_user_id")}
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
            id="shopsname"
            label="Shop"
            inputType="dropdown"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.shopsname?.message}
            data={filterOptions["shopsname"]}
            setValue={form.setValue}
            {...form.register("shopsname")}
          />
          <FormControl
            id="cellname"
            label="Cell"
            inputType="dropdown"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.cellname?.message}
            data={filterOptions["cellname"]}
            setValue={form.setValue}
            {...form.register("cellname")}
          />
          <FormControl
            id="updated_at"
            label="Last Updated"
            inputType="dropdown"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.updated_at?.message}
            data={DateFilterOptions}
            setValue={form.setValue}
            {...form.register("updated_at")}
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
