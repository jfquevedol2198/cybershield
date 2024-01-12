import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "../../components/Button";
import FormControl from "../../components/FormControl";
import MultiSelect from "../../components/MultiSelect";
import NormalButton from "../../components/NormalButton";
import { ButtonVariant, SizeVariant } from "../../utils";

const FilterOptions = [
  {
    label: "Factory1",
    value: "factory1",
  },
  {
    label: "Factory2",
    value: "factory2",
  },
  {
    label: "Factory3",
    value: "factory3",
  },
  {
    label: "Factory4",
    value: "factory4",
  },
  {
    label: "Factory5",
    value: "factory5",
  },
];

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
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

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
      fullname: "",
      username: "",
    };
  };

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues(),
  });

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
                data={countries}
                {...form.register("city")}
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
            <span className="sr-only">Job Manager</span>
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
                isDisabled={!form.formState.isValid}
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
