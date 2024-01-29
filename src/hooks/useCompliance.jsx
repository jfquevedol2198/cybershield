import { useEffect, useState } from "react";

import apiClient from "../api";

const useCompliance = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data } = await apiClient.getStatus();
      const categories = data || [];
      setCategories(categories);
      setTotalQuestions(
        categories.reduce((acc, c) => acc + c.total_questions, 0)
      );
      setTotalAnswers(
        categories.reduce((acc, c) => acc + c.answered_questions, 0)
      );
      setTotalScore(
        parseInt((categories[0]?.overall_compliance_score || 0) * 100)
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onAddComment = async (questionId, comment) => {};

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    loading,
    categories,
    totalScore,
    totalQuestions,
    totalAnswers,
    onAddComment,
  };
};

export default useCompliance;
