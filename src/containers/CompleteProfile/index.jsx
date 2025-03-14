import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import apiClient8089 from "../../api8089";
import ActivityIndicator from "../../components/ActivityIndicator";
import AuthLayout from "../../components/AuthLayout";
import Button from "../../components/Button";
import FormControl from "../../components/FormControl";
import Checkbox from "../../components/Checkbox";
import useAuth from "../../hooks/useAuth";
import useCountryStateCity from "../../hooks/useCountryStateCity";
import useManagers from "../../hooks/useManagers";
import { ButtonVariant, SizeVariant } from "../../utils/constants";
import snack from "../../utils/snack";
import createUserData from "../../utils/userDataFactory";

const schema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    middleName: z.string(),
    lastName: z.string().min(1, "Last name is required"),
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),
    zip: z.string().min(1, "Zip code is required"),
    manager: z.string().min(1, "Job manager is required"),
    jobTitle: z.string().min(1, "Job title is required"),
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

const CompleteProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [ isManager, setIsManager ] = useState(false);
  const navigate = useNavigate();
  const { tempUser } = useAuth();

  const email = tempUser?.email || "";

  // country, state, city
  const {
    isCountryLoading,
    isStateLoading,
    isCityLoading,
    countries,
    states,
    cities,
    setCountry,
    setState,
  } = useCountryStateCity();
  const { managers, isLoading: isManagersLoading } = useManagers();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullname: undefined,
      username: undefined,
      email: undefined,
      phone: undefined,
      role: undefined,
      factory: undefined,
      password: undefined,
      confirmPassword: undefined,
    },
  });

  const country = useWatch({ control: form.control, name: "country" });
  const state = useWatch({ control: form.control, name: "state" });

  useEffect(() => {
    if (country) {
      setCountry(country);
    }
  }, [country]);

  useEffect(() => {
    if (state) {
      setState(state);
    }
  }, [state]);

  const onSubmit = async (e) => {
    setIsLoading(true);

    const is_manager = isManager;
    // create user data object using a factory function
    const userData = createUserData({ ...e, email, is_manager });

    const res = await apiClient8089.createUser(userData);
    setIsLoading(false);
    if (res.status === 200) {
      snack.success("User is created successfully, please login");
      navigate("/login");
    } else {
      snack.error("User create failed");
    }
  };

  const onHandleSubmit = form.handleSubmit(onSubmit);

  if (!tempUser) {
    navigate("/login");
  }

  return (
    <AuthLayout>
      {isLoading && <ActivityIndicator />}
      <form onSubmit={onHandleSubmit}>
        <p className="mb-4 text-[1.625rem] font-bold not-italic text-gray-4">
          Complete your profile
        </p>
        <div className="mb-4 flex w-full flex-row gap-4">
          <span className="sr-only">Name</span>
          <FormControl
            id="firstName"
            label="First name"
            className="w-full"
            size={SizeVariant.small}
            error={form.formState.errors.firstName?.message}
            {...form.register("firstName")}
            setValue={form.setValue}
          />
          <FormControl
            id="middleName"
            label="Middle name"
            className="w-full"
            size={SizeVariant.small}
            error={form.formState.errors.middleName?.message}
            {...form.register("middleName")}
            setValue={form.setValue}
          />
          <FormControl
            id="lastName"
            label="Last name"
            className="w-full"
            size={SizeVariant.small}
            error={form.formState.errors.lastName?.message}
            {...form.register("lastName")}
            setValue={form.setValue}
          />
        </div>
        <div className="mb-4 flex flex-row gap-4">
          <span className="sr-only">Country, State</span>
          <div className="w-full">
            <FormControl
              id="country"
              label="Country"
              inputType="dropdown"
              size={SizeVariant.small}
              error={form.formState.errors.country?.message}
              data={countries}
              {...form.register("country")}
              setValue={form.setValue}
              isDisabled={isCountryLoading}
            />
          </div>
          <div className="w-full">
            <FormControl
              id="state"
              label="State"
              inputType="dropdown"
              size={SizeVariant.small}
              error={form.formState.errors.state?.message}
              data={states}
              {...form.register("state")}
              setValue={form.setValue}
              isDisabled={isCountryLoading || isStateLoading}
            />
          </div>
        </div>
        <div className="mb-4 flex flex-row gap-4">
          <span className="sr-only">City, Zipcode</span>
          <div className="w-full">
            <FormControl
              id="city"
              label="City"
              inputType="dropdown"
              size={SizeVariant.small}
              error={form.formState.errors.city?.message}
              data={cities}
              {...form.register("city")}
              setValue={form.setValue}
              isDisabled={isCountryLoading || isStateLoading || isCityLoading}
            />
          </div>
          <div className="w-full">
            <FormControl
              id="zip"
              label="Zip code"
              size={SizeVariant.small}
              error={form.formState.errors.zip?.message}
              {...form.register("zip")}
              setValue={form.setValue}
            />
          </div>
        </div>
        <span className="sr-only">Job Title</span>
        <div className="mb-4">
          <FormControl
            id="jobTitle"
            label="Job Title"
            size={SizeVariant.small}
            error={form.formState.errors.jobTitle?.message}
            {...form.register("jobTitle")}
            setValue={form.setValue}
          />
        </div>
        <div className="mb-4">
            <Checkbox
              defaultChecked={isManager}
              label={ isManager ? `I am a manager` : `I am not a manager`} 
              id="isManager" 
              onChange={(e) => setIsManager(e.target.checked)} 
              isSwitch
            />
          </div>
        <div className="mb-4">
          <span className="sr-only">Job Manager</span>
          <FormControl
            id="manager"
            label="Job Manager"
            inputType="dropdown"
            size={SizeVariant.small}
            error={form.formState.errors.manager?.message}
            data={managers}
            {...form.register("manager")}
            setValue={form.setValue}
            isDisabled={isManagersLoading}
          />
        </div>
        <p className="mb-4 mt-2 text-[1.625rem] font-bold not-italic text-gray-4">
          Update your password
        </p>
        <FormControl
          type="password"
          className="mb-4"
          id="password"
          label="Password"
          size={SizeVariant.medium}
          error={form.formState.errors.password?.message}
          {...form.register("password")}
          setValue={form.setValue}
        />
        <p className="mb-4 text-base font-normal not-italic text-gray-4">
          8 - 256 characters
        </p>
        <FormControl
          type="password"
          className="mb-8"
          id="confirmPassword"
          label="Confirm password"
          size={SizeVariant.medium}
          error={form.formState.errors.confirmPassword?.message}
          {...form.register("confirmPassword")}
          setValue={form.setValue}
        />
        <div className="flex w-full flex-row items-center justify-end gap-2">
          <Button
            isBlock
            variant={ButtonVariant.filled}
            isSubmit
            isDisabled={isLoading}
          >
            SIGN IN
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default CompleteProfile;
