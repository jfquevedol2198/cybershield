import { useEffect, useState } from "react";

import apiClient from "../api8000";
import apiClient8080 from "../api8080";
import snack from "../utils/snack";
import useAuth from "./useAuth";

const useCompliance = () => {
  const { userInfo } = useAuth();

  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [isQuestionsLoading, setIsQuestionsLoading] = useState(false);
  const [allQuestions, setAllQuestions] = useState([]);

  const [isAnswerLoading, setIsAnswerLoading] = useState(false);
  const [answers, setAnswers] = useState([]);

  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const [isAnswering, setIsAnswering] = useState(false);

  const fetchCategories = async () => {
    try {
      setIsCategoryLoading(true);
      const { data } = await apiClient.getComplianceStats();
      const categories = data || [];
      setCategories(categories);

      const totalQuestions = categories.reduce(
        (acc, c) => acc + c.total_questions,
        0
      );
      setTotalQuestions(totalQuestions);

      const totalAnswers = categories.reduce(
        (acc, c) => acc + c.answered_questions,
        0
      );
      setTotalAnswers(totalAnswers);
      setTotalScore(parseInt((totalAnswers / totalQuestions) * 100));
    } catch (error) {
      console.log(error);
    } finally {
      setIsCategoryLoading(false);
    }
  };

  const fetchAnswers = async () => {
    try {
      setIsAnswerLoading(true);
      const { data } = await apiClient.getAnswersByUserId(1 /* userInfo?.id */);
      setAnswers(data || []);
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 404) {
        setAnswers([]);
      } else {
        snack.error(error.message);
      }
    } finally {
      setIsAnswerLoading(false);
    }
  };

  const fetchAllQuestions = async () => {
    try {
      setIsQuestionsLoading(true);
      const { data } = await apiClient.getQuestions();
      setAllQuestions(data || []);
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 404) {
        setAllQuestions([]);
      } else {
        snack.error(error.message);
      }
    } finally {
      setIsQuestionsLoading(false);
    }
  };

  const onAddComment = async (questionId, userAnswer, userShortAnswer) => {
    try {
      setIsAnswering(true);
      if (!userInfo?.id) return;

      let data = {
        user_id: "1", // userInfo?.id.toString(),
        question_id: questionId,
        user_answer: userAnswer,
        user_short_answers: userShortAnswer,
      };
      await apiClient8080.insertAnswer(data);

      const answer = answers.find(
        (answer) => answer.question_id === questionId
      );
      if (answer) {
        setAnswers(
          answers.map((answer) =>
            answer.question_id === questionId ? { ...answer, ...data } : answer
          )
        );
      } else {
        setAnswers([...answers, data]);
      }
      fetchCategories();
    } catch (error) {
      console.log(error);
    } finally {
      setIsAnswering(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchAllQuestions();
  }, []);

  useEffect(() => {
    if (userInfo?.id) {
      fetchAnswers();
    }
  }, [userInfo?.id]);

  return {
    loading: isCategoryLoading || isAnswerLoading || isQuestionsLoading,
    isAnswering,

    answers,
    fetchAnswers,

    allQuestions,
    fetchAllQuestions,

    categories,
    fetchCategories,

    totalScore,
    totalQuestions,
    totalAnswers,

    onAddComment,
  };
};

export default useCompliance;
