import clsx from "clsx";
import PropTypes from "prop-types";
import { useState } from "react";

import Button from "../../../components/Button";
import ButtonToggle from "../../../components/ButtonToggle";
import { ButtonVariant } from "../../../utils";
import AddCommentModal from "./AddCommentModal";
import ViewCommentModal from "./ViewCommentModal";

const Answers = ["Yes", "No", "Partial", "Irrelevant"];

const QuestionnaireItem = ({
  question,
  questionNumber,
  index,
  active,
  onClick,
  onAnswer,
  userAnswer,
  userShortAnswer,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const onSend = (comment, shortAnswer = true) => {
    onAnswer(
      questionNumber,
      shortAnswer ? "" : comment,
      shortAnswer ? comment : ""
    );
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
        <div className="border-b border-background border-b-gray-1 px-8 py-6 text-[1.625rem] font-normal text-black">
          <div className="mb-4">{question}</div>
          <div className="flex flex-row gap-4">
            {Answers.map((value) => (
              <ButtonToggle
                key={value}
                on={userShortAnswer === value}
                label={value}
                onClick={() => onSend(value)}
              />
            ))}
          </div>
        </div>

        <div className="px-8 pb-6 pt-4">
          {!!userAnswer && userAnswer !== "" ? (
            <div>
              <div className="text-base font-bold">Comment</div>
              <div className="flex flex-row items-center gap-4">
                <div className="w-full break-all text-base font-light">
                  {userAnswer}
                </div>
                <Button
                  variant={ButtonVariant.outline}
                  onClick={() => setIsViewOpen(true)}
                  isBlock={false}
                >
                  VIEW COMMENT
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant={ButtonVariant.outline}
              onClick={() => setIsOpen(true)}
              isBlock={false}
            >
              ADD COMMENT
            </Button>
          )}
        </div>
      </div>
      {isOpen && (
        <AddCommentModal
          isOpen
          onClose={() => setIsOpen(false)}
          onSend={onSend}
        />
      )}
      {isViewOpen && (
        <ViewCommentModal
          isOpen
          onClose={() => setIsViewOpen(false)}
          comment={userAnswer}
        />
      )}
    </div>
  );
};

QuestionnaireItem.defaultProps = {
  answer: null,
};

QuestionnaireItem.propTypes = {
  isLoading: PropTypes.bool,
  userAnswer: PropTypes.string,
  userShortAnswer: PropTypes.string,
  onAnswer: PropTypes.func,
  question: PropTypes.string,
  index: PropTypes.number,
  questionNumber: PropTypes.number,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export default QuestionnaireItem;
