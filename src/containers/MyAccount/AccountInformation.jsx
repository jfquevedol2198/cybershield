import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import apiClient8089 from "../../api8089";
import ActivityIndicator from "../../components/ActivityIndicator";
import Button from "../../components/Button";
import FormControl from "../../components/FormControl";
import NormalButton from "../../components/NormalButton";
import config from "../../config";
import useAuth from "../../hooks/useAuth";
import { ButtonVariant, SizeVariant } from "../../utils";
import snack from "../../utils/snack";

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  manager: z.string().min(1, "Job manager is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  phone: z.string().optional(),
  email: z.string().min(1, "Email is required"),
});

const AccountInformation = () => {
  const [editMode, setEditMode] = useState(false);
  const { userInfo, updateUserInfo } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

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

  const defaultValues = useMemo(
    () => ({
      firstName: _.get(userInfo, "first_name"),
      middleName: _.get(userInfo, "middle_name"),
      lastName: _.get(userInfo, "last_name"),
      country: _.get(userInfo, "country"),
      state: _.get(userInfo, "state"),
      city: _.get(userInfo, "city"),
      zip: _.get(userInfo, "zip"),
      manager: _.get(userInfo, "manager"),
      title: _.get(userInfo, "title"),
      email: _.get(userInfo, "email"),
      sites: _.get(userInfo, "sites"),
      isCreateIncidents: _.get(userInfo, "isCreateIncidents") || false,
    }),
    [editMode, userInfo]
  );

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    form.reset();
  }, [editMode]);

  const country = useWatch({ control: form.control, name: "country" });
  const state = useWatch({ control: form.control, name: "state" });
  const city = useWatch({ control: form.control, name: "city" });

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
      const statesData = data.map((state) => ({
        label: state.name,
        value: state.iso2,
      }));

      // sort states alphabetically
      const sortedStatesData = statesData
        .slice()
        .sort((a, b) => a.label.localeCompare(b.label));

      setStates(sortedStatesData);
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
    try {
      setIsLoading(true);
      const {
        firstName,
        middleName,
        lastName,
        country,
        state,
        city,
        zipCode,
        manager,
        jobTitle,
        phone,
        email,
      } = e;
      const data = {
        country,
        zip: zipCode,
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
        phone: phone,
        name: "-",
        mobile_phone: "-",
        street: "-",
        company: "Cybersheild",
        department: "Department",
        location: country,
      };

      const res = await apiClient8089.updateUser(userInfo?.sys_id, data);
      if (res.status === 200) {
        updateUserInfo(data);
        snack.success("User is updated successfully");
      } else {
        snack.error("User update failed");
      }
    } catch (error) {
      console.log(error);
      snack.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onHandleSubmit = form.handleSubmit(onSubmit);

  return (
    <form onSubmit={onHandleSubmit}>
      {isLoading && <ActivityIndicator />}
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
              setValue={form.setValue}
              isDisabled={!editMode}
            />
            <FormControl
              id="middleName"
              label="Middle name"
              size={SizeVariant.small}
              error={form.formState.errors.middleName?.message}
              {...form.register("middleName")}
              setValue={form.setValue}
              isDisabled={!editMode}
            />
            <FormControl
              id="lastName"
              label="Last name"
              size={SizeVariant.small}
              error={form.formState.errors.lastName?.message}
              {...form.register("lastName")}
              setValue={form.setValue}
              isDisabled={!editMode}
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
                defaultSelValue={country}
                error={form.formState.errors.country?.message}
                data={countries}
                {...form.register("country")}
                isDisabled={isCountryLoading || !editMode}
                setValue={form.setValue}
              />
            </div>
            <div className="w-full">
              <FormControl
                id="state"
                label="State"
                inputType="dropdown"
                size={SizeVariant.small}
                defaultSelValue={state}
                error={form.formState.errors.state?.message}
                data={states}
                {...form.register("state")}
                isDisabled={isStateLoading || !editMode}
                setValue={form.setValue}
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
                defaultSelValue={city}
                error={form.formState.errors.city?.message}
                data={cities}
                {...form.register("city")}
                isDisabled={isCityLoading || !editMode}
                setValue={form.setValue}
              />
            </div>
            <div className="w-full">
              <FormControl
                id="zipCode"
                label="Zip code"
                size={SizeVariant.small}
                error={form.formState.errors.zipCode?.message}
                {...form.register("zipCode")}
                setValue={form.setValue}
                isDisabled={!editMode}
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
              isDisabled={!editMode}
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
              setValue={form.setValue}
              isDisabled={!editMode}
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
              setValue={form.setValue}
              isDisabled={!editMode}
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
              isDisabled={!editMode}
              setValue={form.setValue}
            />
          </div>
          {editMode && (
            <div className="flex flex-row gap-2">
              <Button
                className="flex-auto"
                variant={ButtonVariant.filled}
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
    </form>
  );
};

export default AccountInformation;
