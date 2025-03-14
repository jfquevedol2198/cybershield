import { zodResolver } from "@hookform/resolvers/zod";
import _, { } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import apiClient8089 from "../../api8089";
import ActivityIndicator from "../../components/ActivityIndicator";
import Button from "../../components/Button";
import FormControl from "../../components/FormControl";
import NormalButton from "../../components/NormalButton";
import useAuth from "../../hooks/useAuth";
import useCountryStateCity from "../../hooks/useCountryStateCity";
import useManagers from "../../hooks/useManagers";
import { ButtonVariant, SizeVariant } from "../../utils";
import snack from "../../utils/snack";
import createUserData from "../../utils/userDataFactory";
import Checkbox from "../../components/Checkbox";

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
  const [ isManager, setIsManager ] = useState(userInfo?.is_manager || false);

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
    setCity,
  } = useCountryStateCity();
  const { managers, isLoading: isManagersLoading } = useManagers();

  const defaultValues = useMemo(
    () => ({
      firstName: _.get(userInfo, "first_name"),
      middleName: _.get(userInfo, "middle_name"),
      lastName: _.get(userInfo, "last_name"),
      country: _.get(userInfo, "country"),
      state: _.get(userInfo, "state"),
      city: _.get(userInfo, "city"),
      zipCode: _.get(userInfo, "zip"),
      manager: _.get(userInfo, "manager_id"),
      jobTitle: _.get(userInfo, "title"),
      email: _.get(userInfo, "email"),
      sites: _.get(userInfo, "sites"),
      isManager: _.get(userInfo, "is_manager"),
      isCreateIncidents: _.get(userInfo, "isCreateIncidents") || false,
    }),
    [userInfo]
  );

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const country = useWatch({ control: form.control, name: "country" });
  const state = useWatch({ control: form.control, name: "state" });
  const city = useWatch({ control: form.control, name: "city" });


  // Update isManager state when userInfo changes
  useEffect(() => {
    if (userInfo) {
      setIsManager(userInfo.is_manager || false);
    }
  }, [userInfo]);


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

  useEffect(() => {
    if (city) {
      setCity(city);
    }
  }, [city]);

  const onSubmit = async (e) => {
    try {
      setIsLoading(true);

      const is_manager = isManager;
      // user data obj is created using a factory function
      const userData = createUserData({...e, is_manager});

      const res = await apiClient8089.updateUser(userInfo?.sys_id, userData);
      if (res.status === 200) {
        updateUserInfo(userData);
        snack.success("User is updated successfully");
      } else {
        snack.error("User update failed");
      }
    } catch (error) {
      console.log(error);
      snack.error(error.message);
    } finally {
      setIsLoading(false);
      setEditMode(false);
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
            <Checkbox
              defaultChecked={isManager}
              label={ isManager ? `I am a manager` : `I am not a manager`} 
              id="isManager" 
              onChange={(e) => setIsManager(e.target.checked)} 
              isSwitch 
              disabled={!editMode}
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
              isDisabled={isManagersLoading || !editMode}
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
