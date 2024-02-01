import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import _ from "lodash";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import apiClient8089 from "../../api8089";
import ActivityIndicator from "../../components/ActivityIndicator";
import Button from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import FormControl from "../../components/FormControl";
import Modal from "../../components/Modal";
import config from "../../config";
import { ButtonVariant, SizeVariant } from "../../utils";
import snack from "../../utils/snack";

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string(),
  lastName: z.string().min(1, "Last name is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  zip: z.string().min(1, "Zip code is required"),
  manager: z.string().min(1, "Job manager is required"),
  title: z.string().min(1, "Job title is required"),
  email: z.string().email("Email is required"),
  sites: z.string(),
  isCreateIncidents: z.boolean(),
});

const EditUserModal = ({ isOpen, user, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  // country, state, city
  const [isCountryLoading, setIsCountryLoading] = useState(false);
  const [isStateLoading, setIsStateLoading] = useState(false);
  const [isCityLoading, setIsCityLoading] = useState(false);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: _.get(user, "first_name"),
      middleName: _.get(user, "middle_name"),
      lastName: _.get(user, "last_name"),
      country: _.get(user, "country"),
      state: _.get(user, "state"),
      city: _.get(user, "city"),
      zip: _.get(user, "zip"),
      manager: _.get(user, "manager"),
      title: _.get(user, "title"),
      email: _.get(user, "email"),
      sites: _.get(user, "sites"),
      isCreateIncidents: _.get(user, "isCreateIncidents") || false,
    },
  });

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
    try {
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
        title,
        email,
        phone,
      } = e;
      const data = {
        ...user,
        country,
        zip,
        state,
        city,
        title,
        first_name: firstName,
        email,
        manager,
        phone,
        last_name: lastName,
        middle_name: middleName,
      };
      const res = await apiClient8089.updateUser(user.sys_id, data);
      console.log(res);
      snack.success("Updated successfully");
      onClose();
    } catch (error) {
      console.log(error);
      snack.error("Updated failed");
    } finally {
      setIsLoading(false);
    }
  };

  const onHandleSubmit = form.handleSubmit(onSubmit);

  return (
    <Modal title="Edit user" isOpen={isOpen} closeModal={onClose}>
      {isLoading && <ActivityIndicator />}
      <form className="min-w-[30rem]" onSubmit={onHandleSubmit}>
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
              defaultSelValue={country}
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
              defaultSelValue={state}
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
              defaultSelValue={city}
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
            id="title"
            label="Job Title"
            size={SizeVariant.small}
            error={form.formState.errors.title?.message}
            {...form.register("title")}
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
        <FormControl
          className="mb-4"
          id="email"
          label="Email address"
          size={SizeVariant.medium}
          error={form.formState.errors.email?.message}
          {...form.register("email")}
          setValue={form.setValue}
        />
        <FormControl
          className="mb-4"
          id="phone"
          inputType="phone"
          label="Phone number"
          size={SizeVariant.medium}
          error={form.formState.errors.phone?.message}
          {...form.register("phone")}
          setValue={form.setValue}
        />
        <p className="mb-2 text-sm text-secondary-text">
          Please use a valid phone number
        </p>
        <FormControl
          type="sites"
          className="mb-4"
          label="Sites"
          size={SizeVariant.medium}
          error={form.formState.errors.sites?.message}
          {...form.register("sites")}
          setValue={form.setValue}
        />

        <p className="text-md mb-2 font-bold text-secondary-text">
          Service Now
        </p>
        <div className="mb-2 text-base font-bold text-gray-4">
          <Checkbox
            id="isCreateIncidents"
            label="The user will be able to create incidents."
            {...form.register("isCreateIncidents")}
          />
        </div>
        <div className="flex flex-row items-center justify-end gap-2">
          <Button variant={ButtonVariant.outline} onClick={onClose}>
            CANCEL
          </Button>
          <Button variant={ButtonVariant.filled} isSubmit>
            SAVE
          </Button>
        </div>
      </form>
    </Modal>
  );
};

EditUserModal.defaultProps = {
  user: {},
};

EditUserModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  user: PropTypes.shape(PropTypes.any),
};

export default EditUserModal;
