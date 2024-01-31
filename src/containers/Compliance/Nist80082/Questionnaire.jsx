import PropTypes from "prop-types";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ActivityIndicator from "../../../components/ActivityIndicator";
import Button from "../../../components/Button";
import useCompliance from "../../../hooks/useCompliance";
import { ButtonVariant } from "../../../utils";
import QuestionnaireItem from "./QuestionnaireItem";

const Questionnaire = ({ active }) => {
  const questionsWrapper = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [questions, setQuestions] = useState([]);

  const [questionIndex, setQuestionIndex] = useState(0);
  const title = searchParams.get("option") || "Detect";

  const { loading, allQuestions = [], answers, onAddComment } = useCompliance();

  useEffect(() => {
    setQuestions(
      allQuestions.filter((question) => question.question_section === title)
    );
  }, [allQuestions, title]);

  const answeredCount = useMemo(
    () =>
      questions.reduce(
        (acc, question) =>
          answers.find(
            (answer) => question.question_number === answer.question_id
          )
            ? acc + 1
            : acc,
        0
      ),
    [answers, questions]
  );

  const scrollToQuestionnaire = (index) => {
    const questionnaire =
      questionsWrapper.current.querySelectorAll("& > div")[index];
    setQuestionIndex(index);
    questionnaire.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const onBack = () => {
    let index = questionIndex;
    if (index > 0) index--;
    scrollToQuestionnaire(index);
  };

  const onNext = () => {
    let index = questionIndex;
    if (index < questions.length - 1) index++;
    scrollToQuestionnaire(index);
  };

  if (!active) return <></>;

  return (
    <div className="flex h-full w-full flex-col">
      {loading && <ActivityIndicator />}
      <div className="border-b border-gray-1 pb-[1.0626rem] pl-[4.25rem] pr-[2.5625rem] pt-[2.375rem]">
        <div className="mb-2 flex flex-row items-baseline">
          <div className="flex-auto text-[2rem] font-bold leading-none text-gray-4">
            {title}
          </div>
          <div className="flex flex-row items-baseline text-gray-2">
            <div className="text-[2.75rem] leading-none">{answeredCount}</div>
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
          {questions.map((question, index) => {
            const answer = answers.find(
              (a) => a.question_id === question.question_number
            );
            return (
              <QuestionnaireItem
                index={index + 1}
                key={`question-${index}`}
                questionNumber={question.question_number}
                question={question.question_description}
                active={index === questionIndex}
                onClick={scrollToQuestionnaire}
                onAnswer={onAddComment}
                userAnswer={answer?.user_answer}
                userShortAnswer={answer?.user_short_answers}
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-row justify-between border-t border-gray-1 p-8">
        <Button
          variant={ButtonVariant.outline}
          onClick={() => {
            searchParams.set("status", "start");
            setSearchParams(searchParams);
          }}
        >
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

Questionnaire.propTypes = {
  active: PropTypes.bool,
};

export default Questionnaire;
