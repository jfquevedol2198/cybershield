import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import { Fragment } from "react";

import { ChildrenType } from "../../utils/types";

const RiskModal = ({ title, isOpen, children, closeModal }) => {
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
              as={"div"}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="h-2 w-full bg-risk-1" />
              <Dialog.Panel className="w-fit transform overflow-hidden bg-background text-left align-middle shadow-xl transition-all">
                <div className="relative p-6">
                  <div
                    className="absolute right-4 top-4 flex cursor-pointer flex-row items-center gap-1 text-gray-4 active:opacity-50"
                    onClick={closeModal}
                  >
                    <XMarkIcon className="h-6 w-6" /> Close
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="mb-2 text-lg font-bold text-gray-3"
                  >
                    {title}
                  </Dialog.Title>
                  <div>{children}</div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

RiskModal.defaultProps = {
  isOpen: false,
};

RiskModal.propTypes = {
  children: ChildrenType.isRequired,
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  riskLevel: PropTypes.string,
};

export default RiskModal;
