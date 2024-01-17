import { zodResolver } from "@hookform/resolvers/zod";
import PropTypes from "prop-types";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "../../components/Button";
import FormControl from "../../components/FormControl";
import Modal from "../../components/Modal";
import { ButtonVariant, SizeVariant } from "../../utils";

const schema = z
  .object({
    fullname: z.string().min(1, "Full Name is required"),
    username: z.string().min(1, "Username is required"),
    email: z.string().min(1, "Email is required"),
    phone: z.string().min(1, "Phone is required"),
    role: z.string().min(1, "Role is required"),
    factory: z.string().min(1, "Factory is required"),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
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

const Factories = [
  {
    label: "Factory 1",
    value: "factory_1",
  },
  {
    label: "Factory 2",
    value: "factory_2",
  },
  {
    label: "Factory 3",
    value: "factory_3",
  },
  {
    label: "Factory 4",
    value: "factory_4",
  },
  {
    label: "Factory 5",
    value: "factory_5",
  },
];

const EditUserModal = ({ isOpen, data, onClose }) => {
  const getDefaultValues = useCallback(() => {
    return {
      fullname: data["fullname"] || undefined,
      username: data["username"] || undefined,
      email: data["email"] || undefined,
      phone: data["phone"] || undefined,
      role: data["role"] || undefined,
      factory: data["factory"] || undefined,
      password: undefined,
      confirmPassword: undefined,
    };
  }, [data]);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues(),
  });

  useEffect(() => form.reset(), [isOpen, form]);

  const onSubmit = (e) => {
    console.log(e);
  };

  const onHandleSubmit = form.handleSubmit(onSubmit);

  return (
    <Modal title="Create user" isOpen={isOpen} closeModal={onClose}>
      <form className="min-w-[30rem]" onSubmit={onHandleSubmit}>
        <FormControl
          className="mb-4"
          id="fullname"
          label="Full name"
          size={SizeVariant.medium}
          error={form.formState.errors.fullname?.message}
          {...form.register("fullname")}
        />
        <FormControl
          className="mb-4"
          id="username"
          label="User name"
          size={SizeVariant.medium}
          error={form.formState.errors.username?.message}
          {...form.register("username")}
        />
        <FormControl
          className="mb-4"
          id="email"
          label="Email address"
          size={SizeVariant.medium}
          error={form.formState.errors.email?.message}
          {...form.register("email")}
        />
        <FormControl
          className="mb-4"
          id="phone"
          inputType="phone"
          label="Phone number"
          size={SizeVariant.medium}
          error={form.formState.errors.phone?.message}
          {...form.register("phone")}
        />
        <FormControl
          className="mb-4"
          id="role"
          label="Role"
          size={SizeVariant.medium}
          error={form.formState.errors.role?.message}
          {...form.register("role")}
        />
        <FormControl
          className="mb-4"
          id="factory"
          label="Factories"
          inputType="dropdown"
          size={SizeVariant.medium}
          error={form.formState.errors.factory?.message}
          data={Factories}
          {...form.register("factory")}
        />
        <FormControl
          type="password"
          className="mb-4"
          id="password"
          label="Password"
          size={SizeVariant.medium}
          error={form.formState.errors.password?.message}
          {...form.register("password")}
        />
        <FormControl
          type="password"
          className="mb-4"
          id="confirmPassword"
          label="Confirm password"
          size={SizeVariant.medium}
          error={form.formState.errors.confirmPassword?.message}
          {...form.register("confirmPassword")}
        />
        <div className="flex flex-row items-center justify-end gap-2">
          <Button variant={ButtonVariant.outline}>CANCEL</Button>
          <Button variant={ButtonVariant.filled} isSubmit>
            SAVE
          </Button>
        </div>
      </form>
    </Modal>
  );
};

EditUserModal.defaultProps = {
  data: {},
};

EditUserModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  data: PropTypes.shape(PropTypes.any),
};

export default EditUserModal;
