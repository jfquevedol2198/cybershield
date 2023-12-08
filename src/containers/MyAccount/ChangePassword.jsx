import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "../../components/Button";
import FormControl from "../../components/FormControl";
import { ButtonVariant, SizeVariant } from "../../utils";

const schema = z.object({
  password: z.string().min(1, "New password is required"),
  confirmPassword: z.string().min(1, "Confirm password is required"),
});

const ChangePassword = () => {
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

  return (
    <div>
      <div className="mb-2 text-[1.625rem] font-bold">New password</div>
      <div className="mb-5 text-base font-normal">Set a new password</div>
      <div className="w-[28rem]">
        <div className="mb-4">
          <FormControl
            className="mb-4"
            id="password"
            label="New password"
            size={SizeVariant.small}
            error={form.formState.errors.password?.message}
            {...form.register("password")}
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
          onClick={() => {}}
          isDisabled={!form.formState.isValid}
        >
          UPDATE
        </Button>
      </div>
    </div>
  );
};

export default ChangePassword;
