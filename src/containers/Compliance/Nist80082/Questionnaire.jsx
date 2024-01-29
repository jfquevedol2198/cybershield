import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import apiClient from "../../../api";
import ActivityIndicator from "../../../components/ActivityIndicator";
import Button from "../../../components/Button";
import { ButtonVariant } from "../../../utils";
import QuestionnaireItem from "./QuestionnaireItem";

const Questionnaire = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  const [questionIndex, setQuestionIndex] = useState(0);
  const questionsWrapper = useRef(null);
  const title = searchParams.get("option") || "Detect";

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data } = await apiClient.getQuestions();
      setQuestions(
        data.filter((question) => question.question_section === title)
      );
      setLoading(false);
    };
    fetch();
  }, [title]);

  const scrollToQuestionaire = (questionaire) => {
    questionaire.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const onBack = () => {
    let index = questionIndex;
    if (index > 0) index--;
    setQuestionIndex(index);
    scrollToQuestionaire(
      questionsWrapper.current.querySelectorAll("& > div")[index]
    );
  };

  const onNext = () => {
    let index = questionIndex;
    if (index < questions.length - 1) index++;
    setQuestionIndex(index);
    scrollToQuestionaire(
      questionsWrapper.current.querySelectorAll("& > div")[index]
    );
  };

  return (
    <div className="flex h-full w-full flex-col">
      {loading && <ActivityIndicator />}
      <div className="border-b border-gray-1 pb-[1.0626rem] pl-[4.25rem] pr-[2.5625rem] pt-[2.375rem]">
        <div className="mb-2 flex flex-row items-baseline">
          <div className="flex-auto text-[2rem] font-bold leading-none text-gray-4">
            {title}
          </div>
          <div className="flex flex-row items-baseline text-gray-2">
            <div className="text-[2.75rem] leading-none">
              {questions.length}
            </div>
            <div className="text-2xl leading-none">/{questions.length}</div>
          </div>
        </div>
        <div className="mb-2 h-[10px] w-full rounded bg-background"></div>
        <div className="text-base text-gray-4">
          Est. time to complete: 30 minutes
        </div>
      </div>
      <div className="flex-auto overflow-y-auto py-6 pl-[4.25rem] pr-[0.8125rem]">
        <div className="space-y-10" ref={questionsWrapper}>
          {questions.map((question, index) => (
            <QuestionnaireItem
              index={index + 1}
              key={`question-${index}`}
              questionNumber={question.question_number}
              question={question.question_description}
              active={index === questionIndex}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-between border-t border-gray-1 p-8">
        <Button variant={ButtonVariant.outline}>
          SAVE & CLOSE THE QUESTIONNAIRE
        </Button>
        <div className="flex flex-row gap-2">
          <Button variant={ButtonVariant.outline} onClick={onBack}>
            BACK
          </Button>
          <Button variant={ButtonVariant.filled} onClick={onNext}>
            NEXT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
