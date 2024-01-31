import { zodResolver } from "@hookform/resolvers/zod";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "../../../components/Button";
import FormControl from "../../../components/FormControl";
import Modal from "../../../components/Modal";
import { ButtonVariant, SizeVariant } from "../../../utils";
import snack from "../../../utils/snack";

const schema = z.object({
  comment: z.string().min(1, "Comment is required"),
});

const AddCommentModal = ({ isOpen, onClose, onSend }) => {
  const getDefaultValues = () => {
    return {
      comment: undefined,
    };
  };
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues(),
  });

  useEffect(() => form.reset(), [isOpen]);

  const onSubmit = async (e) => {
    try {
      onSend(e.comment, false);
      onClose();
    } catch (error) {
      snack.error(error.message);
    }
  };

  const onHandleSubmit = form.handleSubmit(onSubmit);

  return (
    <Modal title="Add comment" isOpen={isOpen} closeModal={onClose}>
      <p className="mb-2 text-base text-gray-4">
        Add comments to back up your answer.{" "}
      </p>
      <form className="min-w-[30rem]" onSubmit={onHandleSubmit}>
        <FormControl
          className="mb-4"
          id="comment"
          label="Comment"
          size={SizeVariant.medium}
          error={form.formState.errors.comment?.message}
          {...form.register("comment")}
        />
        <div className="flex flex-row items-center justify-end gap-2">
          <Button variant={ButtonVariant.outline} onClick={onClose}>
            CANCEL
          </Button>
          <Button variant={ButtonVariant.filled} isSubmit>
            SEND
          </Button>
        </div>
      </form>
    </Modal>
  );
};

AddCommentModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSend: PropTypes.func,
};

export default AddCommentModal;
