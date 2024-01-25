import { zodResolver } from "@hookform/resolvers/zod";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "../../components/Button";
import FormControl from "../../components/FormControl";
import SlideOver from "../../components/SlideOver";
import { ButtonVariant, SizeVariant } from "../../utils";

const schema = z.object({
  name_: z.string(),
  location: z.string(),
});

const FilterShops = ({ isOpen, filterOptions = {}, onSubmit, onClose }) => {
  const getDefaultValues = () => {
    return {
      name_: undefined,
      location: undefined,
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
            id="name_"
            label="Name"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.name_?.message}
            {...form.register("name_")}
          />
          <FormControl
            id="location"
            label="Location"
            inputType="dropdown"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.location?.message}
            data={filterOptions["location"]}
            setValue={form.setValue}
            {...form.register("location")}
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

FilterShops.propTypes = {
  isOpen: PropTypes.bool,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  filterOptions: PropTypes.shape(PropTypes.any),
};

export default FilterShops;
