import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import Button from "../../components/Button";
import FormControl from "../../components/FormControl";
import NormalButton from "../../components/NormalButton";
import config from "../../config";
import useAuth from "../../hooks/useAuth";
import { ButtonVariant, SizeVariant } from "../../utils";

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string(),
  lastName: z.string().min(1, "Last name is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  manager: z.string().min(1, "Job manager is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().min(1, "Email is required"),
});

const AccountInformation = () => {
  const [editMode, setEditMode] = useState(false);
  const { userInfo } = useAuth();

  // country, state, city
  const [isCountryLoading, setIsCountryLoading] = useState(false);
  const [isStateLoading, setIsStateLoading] = useState(false);
  const [isCityLoading, setIsCityLoading] = useState(false);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(
        "https://api.countrystatecity.in/v1/countries",
        {
          headers: {
            "X-CSCAPI-KEY":
              "dXR1UVBPYzdmTDY1QW9zRkhnb1FsVkl2Mnd1NWFXQUxra2kxN2ppYQ==",
          },
        }
      );
      setCountries(
        data.map((country) => ({ label: country.name, value: country.iso2 }))
      );
    };
    fetch();
  }, []);

  const getDefaultValues = () => {
    return {
      firstName: userInfo?.first_name,
      middleName: userInfo?.middle_name,
      lastName: userInfo?.last_name,
      country: userInfo?.country,
      state: userInfo?.state,
      city: userInfo?.city,
      zipCode: userInfo?.zip,
      manager: userInfo?.manager,
      jobTitle: userInfo?.title,
      phone: userInfo?.phone,
      email: userInfo?.email,
    };
  };

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues(),
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

  return (
    <div>
      <div className="mb-2 text-[1.625rem] font-bold text-gray-4">
        Account information
      </div>
      <div className="mb-5 text-base font-normal text-gray-4">
        Update the account information.
      </div>
      <div className="flex flex-row gap-2">
        <div className="w-[28rem]">
          <div className="mb-4 flex flex-row gap-4">
            <span className="sr-only">Name</span>
            <FormControl
              id="firstName"
              label="First name"
              size={SizeVariant.small}
              error={form.formState.errors.firstName?.message}
              {...form.register("firstName")}
            />
            <FormControl
              id="middleName"
              label="Middle name"
              size={SizeVariant.small}
              error={form.formState.errors.middleName?.message}
              {...form.register("middleName")}
            />
            <FormControl
              id="lastName"
              label="Last name"
              size={SizeVariant.small}
              error={form.formState.errors.lastName?.message}
              {...form.register("lastName")}
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
                isDisabled={isStateLoading}
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
                isDisabled={isCityLoading}
              />
            </div>
            <div className="w-full">
              <FormControl
                id="zipCode"
                label="Zip code"
                size={SizeVariant.small}
                error={form.formState.errors.zipCode?.message}
                {...form.register("zipCode")}
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
          <div className="mb-4">
            <FormControl
              className="mb-4"
              id="phone"
              inputType="phone"
              label="Phone number"
              size={SizeVariant.medium}
              error={form.formState.errors.phone?.message}
              {...form.register("phone")}
            />
          </div>
          <div className="mb-4 text-sm font-light text-secondary-text">
            If you want to update your phone number this will trigger the
            Multiple Factor authentication flow.
          </div>
          <div className="mb-4">
            <span className="sr-only">Email</span>
            <FormControl
              className="mb-4"
              id="email"
              label="Email"
              size={SizeVariant.small}
              error={form.formState.errors.email?.message}
              {...form.register("email")}
              isDisabled
            />
          </div>
          {editMode && (
            <div className="flex flex-row gap-2">
              <Button
                className="flex-auto"
                variant={ButtonVariant.filled}
                onClick={() => {}}
                isSubmit
              >
                UPDATE
              </Button>
              <Button
                className="flex-auto"
                variant={ButtonVariant.outline}
                onClick={() => setEditMode(false)}
              >
                CANCEL
              </Button>
            </div>
          )}
        </div>
        {!editMode && (
          <div>
            <NormalButton
              className="p-3 text-link"
              onClick={() => setEditMode(true)}
            >
              Edit
            </NormalButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountInformation;
