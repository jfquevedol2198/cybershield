import { zodResolver } from "@hookform/resolvers/zod";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import FormControl from "../../components/FormControl";
import SlideOver from "../../components/SlideOver";
import { ButtonVariant, SizeVariant } from "../../utils";

const schema = z.object({
  cell_name: z.string(),
  celllocation: z.string(),
});

const FilterCells = ({ isOpen, filterOptions, onSubmit, onClose }) => {
  const getDefaultValues = () => {
    return {
      cell_name: undefined,
      celllocation: undefined,
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
            id="cell_name"
            label="Name"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.cell_name?.message}
            {...form.register("cell_name")}
          />
          <FormControl
            id="celllocation"
            label="Location"
            inputType="dropdown"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.celllocation?.message}
            data={filterOptions["celllocation"]}
            setValue={form.setValue}
            {...form.register("celllocation")}
          />
          <div className="mb-2 text-base font-bold text-gray-4">
            Advanced filters
          </div>
          <div className="mb-2 text-base font-bold text-gray-4">
            <Checkbox
              id="isUnassigned"
              label="Inspected for compliance"
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

FilterCells.propTypes = {
  isOpen: PropTypes.bool,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  filterOptions: PropTypes.shape(PropTypes.any),
};

export default FilterCells;
