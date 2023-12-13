import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import { Fragment } from "react";

import { ChildrenType } from "../../utils/types";

const Modal = ({ title, isOpen, children, closeModal }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-fit transform overflow-hidden bg-background p-6 text-left align-middle shadow-xl transition-all">
                <div
                  className="absolute right-4 top-4 flex cursor-pointer flex-row items-center gap-1 active:opacity-50"
                  onClick={closeModal}
                >
                  <XMarkIcon className="h-6 w-6" /> Close
                </div>
                <Dialog.Title
                  as="h3"
                  className="mb-3 text-[1.625rem] font-bold text-gray-4"
                >
                  {title}
                </Dialog.Title>
                <div className="pt-6">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

Modal.defaultProps = {
  isOpen: false,
};

Modal.propTypes = {
  children: ChildrenType.isRequired,
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
