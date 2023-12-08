import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
  fullname: z.string().min(1, "Full name is required"),
  username: z.string().min(1, "User name is required"),
  email: z.string().min(1, "Email is required"),
  factories: z.array(z.string()),
});

const AccountInformation = () => {
  const [editMode, setEditMode] = useState(false);

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
      <div className="mb-2 text-[1.625rem] font-bold">Account information</div>
      <div className="mb-5 text-base font-normal">
        Update the account information.
      </div>
      <div className="flex flex-row gap-2">
        <div className="w-[28rem]">
          <div className="mb-4">
            <FormControl
              className="mb-4"
              id="fullname"
              label="Full name"
              size={SizeVariant.small}
              error={form.formState.errors.fullname?.message}
              {...form.register("fullname")}
            />
          </div>
          <div className="mb-4">
            <FormControl
              className="mb-4"
              id="username"
              label="User name"
              size={SizeVariant.small}
              error={form.formState.errors.username?.message}
              {...form.register("username")}
            />
          </div>
          <div className="mb-4">
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
          <div className="mb-4">
            <MultiSelect
              id="factories"
              label="Factories"
              className="mb-5"
              size={SizeVariant.small}
              error={form.formState.errors.factories?.message}
              data={FilterOptions}
              {...form.register("factories")}
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
