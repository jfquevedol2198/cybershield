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

const schema = z.object({
  type: z.string().optional(),
  category: z.string().optional(),
  severity: z.string().optional(),
  updatedAt: z.string().optional(),
  cell: z.string().optional(),
  isUnassigned: z.boolean().optional(),
  relatedAlerts: z.string().optional(),
  status: z.string().optional(),
  shop: z.string().optional(),
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

const StatusOptions = [
  {
    label: "New",
    value: "new",
  },
  {
    label: "reopened",
    value: "Reopened",
  },
];

const Filter = ({ isOpen, onSubmit, onClose, filterOptions }) => {
  const getDefaultValues = () => {
    return {
      type: undefined,
      category: undefined,
      severity: undefined,
      updatedAt: undefined,
      cell: undefined,
      isUnassigned: undefined,
      relatedAlerts: undefined,
      status: undefined,
      shop: undefined,
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
          <FormControl
            id="type"
            label="Type"
            inputType="dropdown"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.type?.message}
            data={filterOptions["type"]}
            setValue={form.setValue}
            {...form.register("type")}
          />
          <FormControl
            id="category"
            label="Category"
            inputType="dropdown"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.category?.message}
            data={filterOptions["category"]}
            setValue={form.setValue}
            {...form.register("severity")}
          />
          <FormControl
            id="severity"
            label="Severity"
            inputType="dropdown"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.severity?.message}
            data={filterOptions["severity"]}
            setValue={form.setValue}
            {...form.register("severity")}
          />
          <FormControl
            id="updatedAt"
            label="Updated time"
            inputType="dropdown"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.updatedAt?.message}
            data={Categories}
            setValue={form.setValue}
            {...form.register("updatedAt")}
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
          <div className="mb-2 text-base font-bold text-gray-4">
            Unassigned assets&apos;s Insights
          </div>
          <div className="mb-5 text-base font-bold text-gray-4">
            <Checkbox
              id="isUnassigned"
              label="Inspected for compliance"
              {...form.register("shop")}
            />
          </div>
          <FormControl
            id="relatedAlerts"
            label="Related alerts"
            inputType="text"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.relatedAlerts?.message}
            setValue={form.setValue}
            {...form.register("relatedAlerts")}
          />
          <div className="mb-4">
            <MultiSelect
              id="status"
              label="Status"
              className="mb-5"
              size={SizeVariant.small}
              error={form.formState.errors.status?.message}
              data={StatusOptions}
              {...form.register("status")}
            />
          </div>
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
