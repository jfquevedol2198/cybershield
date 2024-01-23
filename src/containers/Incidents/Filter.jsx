import { zodResolver } from "@hookform/resolvers/zod";
import _ from "lodash";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import FormControl from "../../components/FormControl";
import MultiSelect from "../../components/MultiSelect";
import SlideOver from "../../components/SlideOver";
import { ButtonVariant, SizeVariant } from "../../utils";
import { RiskLevel } from "../../utils/risk";

const schema = z.object({
  creationTime: z.string().optional(),
  type: z.string().optional(),
  status: z.string().optional(),
  risk: z.string().optional(),
  cell: z.string().optional(),
  relatedAlert: z.string().optional(),
  owner: z.string().optional(),
  shop: z.string().optional(),
  assignee: z.string().optional(),
  isMyIncidentsOnly: z.boolean().optional(),
});

const Filter = ({ filterOptions, isOpen, onSubmit, onClose }) => {
  const defaultValues = () => {
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
          <FormControl
            id="creationTime"
            label="Creation Time"
            className="mb-5"
            inputType="dropdown"
            size={SizeVariant.small}
            error={form.formState.errors.creationTime?.message}
            data={filterOptions["creationTime"]}
            setValue={form.setValue}
            {...form.register("creationTime")}
          />
          <FormControl
            id="type"
            label="Type"
            className="mb-5"
            inputType="dropdown"
            size={SizeVariant.small}
            error={form.formState.errors.type?.message}
            data={filterOptions["type"]}
            setValue={form.setValue}
            {...form.register("type")}
          />
          <div className="mb-4">
            <MultiSelect
              id="status"
              label="Status"
              className="mb-5"
              size={SizeVariant.small}
              error={form.formState.errors.status?.message}
              data={_.map(filterOptions?.status, (status) => ({
                label: status,
                value: status,
              }))}
              {...form.register("status")}
            />
          </div>
          <FormControl
            id="risk"
            label="Risk"
            className="mb-5"
            inputType="dropdown"
            size={SizeVariant.small}
            error={form.formState.errors.risk?.message}
            data={Object.keys(RiskLevel).map((key) => ({
              value: key,
              label: RiskLevel[key].label,
            }))}
            setValue={form.setValue}
            {...form.register("risk")}
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
            id="relatedAlert"
            label="Related Alerts"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.relatedAlert?.message}
            {...form.register("relatedAlert")}
            setValue={form.setValue}
          />
          <FormControl
            id="owner"
            label="Owner"
            inputType="dropdown"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.owner?.message}
            data={filterOptions["owner"]}
            setValue={form.setValue}
            {...form.register("owner")}
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
          <div className="mb-2 text-base font-bold text-gray-4">
            Show my incidents only
          </div>
          <div className="mb-2 text-base font-bold text-gray-4">
            <Checkbox
              id="isMyIncidentsOnly"
              label="Show my incidents only"
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
