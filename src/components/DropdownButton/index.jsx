import { Menu, Transition } from "@headlessui/react";
import PropTypes from "prop-types";

import { ChildrenType } from "../../utils/types";

const DropdownButton = ({ buttonContent, disabled, dropdownContent }) => {
  return (
    <Menu>
      <Menu.Button
        disabled={disabled}
        className="flex h-full flex-row items-center gap-2"
      >
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
        <div className="absolute right-0 origin-top-right divide-y divide-gray-100 bg-white p-2 shadow-dropdown focus:outline-none">
          {dropdownContent}
        </div>
      </Transition>
    </Menu>
  );
};

DropdownButton.propTypes = {
  buttonContent: ChildrenType,
  dropdownContent: ChildrenType,
  disabled: PropTypes.bool,
};

export default DropdownButton;
