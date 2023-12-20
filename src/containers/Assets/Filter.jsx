import { zodResolver } from "@hookform/resolvers/zod";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import FormControl from "../../components/FormControl";
import SlideOver from "../../components/SlideOver";
import { ButtonVariant, SizeVariant } from "../../utils";
import { RiskLevel } from "../../utils/risk";

const schema = z
  .object({
    type: z.string().optional(),
    tag: z.string().optional(),
    risk: z.string().optional(),
    mac: z.string().optional(),
    ip: z.string().optional(),
    cell: z.string().optional(),
    vendor: z.string().optional(),
    location: z.string().optional(),
    shop: z.string().optional(),
    model: z.string().optional(),
    firmware: z.string().optional(),
    state: z.string().optional(),
    edr: z.string().optional(),
    complianceTestId: z.string().optional(),
    pluginName: z.string().optional(),
    isAlertExist: z.boolean().optional(),
    isVulnerabilityExist: z.boolean().optional(),
    isUnassigned: z.boolean().optional(),
    isHideUncertainAssets: z.boolean().optional(),
    isAssetsExternalID: z.boolean().optional(),
    isInspectedCompliance: z.boolean().optional(),
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

const Filter = ({ filterOptions, isOpen, onSubmit, onClose }) => {
  const defaultValues = () => {
    return {
      fullname: undefined,
      username: undefined,
      email: undefined,
      phone: undefined,
      role: undefined,
      factory: undefined,
      password: undefined,
      confirmPassword: undefined,
      alertTime: undefined,
      lastUpdated: undefined,
    };
  };

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues(),
  });

  useEffect(() => {
    if (isOpen) {
      form.reset();
    }
  }, [isOpen]);

  const onHandleSubmit = form.handleSubmit(onSubmit);

  return (
    <SlideOver title="Filter" isOpen={isOpen} onClose={onClose}>
      <form className="flex h-full flex-col" onSubmit={onHandleSubmit}>
        <div className="flex-auto overflow-hidden hover:overflow-y-auto">
          <FormControl
            id="type"
            label="Type"
            className="mb-5"
            inputType="dropdown"
            size={SizeVariant.small}
            error={form.formState.errors.type?.message}
            data={filterOptions["type"]}
            setValue={form.setValue}
            {...form.register("type")}
          />
          <FormControl
            id="tag"
            label="Tags"
            className="mb-5"
            inputType="dropdown"
            size={SizeVariant.small}
            error={form.formState.errors.tag?.message}
            data={filterOptions["tag"]}
            setValue={form.setValue}
            {...form.register("tag")}
          />
          <FormControl
            id="risk"
            label="Risk"
            className="mb-5"
            inputType="dropdown"
            size={SizeVariant.small}
            error={form.formState.errors.risk?.message}
            data={Object.keys(RiskLevel).map((key) => ({
              value: key,
              label: RiskLevel[key].label,
            }))}
            setValue={form.setValue}
            {...form.register("risk")}
          />
          <FormControl
            id="mac"
            label="MAC"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.mac?.message}
            {...form.register("mac")}
            setValue={form.setValue}
          />
          <FormControl
            id="ip"
            label="IP"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.ip?.message}
            {...form.register("ip")}
            setValue={form.setValue}
          />
          <FormControl
            id="cell"
            label="Cell"
            inputType="dropdown"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.cell?.message}
            data={filterOptions["cell"]}
            setValue={form.setValue}
            {...form.register("cell")}
          />
          <FormControl
            id="vendor"
            label="Vendor"
            inputType="dropdown"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.vendor?.message}
            data={filterOptions["vendor"]}
            setValue={form.setValue}
            {...form.register("vendor")}
          />
          <FormControl
            id="location"
            label="Location"
            inputType="dropdown"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.location?.message}
            data={filterOptions["location"]}
            setValue={form.setValue}
            {...form.register("location")}
          />
          <FormControl
            id="shop"
            label="Shop"
            inputType="dropdown"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.shop?.message}
            data={filterOptions["shop"]}
            setValue={form.setValue}
            {...form.register("shop")}
          />
          <FormControl
            id="model"
            label="Model"
            inputType="dropdown"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.model?.message}
            data={filterOptions["model"]}
            setValue={form.setValue}
            {...form.register("model")}
          />
          <FormControl
            id="firmware"
            label="Firmware"
            inputType="dropdown"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.firmware?.message}
            data={filterOptions["firmware"]}
            setValue={form.setValue}
            {...form.register("firmware")}
          />
          <FormControl
            id="state"
            label="State"
            inputType="dropdown"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.state?.message}
            data={filterOptions["state"]}
            setValue={form.setValue}
            {...form.register("state")}
          />
          <FormControl
            id="edr"
            label="EDR"
            inputType="dropdown"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.edr?.message}
            data={filterOptions["edr"]}
            setValue={form.setValue}
            {...form.register("edr")}
          />
          <FormControl
            id="complianceTestId"
            label="IP"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.complianceTestId?.message}
            {...form.register("complianceTestId")}
            setValue={form.setValue}
          />
          <FormControl
            id="pluginName"
            label="Plug-in Name"
            inputType="dropdown"
            className="mb-5"
            size={SizeVariant.small}
            error={form.formState.errors.pluginName?.message}
            data={filterOptions["pluginName"]}
            setValue={form.setValue}
            {...form.register("pluginName")}
          />
          <div className="mb-2 text-base font-bold text-gray-4">
            Advanced filters
          </div>
          <div className="mb-2 text-base font-bold text-gray-4">
            <Checkbox
              id="isAlertExist"
              label="Alerts exist"
              {...form.register("shop")}
            />
          </div>
          <div className="mb-2 text-base font-bold text-gray-4">
            <Checkbox
              id="isVulnerabilityExist"
              label="Vulnerabilities exist"
              {...form.register("shop")}
            />
          </div>
          <div className="mb-2 text-base font-bold text-gray-4">
            <Checkbox
              id="isUnassigned"
              label="Unassigned assets"
              {...form.register("shop")}
            />
          </div>
          <div className="mb-2 text-base font-bold text-gray-4">
            <Checkbox
              id="isHideUncertainAssets"
              label="Hide uncertain assets"
              {...form.register("shop")}
            />
          </div>
          <div className="mb-2 text-base font-bold text-gray-4">
            <Checkbox
              id="isAssetsExternalID"
              label="Assets with External ID"
              {...form.register("shop")}
            />
          </div>
          <div className="mb-2 text-base font-bold text-gray-4">
            <Checkbox
              id="isInspectedCompliance"
              label="Inspected for compliance"
              {...form.register("shop")}
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-end gap-2 pt-5">
          <Button variant={ButtonVariant.outline}>CANCEL</Button>
          <Button variant={ButtonVariant.filled} isSubmit>
            FILTER
          </Button>
        </div>
      </form>
    </SlideOver>
  );
};

Filter.propTypes = {
  isOpen: PropTypes.bool,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  filterOptions: PropTypes.shape(PropTypes.any),
};

export default Filter;
