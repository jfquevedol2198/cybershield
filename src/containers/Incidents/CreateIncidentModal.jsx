import { zodResolver } from "@hookform/resolvers/zod";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import apiClient from "../../api8000";
import apiClient8089 from "../../api8089";
import ActivityIndicator from "../../components/ActivityIndicator";
import Button from "../../components/Button";
import FormControl from "../../components/FormControl";
import Modal from "../../components/Modal";
import MultiSelect from "../../components/MultiSelect";
import useAuth from "../../hooks/useAuth";
import { ButtonVariant, SizeVariant } from "../../utils";
import { parseAssets } from "../../utils/parse";
import snack from "../../utils/snack";

const schema = z.object({
  name: z.string().min(1, "Incident name is required"),
  description: z.string().min(1, "Description is required"),
  relatedAssets: z.string().min(1, "Related assets are required"),
});

const CreateIncidentModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { userInfo } = useAuth();
  const [assets, setAssets] = useState([]);
  const getDefaultValues = () => {
    return {
      name: undefined,
      description: undefined,
      relaedAssets: undefined,
    };
  };
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues(),
  });

  useEffect(() => {
    const fetch = async () => {
      const { data } = await apiClient.getAssetsView();
      const assets = parseAssets(data);
      setAssets(
        assets
          .filter((asset) => !!asset.name_)
          .map((asset) => ({
            value: asset.id,
            label: asset.name_,
          }))
      );
    };
    fetch();
    form.reset();
  }, [isOpen]);

  const onSubmit = async (e) => {
    try {
      setLoading(true);
      const data = {
        caller_id: userInfo?.id,
        made_sla: true,
        state: "1",
        cmdb_ci: e.relatedAssets,
        impact: "3",
        active: "true",
        priority: "5",
        subcategory: "valor",
        short_description: e.name,
        assignment_group: "580f0fc4477af51008888f32d16d43ca",
        description: e.description,
        sys_class_name: "incident",
        incident_state: "1",
        urgency: "3",
        company: "valor",
        comments: "Comentarios adicionales",
        correlation_id: "valor",
        category: "valor",
        contact_type: "self-service",
      };
      const res = await apiClient8089.createIncident(data);
      console.log(res);
      snack.success("Incident created successfully");
      onClose();
    } catch (error) {
      snack.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onHandleSubmit = form.handleSubmit(onSubmit);

  return (
    <Modal title="Create Incident" isOpen={isOpen} closeModal={onClose}>
      {loading && <ActivityIndicator />}
      <form className="min-w-[30rem]" onSubmit={onHandleSubmit}>
        <FormControl
          className="mb-4"
          id="name"
          label="Incident Name"
          size={SizeVariant.medium}
          error={form.formState.errors.name?.message}
          {...form.register("name")}
        />
        <FormControl
          className="mb-4"
          id="description"
          label="Description"
          size={SizeVariant.medium}
          error={form.formState.errors.description?.message}
          {...form.register("description")}
        />
        <MultiSelect
          id="relatedAssets"
          label="Related Assets"
          className="mb-5"
          size={SizeVariant.small}
          error={form.formState.errors.relatedAssets?.message}
          data={assets}
          {...form.register("relatedAssets")}
          setValue={form.setValue}
        />
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

CreateIncidentModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default CreateIncidentModal;
