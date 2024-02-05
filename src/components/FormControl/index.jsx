import { Listbox, Transition } from "@headlessui/react";
import {
  CalendarIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { Fragment, useEffect, useRef, useState } from "react";

import { SizeVariant } from "../../utils/constants";
import Countries from "../../utils/countries";
import { inputStyles } from "../../utils/input-styles";
import { DropdownSelectItemDataType } from "../../utils/types";

const FormControl = React.forwardRef(
  (
    {
      error,
      placeholder,
      className,
      id,
      data,
      label,
      size,
      inputType,
      setValue: setValueForm,
      isDisabled,
      defaultSelValue,
      ...rest
    },
    ref
  ) => {
    const [selected, setSelected] = useState(defaultSelValue);
    const [filter, setFilter] = useState(null);
    const inputRef = useRef(null);
    const hasIcon = inputType === "phone" || inputType === "dropdown";
    const [value, setValue] = useState(null);
    useEffect(() => {
      if (inputType === "phone") {
        setSelected(Countries.filter((c) => c.code === "US")[0]);
      }
    }, [inputType]);

    return (
      <div className={className}>
        <div
          className={clsx(
            "form-control relative",
            value !== null ? "filled" : ""
          )}
          ref={ref}
        >
          {inputType === "dropdown" ? (
            <Listbox
              value={selected}
              onChange={(v) => {
                setSelected(v);
                setValue(typeof v === "string" ? v : v.value);
                setValueForm(rest.name, typeof v === "string" ? v : v.value);
              }}
              disabled={!data || isDisabled}
            >
              <Listbox.Button
                className={clsx(
                  "relative flex w-full cursor-pointer flex-row items-center rounded border shadow-input",
                  "hover:border-hover",
                  "focus:border-focus focus:shadow-none focus:outline-none",
                  "cursor-pointer caret-transparent disabled:border-disabled",
                  error ? "border-error" : "border-transparent",
                  hasIcon ? "pr-10" : "",
                  isDisabled ? "bg-gray-1" : "bg-white",
                  inputStyles[size]
                )}
              >
                <input
                  {...rest}
                  className={clsx(
                    "invisible absolute -left-full flex w-0 items-center rounded border bg-white shadow-input"
                  )}
                  placeholder="dropdown"
                />
                <label
                  htmlFor={id}
                  className={clsx("absolute", size, "left-2 text-disabled")}
                >
                  {label}
                </label>
                <div>
                  {typeof selected === "string"
                    ? selected === "*"
                      ? "All"
                      : selected
                    : selected?.label === "*"
                    ? "All"
                    : selected?.label}
                </div>
                <span className="input-icon">
                  <ChevronDownIcon className="w-5" />
                </span>
              </Listbox.Button>
              {data && (
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute top-full z-[11] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white px-2 py-2 text-base shadow-input sm:text-sm">
                    <div className="relative w-full border-b-[1px] border-gray-1">
                      <input
                        ref={inputRef}
                        className="w-full border-none pl-10 outline-none focus:border-none focus:shadow-none focus:ring-0"
                        onChange={(e) => setFilter(e.target.value)}
                      />
                      <MagnifyingGlassIcon className="absolute left-2 top-2 w-6" />
                    </div>
                    {data.length > 0 &&
                      data
                        .filter((v) =>
                          filter
                            ? v.label
                                .toLowerCase()
                                .indexOf(filter.toLowerCase()) > -1
                            : true
                        )
                        .map((d) => (
                          <Listbox.Option
                            key={typeof d === "string" ? d : d.key || d.value}
                            className={({ active }) =>
                              `relative cursor-default select-none ${
                                active
                                  ? "bg-background text-amber-900"
                                  : "text-gray-900"
                              }`
                            }
                            value={d}
                          >
                            {({ selected }) => (
                              <div
                                className={`flex cursor-pointer flex-row items-center gap-2 truncate px-2 py-3 ${
                                  selected
                                    ? "bg-background font-medium"
                                    : "font-normal"
                                }`}
                              >
                                {typeof d === "string"
                                  ? d === "*"
                                    ? "All"
                                    : d
                                  : d.label === "*"
                                  ? "All"
                                  : d.label}
                              </div>
                            )}
                          </Listbox.Option>
                        ))}
                    {data.length === 0 && (
                      <div
                        className={`flex cursor-pointer flex-row items-center gap-2 truncate px-2 py-3 font-normal`}
                      >
                        NO DATA
                      </div>
                    )}
                  </Listbox.Options>
                </Transition>
              )}
            </Listbox>
          ) : (
            <div className="relative flex w-full flex-row items-center">
              {inputType === "phone" && (
                <Listbox
                  value={selected}
                  onChange={(v) => {
                    setSelected(v);
                  }}
                  disabled={isDisabled}
                >
                  <Listbox.Button
                    className={clsx(
                      "absolute left-3 z-10 flex w-[7rem] cursor-pointer flex-row items-center gap-1 py-2 text-left sm:text-sm",
                      isDisabled ? "bg-gray-1" : "bg-white"
                    )}
                  >
                    <span className="bg-transparent text-xl">
                      {selected?.flag}
                    </span>
                    <span className="pointer-events-none flex items-center">
                      <ChevronDownIcon
                        className="h-5 w-3 text-black"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="flex-auto border-r-[1px] pr-2 text-center text-base text-gray-4">
                      {selected && `+${selected?.area}`}
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute top-full z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white px-2 py-2 text-base shadow-input sm:text-sm">
                      <div className="relative w-full border-b-[1px] border-gray-1">
                        <input
                          ref={inputRef}
                          className="w-full border-none pl-10 outline-none focus:border-none focus:shadow-none focus:ring-0"
                          onChange={(e) => setFilter(e.target.value)}
                        />
                        <MagnifyingGlassIcon className="absolute left-2 top-2 w-6" />
                      </div>
                      {Countries.filter((country) =>
                        filter
                          ? country.name
                              .toLowerCase()
                              .indexOf(filter.toLowerCase()) > -1
                          : true
                      ).map((country) => (
                        <Listbox.Option
                          key={country.code}
                          className={({ active }) =>
                            `relative cursor-default select-none ${
                              active
                                ? "bg-background text-amber-900"
                                : "text-gray-900"
                            }`
                          }
                          value={country}
                        >
                          {({ selected }) => (
                            <div
                              className={`flex cursor-pointer flex-row items-center gap-2 truncate px-2 py-3 ${
                                selected
                                  ? "bg-background font-medium"
                                  : "font-normal"
                              }`}
                            >
                              <span className="bg-transparent text-xl">
                                {country.flag}
                              </span>
                              {country.name} (+{country.area})
                            </div>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </Listbox>
              )}
              <input
                ref={inputRef}
                type={inputType === "phone" ? "text" : inputType}
                className={clsx(
                  "relative flex w-full items-center rounded border shadow-input",
                  "hover:border-hover",
                  "focus:border-focus focus:shadow-none focus:outline-none",
                  "disabled:border-disabled",
                  error ? "border-error" : "border-transparent",
                  inputType === "phone" ? "pl-[8.3rem]" : "",
                  hasIcon ? "pr-10" : "",
                  isDisabled ? "bg-gray-1" : "bg-white",
                  inputStyles[size]
                )}
                disabled={isDisabled}
                {...rest}
                onChange={(e) => {
                  rest.onChange(e);
                  setValue(e.target.value);
                }}
                placeholder={placeholder}
              />
              <label
                htmlFor={id}
                className={clsx(
                  "absolute",
                  size,
                  "text-disabled",
                  inputType === "phone" ? "left-[8.3rem]" : "left-2"
                )}
              >
                {label}
              </label>
              <span className="input-icon">
                {inputType === "phone" && <PhoneIcon className="w-5" />}
                {inputType === "date" && <CalendarIcon className="w-5" />}
              </span>
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-base text-error-2">{error}</p>}
      </div>
    );
  }
);

FormControl.displayName = "FormControl";

FormControl.defaultProps = {
  inputType: "text",
  size: SizeVariant.medium,
  className: "",
  placeholder: "placeholder",
  isDisabled: false,
  defaultSelValue: "",
};

FormControl.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  inputType: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
  error: PropTypes.string,
  data: PropTypes.arrayOf(DropdownSelectItemDataType),
  children: PropTypes.PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  setValue: PropTypes.func,
  isDisabled: PropTypes.bool,
  defaultSelValue: PropTypes.string,
};

export default FormControl;
