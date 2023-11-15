import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import api from "../../api";
import Alarm, { AlarmType } from "../../components/Alarm";
import AuthLayout from "../../components/AuthLayout";
import Button from "../../components/Button";
import FormControl from "../../components/FormControl";
import { setCookieValue } from "../../utils";
import { AUTH_TOKEN, ButtonVariant, SizeVariant } from "../../utils/constants";
import snack from "../../utils/snack";

const schema = z.object({
  email: z.string().min(1, "Email or username is required"),
  password: z.string().min(1, "Password is required"),
});

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getDefaultValues = () => {
    return {
      email: "fernando",
      password: "fernando",
    };
  };
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues(),
  });

  const onSubmit = async (e) => {
    try {
      setError(null);
      setIsLoading(true);

      const {
        data: { token },
      } = await api.login({
        email: e.email,
        password: e.password,
      });

      snack.success("Successfully logged in!");
      setCookieValue(AUTH_TOKEN, token, 2, "hour");

      navigate("/dashboard");
    } catch (error) {
      const { response } = error;
      if (response) {
        setError(response.data.message);
      } else {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const onHandleSubmit = form.handleSubmit(onSubmit);

  return (
    <AuthLayout>
      <p className="mb-4 text-[1.625rem] font-bold not-italic text-gray-4">
        Log in
      </p>
      {error && (
        <Alarm message={error} type={AlarmType.error} className="mb-4" />
      )}
      <form onSubmit={onHandleSubmit} className="mb-4">
        <FormControl
          className="mb-4"
          id="email"
          label="E-mail or username"
          size={SizeVariant.medium}
          error={form.formState.errors.email?.message}
          {...form.register("email")}
        />
        <FormControl
          className="mb-4"
          inputType="password"
          id="password"
          label="Password"
          size={SizeVariant.medium}
          error={form.formState.errors.password?.message}
          {...form.register("password")}
        />
        <Link
          to="/forgot-password"
          className="mb-4 text-[1.375rem] text-primary-4"
        >
          Forgot your password?
        </Link>
        <Button
          isSubmit
          isLoading={isLoading}
          className="mb-4 mt-4"
          variant={ButtonVariant.primary}
        >
          SIGN IN
        </Button>
      </form>
      <p className="text-base font-normal text-gray-4">
        By signing into your account, you agree to the Cybershield{" "}
        <a href="/" target="_blank" className="underline">
          Terms of Use
        </a>{" "}
        and acknowledge you have read its{" "}
        <a href="/" target="_blank" className="underline">
          Privacy Policy
        </a>
        .
      </p>
    </AuthLayout>
  );
};

export default Login;
