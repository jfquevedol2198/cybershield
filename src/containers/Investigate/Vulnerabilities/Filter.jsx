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
    severity: z.string(),
    impact: z.string(),
    vendor: z.array(z.string()),
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
      severity: undefined,
      impact: undefined,
      vendor: undefined,
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
            id="impact"
            label="Impact"
            inputType="dropdown"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.impact?.message}
            data={Categories}
            {...form.register("impact")}
          />
          <FormControl
            id="vendor"
            label="Vendor"
            inputType="dropdown"
            size={SizeVariant.small}
            error={form.formState.errors.vendor?.message}
            data={Categories}
            {...form.register("vendor")}
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
