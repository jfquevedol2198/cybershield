import { zodResolver } from "@hookform/resolvers/zod";
import { Auth } from "aws-amplify";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import AuthLayout from "../../components/AuthLayout";
import Button from "../../components/Button";
import FormControl from "../../components/FormControl";
import { ButtonVariant, SizeVariant } from "../../utils/constants";
import snack from "../../utils/snack";

const schema = z.object({
  email: z.string().min(1, "Email is required"),
});

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const getDefaultValues = () => {
    return {
      email: "",
    };
  };
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues(),
  });

  // const onSignin = () => {
  //   navigate("/login");
  // };

  const onSubmit = async (e) => {
    try {
      setIsLoading(true);
      const data = await Auth.forgotPassword(e.email);
      console.log(data);
      snack.success("Please check your email");
      // setIsSuccess(true);
      navigate(`/reset-password?username=${e.email}`);
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
        Reset password
      </p>
      <p className="mb-4 text-base font-normal not-italic text-gray-4">
        Enter the email address associated with your account.
      </p>
      {/* {form.formState.isSubmitSuccessful && isSuccess ? (
        <>
          <p className="mb-4 text-[1.75rem] font-bold not-italic text-gray-4">
            Check your inbox
          </p>
          <p className="mb-4 text-base font-normal not-italic text-gray-4">
            We’re sending you a link to reset your password.
          </p>
          <p className="mb-4 text-[1.25rem] font-bold not-italic text-gray-4">
            Having trouble?
          </p>
          <ul className="mb-4 text-base font-normal not-italic text-gray-4">
            <li className="list-inside list-disc">
              The email may take a few minutes.
            </li>
            <li className="list-inside list-disc">
              Make sure you entered the right email.
            </li>
            <li className="list-inside list-disc">Check your SPAM folder</li>
            <li className="list-inside list-disc">
              Password reset links expires after xx minutes.
            </li>
          </ul>
          <p className="mb-4 text-[1.25rem] font-bold not-italic text-gray-4">
            Still having trouble?
          </p>
          <p className="mb-4 text-base font-normal not-italic text-gray-4">
            If you’re unable to reset your password, please contact your account
            manager.{" "}
          </p>
          <p className="mb-4 text-[1.25rem] font-bold not-italic text-gray-4">
            Have you reset your password?
          </p>
          <Button
            isSubmit
            isLoading={isLoading}
            className="mb-4 mt-4"
            onClick={onSignin}
            variant={ButtonVariant.primary}
          >
            SIGN IN
          </Button>
        </>
      ) : ( */}
      <form onSubmit={onHandleSubmit} className="mb-4">
        <FormControl
          className="mb-4"
          id="email"
          label="E-mail"
          size={SizeVariant.medium}
          error={form.formState.errors.email?.message}
          {...form.register("email")}
        />
        <Button
          isSubmit
          isLoading={isLoading}
          className="mb-4 mt-4"
          variant={ButtonVariant.primary}
        >
          RESET PASSWORD
        </Button>
        <Link
          to="/login"
          className="mx-auto mb-4 block text-center text-base text-primary-4 underline"
        >
          CANCEL
        </Link>
      </form>
      {/* )} */}
    </AuthLayout>
  );
};

export default ForgotPassword;
