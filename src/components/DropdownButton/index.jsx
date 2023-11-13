import { Menu, Transition } from "@headlessui/react";

import { ChildrenType } from "../../utils/types";

const DropdownButton = ({ buttonContent, dropdownContent }) => {
  return (
    <Menu>
      <Menu.Button className="flex h-full flex-row items-center gap-2">
        {buttonContent}
      </Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <div className="shadow-dropdown absolute right-0 origin-top-right divide-y divide-gray-100 bg-white p-2 focus:outline-none">
          {dropdownContent}
        </div>
      </Transition>
    </Menu>
  );
};

DropdownButton.propTypes = {
  buttonContent: ChildrenType,
  dropdownContent: ChildrenType,
};

export default DropdownButton;
