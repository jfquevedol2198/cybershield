import PropTypes from "prop-types";

import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import { ButtonVariant } from "../../../utils";

const ViewCommentModal = ({ isOpen, onClose, comment }) => {
  return (
    <Modal title="View comment" isOpen={isOpen} closeModal={onClose}>
      <div className="mb-6 min-w-[30rem] rounded border border-gray-1 p-4">
        <p className="text-base text-gray-4">{comment}</p>
      </div>
      <div className="flex flex-row items-center justify-end gap-2">
        <Button variant={ButtonVariant.outline} onClick={onClose}>
          CLOSE
        </Button>
      </div>
    </Modal>
  );
};

ViewCommentModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  comment: PropTypes.string,
};

export default ViewCommentModal;
