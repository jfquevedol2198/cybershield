import useCommon from "../../hooks/useCommon";
import { ButtonVariant } from "../../utils";
import Button from "../Button";
import Modal from "../Modal";

const SignoutModal = () => {
  const { showSignoutModal, setShowSignoutModal, onSignout } = useCommon();
  const onClose = () => setShowSignoutModal(false);
  return (
    <Modal title="Sign out" isOpen={showSignoutModal} closeModal={onClose}>
      <div className="w-[32rem]">
        <div className="mb-5 text-base font-normal">
          You will be redirected to the login page.
        </div>
        <div className="flex flex-row items-center justify-end gap-2">
          <Button variant={ButtonVariant.outline} onClick={onClose}>
            CANCEL
          </Button>
          <Button variant={ButtonVariant.filled} onClick={onSignout}>
            SIGN OUT
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SignoutModal;
