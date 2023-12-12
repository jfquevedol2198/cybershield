import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ButtonVariant } from "../../utils";
import Button from "../Button";
import Editor from "../Editor";
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
      <form className="max-w-[30rem]" onSubmit={onHandleSubmit}>
        <Editor className="w-full" />
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
