import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { Fragment, useEffect, useRef, useState } from "react";

import { SizeVariant } from "../../utils/constants";
import { multiSelectStyles } from "../../utils/input-styles";
import { DropdownSelectItemDataType } from "../../utils/types";
import Tag, { TagVariant } from "../Tag";

const MultiSelect = React.forwardRef(
  (
    {
      error,
      className,
      id,
      data,
      label,
      size,
      setValue: setFormValue,
      ...rest
    },
    ref
  ) => {
    const [selected, setSelected] = useState([]);
    const containerRef = useRef(null);
    const [value, setValue] = useState(null);

    useEffect(() => {
      if (selected) {
        setFormValue(rest.name, selected.map((v) => v.value).join(", "));
      }
    }, [selected]);

    return (
      <div className={className}>
        <div
          className={clsx(
            "form-control multiselect relative",
            value !== null ? "filled" : ""
          )}
          ref={containerRef}
        >
          <Listbox
            value={selected}
            onChange={(v) => {
              setSelected(v);
              setValue(
                typeof v === "string"
                  ? v === "*"
                    ? "All"
                    : v
                  : v.value === "*"
                  ? "All"
                  : v.value
              );
            }}
            multiple
          >
            <Listbox.Button
              className={clsx(
                "relative flex w-full cursor-pointer flex-row flex-wrap items-center rounded border bg-white shadow-input",
                "hover:border-hover",
                "focus:border-focus focus:shadow-none focus:outline-none",
                "cursor-pointer caret-transparent disabled:border-disabled",
                error ? "border-error" : "border-transparent",
                "pr-10",
                multiSelectStyles[size]
              )}
            >
              <input
                ref={ref}
                {...rest}
                className={clsx(
                  "absolute -left-full flex w-0 items-center rounded border bg-white opacity-0 shadow-input"
                )}
                value={selected
                  .map((d) => (typeof d === "string" ? d : d.value))
                  .join(",")}
                placeholder="dropdown"
              />
              <label
                htmlFor={id}
                className={clsx(
                  "absolute",
                  size,
                  "left-2 top-[40%] text-disabled"
                )}
              >
                {label}
              </label>
              <div className="mb-1.5 flex flex-row flex-wrap gap-1">
                {selected.map((d) => (
                  <Tag
                    label={typeof d === "string" ? d : d.label}
                    key={typeof d === "string" ? d : d.value}
                    variant={TagVariant.content}
                    onRemove={() =>
                      setSelected(
                        selected.filter((s) => {
                          const ss = typeof s === "string" ? s : s.value;
                          const dd = typeof d === "string" ? d : d.value;
                          return ss !== dd;
                        })
                      )
                    }
                  />
                ))}
              </div>
              <span className="input-icon">
                <ChevronDownIcon className="w-5" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute top-full z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white px-2 py-2 text-base shadow-input sm:text-sm">
                {data.map((d) => (
                  <Listbox.Option
                    key={d.value}
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
                        className={clsx(
                          "flex cursor-pointer flex-row items-center gap-2 truncate px-2 py-3",
                          selected
                            ? "bg-background font-medium"
                            : "font-normal",
                          "justify-between"
                        )}
                      >
                        {typeof d === "string"
                          ? d === "*"
                            ? "All"
                            : d
                          : d.label === "*"
                          ? "All"
                          : d.label}
                        {selected && <CheckIcon className="w-5" />}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </Listbox>{" "}
        </div>
        {error && <p className="mt-1 text-base text-error-2">{error}</p>}
      </div>
    );
  }
);

MultiSelect.displayName = "MultiSelect";

MultiSelect.defaultProps = {
  size: SizeVariant.medium,
  className: "",
};

MultiSelect.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  size: PropTypes.string,
  error: PropTypes.string,
  data: PropTypes.arrayOf(DropdownSelectItemDataType),
  children: PropTypes.PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  setValue: PropTypes.func,
};

export default MultiSelect;
