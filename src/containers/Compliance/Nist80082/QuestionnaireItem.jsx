import PropTypes from "prop-types";

import Button from "../../../components/Button";
import ButtonToggle from "../../../components/ButtonToggle";
import { ButtonVariant } from "../../../utils";

const QuestionnaireItem = ({ question, index }) => {
  return (
    <div className="flex w-full flex-row gap-[2.4375rem] pr-20">
      <div className="flex h-[4.125rem] flex-[0_0_4.125rem] items-center justify-center rounded-full bg-gray-3 text-[1.75rem] text-white">
        {index}
      </div>
      <div className="flex flex-auto flex-col border-[3px] border-gray-4 bg-background">
        <div className="border-b border-background px-8 py-6 text-[1.625rem] font-normal text-black">
          <div className="mb-4">{question}</div>
          <div className="flex flex-row gap-4">
            <ButtonToggle on={false} label="Yes" />
            <ButtonToggle on={false} label="No" />
            <ButtonToggle on={false} label="Partial" />
            <ButtonToggle on={false} label="Irrelevant" />
          </div>
        </div>
        <div className="flex flex-row gap-4 px-8 pb-6 pt-4">
          <Button variant={ButtonVariant.outline}>ADD COMMENT</Button>
        </div>
      </div>
    </div>
  );
};

QuestionnaireItem.propTypes = {
  question: PropTypes.string,
  index: PropTypes.number,
};

export default QuestionnaireItem;
