import PropTypes from "prop-types";

import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import { ButtonVariant } from "../../../utils";

const ResetModal = ({ showModal, onClose }) => {
  return (
    <Modal
      title="Reset Compliance Questionnaire"
      isOpen={showModal}
      closeModal={onClose}
    >
      <div className="w-[32rem]">
        <div className="mb-5 text-base font-normal">
          The current information will be discarded. Reset compliance
          Questionnaire?
        </div>
        <div className="flex flex-row items-center justify-end gap-2">
          <Button variant={ButtonVariant.outline} onClick={onClose}>
            CANCEL
          </Button>
          <Button variant={ButtonVariant.filled}>RESET</Button>
        </div>
      </div>
    </Modal>
  );
};

ResetModal.propTypes = {
  showModal: PropTypes.bool,
  onClose: PropTypes.func,
};

export default ResetModal;
