import { zodResolver } from "@hookform/resolvers/zod";
import { Auth } from "aws-amplify";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "../../components/Button";
import FormControl from "../../components/FormControl";
import Modal from "../../components/Modal";
import { ButtonVariant, SizeVariant, generatePassword } from "../../utils";
import snack from "../../utils/snack";

const schema = z.object({
  email: z.string().min(1, "Email is required"),
});

const CreateUserModal = ({ isOpen, onClose }) => {
  const getDefaultValues = () => {
    return {
      email: undefined,
    };
  };
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues(),
  });

  useEffect(() => form.reset(), [isOpen]);

  const onSubmit = async (e) => {
    const password = generatePassword(
      {
        useSymbols: true,
        useNumbers: true,
        useLowerCase: true,
        useUpperCase: true,
      },
      8
    );
    try {
      await Auth.signUp({
        username: e.email,
        password,
        attributes: {
          email: e.email,
        },
      });
      onClose();
      snack.success(`user created successfully,  Your password: ${password} has been copied to clipboard.`);
    } catch (error) {
      snack.error(error.message);
    }
  };

  const onHandleSubmit = form.handleSubmit(onSubmit);

  return (
    <Modal title="Create user" isOpen={isOpen} closeModal={onClose}>
      <form className="min-w-[30rem]" onSubmit={onHandleSubmit}>
        <FormControl
          className="mb-4"
          id="email"
          label="Email address"
          size={SizeVariant.medium}
          error={form.formState.errors.email?.message}
          {...form.register("email")}
        />
        <div className="flex flex-row items-center justify-end gap-2">
          <Button variant={ButtonVariant.outline} onClick={onClose}>
            CANCEL
          </Button>
          <Button variant={ButtonVariant.filled} isSubmit>
            SAVE
          </Button>
        </div>
      </form>
    </Modal>
  );
};

CreateUserModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default CreateUserModal;
