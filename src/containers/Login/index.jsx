import { zodResolver } from "@hookform/resolvers/zod";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import Alarm, { AlarmType } from "../../components/Alarm";
import AuthLayout from "../../components/AuthLayout";
import Button from "../../components/Button";
import FormControl from "../../components/FormControl";
import useAuth from "../../hooks/useAuth";
import { delay } from "../../utils";
import { ButtonVariant, SizeVariant } from "../../utils/constants";
import snack from "../../utils/snack";

const schema = z.object({
  email: z.string().min(1, "Email or username is required"),
  password: z.string().min(1, "Password is required"),
});

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {
    authToken,
    user,
    setUser,
    setTempUser,
    fetchUserInfo,
    updateUserInfo,
  } = useAuth();
  useEffect(() => {
    console.log("____ login");
  }, []);
  useEffect(() => {
    if (authToken && user && user.username) {
      navigate("/dashboard");
    }
  }, [user, authToken]);

  const getDefaultValues = () => {
    return {
      email: "",
      password: "",
    };
  };
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues(),
  });

  const onSubmit = async (e) => {
    const temporaryUser = {
      email: e.email,
      username: e.email,
    };

    try {
      setError(null);
      setIsLoading(true);

      const data = await Auth.signIn(e.email, e.password);
      const userInfo = await fetchUserInfo(e.email);

      // user has not completed profile
      if (!userInfo) {
        setTempUser(temporaryUser);
        snack.info("Please complete profile");
        navigate("/complete-profile");
        return;
      }


      console.log("data in sign in", data);
      if (data.challengeName === "NEW_PASSWORD_REQUIRED") {
        setTempUser(data);
        navigate("/confirm-password");
        return;
      }

      // user must setup MFA
      if (data.challengeName === "MFA_SETUP") {
        setTempUser(data);
        updateUserInfo(userInfo);
        snack.info("Please setup MFA");
        navigate("/mfa/scan");
        return;
      }

      // user must sign in with MFA
      if (data.challengeName === "SOFTWARE_TOKEN_MFA") {
        setTempUser(data);
        updateUserInfo(userInfo);
        navigate("/mfa/auth-confirm-sign-in");
        return;
      }

      
      const token = data.signInUserSession?.accessToken?.jwtToken;
      if (!token) {
        setError("Something went wrong, please try again");
        return;
      }
      
      setUser(data);
      updateUserInfo(userInfo);
      snack.success("Successfully logged in!");

      await delay(1000);
      navigate("/dashboard");
    } catch (error) {
      let { name, message } = error;
      if (name === "UserNotConfirmedException") {
        setTempUser(temporaryUser);
        navigate("/confirm-account");
        return;
      }
      setError(message);
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
