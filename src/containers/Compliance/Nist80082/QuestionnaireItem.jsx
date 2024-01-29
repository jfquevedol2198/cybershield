import clsx from "clsx";
import PropTypes from "prop-types";
import { useState } from "react";

import Button from "../../../components/Button";
import ButtonToggle from "../../../components/ButtonToggle";
import { ButtonVariant } from "../../../utils";
import AddCommentModal from "./AddCommentModal";

const Answers = ["Yes", "No", "Partial", "Irrelevant"];

const QuestionnaireItem = ({ question, index, active, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [answer, setAnswer] = useState(null);
  const onSend = (comment) => {
    setAnswer(comment);
  };

  return (
    <div
      className={clsx(
        "flex w-full flex-row gap-[2.4375rem] pr-20",
        !active && "opacity-30"
      )}
      onClick={() => onClick(index - 1)}
    >
      <div className="flex h-[4.125rem] flex-[0_0_4.125rem] items-center justify-center rounded-full bg-gray-3 text-[1.75rem] text-white">
        {index}
      </div>
      <div
        className={clsx(
          "flex flex-auto flex-col border-[3px] bg-background",
          active ? "border-gray-4" : "border-transparent"
        )}
      >
        <div className="border-b border-background px-8 py-6 text-[1.625rem] font-normal text-black">
          <div className="mb-4">{question}</div>
          <div className="flex flex-row gap-4">
            {Answers.map((value) => (
              <ButtonToggle
                key={value}
                on={answer === value}
                label={value}
                onClick={() => setAnswer(value)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-row gap-4 px-8 pb-6 pt-4">
          <Button
            variant={ButtonVariant.outline}
            onClick={() => setIsOpen(true)}
          >
            ADD COMMENT
          </Button>
        </div>
      </div>
      {isOpen && (
        <AddCommentModal
          isOpen
          onClose={() => setIsOpen(false)}
          onSend={onSend}
        />
      )}
    </div>
  );
};

QuestionnaireItem.propTypes = {
  question: PropTypes.string,
  index: PropTypes.number,
  questionNumber: PropTypes.number,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export default QuestionnaireItem;
