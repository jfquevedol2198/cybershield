import { useSearchParams } from "react-router-dom";

import Button from "../../../components/Button";
import { ButtonVariant } from "../../../utils";
import QuestionnaireItem from "./QuestionnaireItem";
import { COMPLIANCE_ITEMS } from "./Sidebar";

const QUESTIONNAIRES = [
  "Do appropriate personnel review the audit records at least weekly for indications of inappropriate or unusual activity?",
  "Are audit reports generated using automated tools?",
  "Can you manipulate your audit reports based on events of interest without altering the content of the logs?",
  "Is the system contingency plan coordinated with related plans, such as the disaster recovery plan, the business continuity plan, and the incident response plan?",
];

const Questionnaire = () => {
  const [searchParams] = useSearchParams();

  const title = searchParams.get("option") || "Detect";
  const answers = COMPLIANCE_ITEMS.find(
    (item) => item.title === title
  )?.answers;
  const questions = COMPLIANCE_ITEMS.find(
    (item) => item.title === title
  )?.answers;

  return (
    <div className="flex h-full w-full flex-col">
      <div className="border-b border-gray-1 pb-[1.0626rem] pl-[4.25rem] pr-[2.5625rem] pt-[2.375rem]">
        <div className="mb-2 flex flex-row items-baseline">
          <div className="flex-auto text-[2rem] font-bold leading-none text-gray-4">
            {title}
          </div>
          <div className="flex flex-row items-baseline text-gray-2">
            <div className="text-[2.75rem] leading-none">{answers}</div>
            <div className="text-2xl leading-none">/{questions}</div>
          </div>
        </div>
        <div className="mb-2 h-[10px] w-full rounded bg-background"></div>
        <div className="text-base text-gray-4">
          Est. time to complete: 30 minutes
        </div>
      </div>
      <div className="flex-auto overflow-y-auto py-6 pl-[4.25rem] pr-[0.8125rem]">
        <div className="space-y-10  ">
          {QUESTIONNAIRES.map((questionnaire, index) => (
            <QuestionnaireItem
              index={index + 1}
              key={`questionnaire-${index}`}
              question={questionnaire}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-between border-t border-gray-1 p-8">
        <Button variant={ButtonVariant.outline}>
          SAVE & CLOSE THE QUESTIONNAIRE
        </Button>
        <div className="flex flex-row gap-2">
          <Button variant={ButtonVariant.outline}>BACK</Button>
          <Button variant={ButtonVariant.filled}>NEXT</Button>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
