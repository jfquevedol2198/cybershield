import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";

import { DropdownSelectDataType } from "../../utils/types";
import NormalButton from "../NormalButton";

const DropdownSelect = ({ data, onSelect }) => {
  const [selected, setSelected] = useState();
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-background px-4 py-2 text-lg font-medium text-gray-3">
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
                <NormalButton onClick={() => setSelected(d)} clas>
                  {d.label}
                </NormalButton>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

DropdownSelect.propTypes = DropdownSelectDataType;

export default DropdownSelect;
