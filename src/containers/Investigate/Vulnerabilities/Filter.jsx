import { zodResolver } from "@hookform/resolvers/zod";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "../../../components/Button";
import FormControl from "../../../components/FormControl";
import SlideOver from "../../../components/SlideOver";
import { ButtonVariant, SizeVariant } from "../../../utils";
import { RiskLevel } from "../../../utils/risk";

const schema = z.object({
  cvescore: z.string(),
  impact: z.string(),
  vendor: z.string(),
});

const Filter = ({ isOpen, onSubmit, onClose, filterOptions }) => {
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
            id="cvescore"
            label="Severity"
            inputType="dropdown"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.cvescore?.message}
            data={Object.keys(RiskLevel).map((key) => ({
              value: key,
              label: RiskLevel[key].label,
            }))}
            {...form.register("cvescore")}
            setValue={form.setValue}
          />
          <FormControl
            id="impact"
            label="Impact"
            inputType="dropdown"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.impact?.message}
            data={filterOptions["impact"]}
            {...form.register("impact")}
            setValue={form.setValue}
          />
          <FormControl
            id="vendor"
            label="Vendor"
            inputType="dropdown"
            size={SizeVariant.small}
            error={form.formState.errors.vendor?.message}
            data={filterOptions["vendor"]}
            {...form.register("vendor")}
            setValue={form.setValue}
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
