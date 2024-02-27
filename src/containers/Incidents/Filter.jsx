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
  opened_at: z.string().optional(),
  subcategory: z.string().optional(),
  state: z.string().optional(),
  severity: z.string().optional(),
  location: z.string().optional(),
  relatedAlert: z.string().optional(),
  assignment_group: z.string().optional(),
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
            id="opened_at"
            label="Creation Time"
            className="mb-5"
            inputType="dropdown"
            size={SizeVariant.small}
            error={form.formState.errors.opened_at?.message}
            data={filterOptions["opened_at"]}
            setValue={form.setValue}
            {...form.register("opened_at")}
          />
          <FormControl
            id="subcategory"
            label="Type"
            className="mb-5"
            inputType="dropdown"
            size={SizeVariant.small}
            error={form.formState.errors.subcategory?.message}
            data={filterOptions["subcategory"]}
            setValue={form.setValue}
            {...form.register("subcategory")}
          />
          <div className="mb-4">
            <MultiSelect
              id="state"
              label="Status"
              className="mb-5"
              size={SizeVariant.small}
              error={form.formState.errors.state?.message}
              data={_.map(filterOptions?.state, (state) => ({
                label: state,
                value: state,
              }))}
              {...form.register("state")}
              setValue={form.setValue}
            />
          </div>
          <FormControl
            id="severity"
            label="Risk"
            className="mb-5"
            inputType="dropdown"
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
            id="location"
            label="Cell"
            inputType="dropdown"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.location?.message}
            data={filterOptions["location"]}
            setValue={form.setValue}
            {...form.register("location")}
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
            id="assignment_group"
            label="Owner"
            inputType="dropdown"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.assignment_group?.message}
            data={filterOptions["assignment_group"]}
            setValue={form.setValue}
            {...form.register("assignment_group")}
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

Filter.defaultProps = {
  filterOptions: {},
};

Filter.propTypes = {
  isOpen: PropTypes.bool,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  filterOptions: PropTypes.shape(PropTypes.any),
};

export default Filter;
