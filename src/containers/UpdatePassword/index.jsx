import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import api from "../../api";
import AuthLayout from "../../components/AuthLayout";
import Button from "../../components/Button";
import FormControl from "../../components/FormControl";
import { ButtonVariant, SizeVariant } from "../../utils/constants";
import snack from "../../utils/snack";

const schema = z
  .object({
    password: z
      .string()
      .min(8, "More than 8 characters")
      .max(256, "More than 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "More than 8 characters")
      .max(256, "More than 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
  });

const UpdatePassword = () => {
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      console.log(schema.parse(e));
      const { data } = await api.updatePassword({
        password: e.password,
        confirmPassword: e.confirmPassword,
      });
      snack.success(data.message);
    } catch (error) {
      const { response } = error;
      if (response) {
        snack.error(response.data.message);
      } else {
        snack.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const onHandleSubmit = form.handleSubmit(onSubmit);

  return (
    <AuthLayout>
      <p className="mb-4 text-[1.625rem] font-bold not-italic text-gray-4">
        Update your password
      </p>
      <p className="mb-4 text-base font-normal not-italic text-gray-4">
        Create a new password for your Cybershield account and sign in. For your
        security, choose a password you haven&apos;t used before.
      </p>
      <form onSubmit={onHandleSubmit} className="mb-4">
        <FormControl
          inputType="password"
          className="mb-4"
          id="password"
          label="New password"
          size={SizeVariant.medium}
          error={form.formState.errors.password?.message}
          {...form.register("password")}
        />
        <p className="mb-4 text-base font-normal not-italic text-gray-4">
          8 - 256 characters
        </p>
        <FormControl
          className="mb-4"
          inputType="password"
          id="confirmPassword"
          label="Confirm new password"
          size={SizeVariant.medium}
          error={form.formState.errors.confirmPassword?.message}
          {...form.register("confirmPassword")}
        />
        <Button
          isSubmit
          isLoading={isLoading}
          className="mb-4 mt-4"
          variant={ButtonVariant.primary}
        >
          UPDATE PASSWORD
        </Button>
      </form>
    </AuthLayout>
  );
};

export default UpdatePassword;
