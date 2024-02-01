import { zodResolver } from "@hookform/resolvers/zod";
import { Auth } from "aws-amplify";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "../../components/Button";
import FormControl from "../../components/FormControl";
import useAuth from "../../hooks/useAuth";
import { ButtonVariant, SizeVariant } from "../../utils";
import snack from "../../utils/snack";

const schema = z
  .object({
    oldPassword: z.string().min(8, "Old password is required"),
    newPassword: z.string().min(8, "New password is required"),
    confirmPassword: z.string().min(8, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
  });

const ChangePassword = () => {
  const { user } = useAuth();
  const getDefaultValues = () => {
    return {
      password: "",
      confirmPassword: "",
    };
  };

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues(),
  });

  const onSubmit = async (e) => {
    try {
      await Auth.changePassword(user, e.oldPassword, e.newPassword);
      snack.success("Password changed successfully");
    } catch (error) {
      snack.error(error.message);
    }
  };
  const onHandleSubmit = form.handleSubmit(onSubmit);

  return (
    <form onSubmit={onHandleSubmit}>
      <div className="mb-2 text-[1.625rem] font-bold">New password</div>
      <div className="mb-5 text-base font-normal">Set a new password</div>
      <div className="w-[28rem]">
        <div className="mb-4">
          <FormControl
            inputType="password"
            className="mb-4"
            id="oldPassword"
            label="Old password"
            size={SizeVariant.medium}
            error={form.formState.errors.oldPassword?.message}
            {...form.register("oldPassword")}
          />
        </div>
        <div className="mb-4">
          <FormControl
            className="mb-4"
            id="newPassword"
            label="New password"
            size={SizeVariant.small}
            error={form.formState.errors.newPassword?.message}
            {...form.register("newPassword")}
          />
        </div>
        <div className="mb-4">
          <FormControl
            className="mb-4"
            id="confirmPassword"
            label="Confirm password"
            size={SizeVariant.small}
            error={form.formState.errors.confirmPassword?.message}
            {...form.register("confirmPassword")}
          />
        </div>
        <Button
          variant={ButtonVariant.filled}
          isSubmit
          isDisabled={!form.formState.isValid}
        >
          UPDATE
        </Button>
      </div>
    </form>
  );
};

export default ChangePassword;
