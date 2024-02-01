import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import apiClient8089 from "../../api8089";
import ActivityIndicator from "../../components/ActivityIndicator";
import AuthLayout from "../../components/AuthLayout";
import Button from "../../components/Button";
import FormControl from "../../components/FormControl";
import config from "../../config";
import useAuth from "../../hooks/useAuth";
import { ButtonVariant, SizeVariant } from "../../utils/constants";
import snack from "../../utils/snack";

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
  const navigate = useNavigate();
  const { tempUser } = useAuth();

  // country, state, city
  const [isCountryLoading, setIsCountryLoading] = useState(false);
  const [isStateLoading, setIsStateLoading] = useState(false);
  const [isCityLoading, setIsCityLoading] = useState(false);

  const email = tempUser?.email || '';
  console.log("tempuser:::", tempUser);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

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
    const fetch = async () => {
      setIsCountryLoading(true);
      const { data } = await axios.get(
        "https://api.countrystatecity.in/v1/countries",
        {
          headers: {
            "X-CSCAPI-KEY": config.countryStateCityApiKey,
          },
        }
      );
      setCountries(
        data.map((country) => ({ label: country.name, value: country.iso2 }))
      );
      setStates([]);
      setCities([]);
      setIsCountryLoading(false);
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      setIsStateLoading(true);
      const { data } = await axios.get(
        `https://api.countrystatecity.in/v1/countries/${country}/states`,
        {
          headers: {
            "X-CSCAPI-KEY": config.countryStateCityApiKey,
          },
        }
      );
      setStates(
        data.map((state) => ({ label: state.name, value: state.iso2 }))
      );
      setCities([]);
      setIsStateLoading(false);
    };
    if (country) fetch();
  }, [country]);

  useEffect(() => {
    const fetch = async () => {
      setIsCityLoading(true);
      const { data } = await axios.get(
        `https://api.countrystatecity.in/v1/countries/${country}/states/${state}/cities`,
        {
          headers: {
            "X-CSCAPI-KEY": config.countryStateCityApiKey,
          },
        }
      );
      setCities(data.map((city) => ({ label: city.name, value: city.name })));
      setIsCityLoading(false);
    };
    if (country && state) fetch();
  }, [state]);

  const onSubmit = async (e) => {
    setIsLoading(true);
    const {
      firstName,
      middleName,
      lastName,
      country,
      state,
      city,
      zip,
      manager,
      jobTitle,
    } = e;
    const data = {
      country,
      zip,
      active: true,
      state,
      city,
      title: jobTitle,
      sys_class_name: "sys_user",
      first_name: firstName,
      email,
      manager,
      last_name: lastName,
      middle_name: middleName,
      home_phone: "-",
      phone: "-",
      name: "-",
      user_name: email.slice(0, email.indexOf("@")),
      mobile_phone: "-",
      street: "-",
      company: "Cybersheild",
      department: "Department",
      location: country,
    };

    const res = await apiClient8089.createUser(data);
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
          <span className="sr-only">Job Manager</span>
          <FormControl
            id="manager"
            label="Job Manager"
            size={SizeVariant.small}
            error={form.formState.errors.manager?.message}
            {...form.register("manager")}
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
