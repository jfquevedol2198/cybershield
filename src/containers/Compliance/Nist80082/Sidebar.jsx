import chroma from "chroma-js";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import ActivityIndicator from "../../../components/ActivityIndicator";
import useCompliance from "../../../hooks/useCompliance";
import { COMPLIANCE_ITEMS } from "../../../utils";

const colorScale = chroma
  .scale(["#F26060", "#F77044", "#FD8224", "FF871C", "#27AE60"])
  .domain([0, 100], 100, "log");

const Item = ({
  score,
  title,
  questions,
  answers,
  selected = false,
  onSelect,
}) => {
  return (
    <div
      className={clsx(
        "flex cursor-pointer flex-row items-center justify-start gap-5 px-5 py-3",
        selected ? "bg-white" : "bg-gray-1"
      )}
      onClick={onSelect}
    >
      <div
        className="mb-1 flex w-24 flex-shrink-0 flex-row items-baseline justify-end leading-none"
        style={{ color: colorScale(score).hex() }}
      >
        <span className="text-[2.75rem] font-light">{score}</span>
        <span className="text-[1.5rem] font-light">%</span>
      </div>
      <div className="mb-1 flex flex-col items-baseline justify-center leading-none">
        <span className="text-base font-bold text-gray-4">{title}</span>
        <span className="text-base font-light text-gray-2">
          Questions: {answers}/{questions}
        </span>
      </div>
    </div>
  );
};

Item.propTypes = {
  score: PropTypes.number,
  title: PropTypes.string,
  questions: PropTypes.number,
  answers: PropTypes.number,
  selected: PropTypes.bool,
  onSelect: PropTypes.func,
};

const Sidebar = () => {
  const [selIndex, setSelIndex] = useState();
  const [, setSearchParams] = useSearchParams();
  const { loading, categories, totalScore, totalAnswers, totalQuestions } =
    useCompliance();

  const onSelect = (item, index) => {
    setSelIndex(index);
    setSearchParams({ status: "start", option: item });
  };

  return (
    <div className="relative flex-[0_0_23.75rem] bg-background py-8 pl-[2.5rem] pr-[1.25rem]">
      {loading && <ActivityIndicator />}
      <div className="text-[1.625rem] font-bold text-gray-3 ">Compliance</div>
      <div className="mb-4 text-[2rem] font-bold text-gray-4">NIST 800-82</div>
      <div className="mb-5 bg-white px-5 py-3">
        <div
          className="mb-1 flex flex-row items-baseline justify-center leading-none"
          style={{
            color: colorScale(totalScore).hex(),
          }}
        >
          <span className="text-[5rem] font-light">{totalScore}</span>
          <span className="text-[2rem] font-light">%</span>
        </div>
        <div className="text-center text-[1.375rem] font-normal leading-none text-gray-4">
          Compliance Score
        </div>
        <div className="text-center text-base font-light leading-none text-gray-4">
          Questions: {totalAnswers}/{totalQuestions}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        {COMPLIANCE_ITEMS.map((item, index) => {
          const category =
            categories.find((c) => c.section_description === item) || {};
          const questions = category.total_questions || 0;
          const answers = category.answered_questions || 0;
          const score =
            questions > 0 ? parseInt((answers / questions) * 100) : 0;

          // Check if the score is not equal to 0, then render the item
          if (score !== 0) {
            return (
              <Item
                key={item}
                title={item}
                questions={questions}
                answers={answers}
                score={score}
                selected={selIndex === index}
                onSelect={() => onSelect(item, index)}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default Sidebar;
