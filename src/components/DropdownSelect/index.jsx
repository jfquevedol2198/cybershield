import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { Fragment, useEffect, useState } from "react";

import { DropdownSelectDataType } from "../../utils/types";
import NormalButton from "../NormalButton";

const DropdownSelect = React.forwardRef(
  ({ data, onSelect, defaultValue, className = "bg-background" }, ref) => {
    const [selected, setSelected] = useState(null);

    useEffect(() => {
      setSelected(defaultValue);
    }, [defaultValue]);

    return (
      <Menu as="div" className="relative z-10 inline-block w-full text-left">
        <div>
          <Menu.Button
            ref={ref}
            className={clsx(
              "inline-flex w-full items-center justify-between rounded-md px-4 py-2 text-lg font-medium text-gray-3",
              className
            )}
          >
            {selected && <>{selected.label}</>}
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5 text-gray-3 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg">
            {data.map((d) => (
              <Menu.Item key={d.value} className="p-3">
                {({ active }) => (
                  <NormalButton
                    onClick={() => {
                      setSelected(d);
                      onSelect && onSelect(d);
                    }}
                  >
                    <span className={active ? "font-bold" : "font-light"}>
                      {d.label}
                    </span>
                  </NormalButton>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    );
  }
);

DropdownSelect.propTypes = DropdownSelectDataType;
DropdownSelect.displayName = "DropdownSelect";

export default DropdownSelect;
