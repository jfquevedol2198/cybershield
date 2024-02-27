import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ButtonVariant, SizeVariant } from "../../utils";
import Button from "../Button";
import Editor from "../Editor";
import FormControl from "../FormControl";
import Modal from "../Modal";

const schema = z.object({
  name: z.string().min(1, "Incident Name is required"),
  shortDescription: z.string().min(1, "Short Description is required"),
  longDescription: z.string().min(1, "Long Description is required"),
  notes: z.string().min(1, "Notes is required"),
  owner: z.string().min(1, "Owner is required"),
  type: z.string().min(1, "Type is required"),
  shop: z.string().min(1, "Shop is required"),
  cell: z.string().min(1, "Cell is required"),
});

const Factories = [
  {
    label: "Factory 1",
    value: "factory_1",
  },
  {
    label: "Factory 2",
    value: "factory_2",
  },
  {
    label: "Factory 3",
    value: "factory_3",
  },
  {
    label: "Factory 4",
    value: "factory_4",
  },
  {
    label: "Factory 5",
    value: "factory_5",
  },
];

const CreateIncidentModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const onClose = () => setIsOpen(false);
  const onCreate = () => {};

  const getDefaultValues = () => {
    return {
      fullname: undefined,
      username: undefined,
      email: undefined,
      phone: undefined,
      role: undefined,
      factory: undefined,
      password: undefined,
      confirmPassword: undefined,
    };
  };
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues(),
  });

  useEffect(() => form.reset(), [isOpen]);

  const onHandleSubmit = form.handleSubmit(onCreate);

  return (
    <Modal title="Create Incident" isOpen={isOpen} closeModal={onClose}>
      <form className="w-[31.75rem]" onSubmit={onHandleSubmit}>
        <div className="mb-4">
          <FormControl
            className="mb-4"
            id="incidentName"
            label="Incident name"
            size={SizeVariant.medium}
            error={form.formState.errors.incidentName?.message}
            {...form.register("incidentName")}
          />
          <Editor className="mb-4 w-full" placeholder="Short description" />
          <Editor className="mb-4 w-full" placeholder="Long description" />
          <Editor className="mb-4 w-full" placeholder="Notes" />
          <FormControl
            className="mb-4"
            id="owner"
            label="Owner"
            inputType="dropdown"
            size={SizeVariant.medium}
            error={form.formState.errors.owner?.message}
            data={Factories}
            {...form.register("owner")}
          />
          <FormControl
            className="mb-4"
            id="type"
            label="Type"
            inputType="dropdown"
            size={SizeVariant.medium}
            error={form.formState.errors.type?.message}
            data={Factories}
            {...form.register("type")}
          />
          <FormControl
            className="mb-4"
            id="shop"
            label="Shop"
            inputType="dropdown"
            size={SizeVariant.medium}
            error={form.formState.errors.shop?.message}
            data={Factories}
            {...form.register("shop")}
          />
          <FormControl
            className="mb-4"
            id="cell"
            label="Cell"
            inputType="dropdown"
            size={SizeVariant.medium}
            error={form.formState.errors.cell?.message}
            data={Factories}
            {...form.register("cell")}
          />
        </div>
        <div className="flex flex-row items-center justify-end gap-2">
          <Button variant={ButtonVariant.outline} onClick={onClose}>
            CANCEL
          </Button>
          <Button variant={ButtonVariant.filled} isSubmit>
            CREATE INCIDENT
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateIncidentModal;
