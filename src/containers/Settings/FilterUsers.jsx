import { zodResolver } from "@hookform/resolvers/zod";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "../../components/Button";
import FormControl from "../../components/FormControl";
import SlideOver from "../../components/SlideOver";
import { ButtonVariant, SizeVariant } from "../../utils";

const schema = z.object({
  username: z.string(),
  fullname: z.string(),
  role: z.string(),
});

const FilterUsers = ({ isOpen, filterOptions = {}, onSubmit, onClose }) => {
  const getDefaultValues = () => {
    return {
      username: undefined,
      fullname: undefined,
      role: undefined,
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
            id="username"
            label="Username"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.username?.message}
            {...form.register("username")}
          />
          <FormControl
            id="fullname"
            label="Full name"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.fullname?.message}
            {...form.register("fullname")}
          />
          <FormControl
            id="role"
            label="Role"
            inputType="dropdown"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.role?.message}
            data={filterOptions["role"]}
            setValue={form.setValue}
            {...form.register("role")}
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

FilterUsers.propTypes = {
  isOpen: PropTypes.bool,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  filterOptions: PropTypes.shape(PropTypes.any),
};

export default FilterUsers;
