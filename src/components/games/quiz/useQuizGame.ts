"use client";

import { useState, useEffect, useCallback } from "react";
import { speakArabic } from "@/lib/audio";
import { QuizCategory, QuizOption } from "./types";
import { getDataForCategory } from "./utils";
import { TOTAL_QUESTIONS } from "./constants";

export function useQuizGame(onCorrect: () => void) {
  const [quizCategory, setQuizCategory] = useState<QuizCategory | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [options, setOptions] = useState<QuizOption[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<{ display: string; name: string; color: string } | null>(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const generateQuestion = useCallback((category: QuizCategory) => {
    const data = getDataForCategory(category);
    const shuffled = [...data].sort(() => Math.random() - 0.5);
    const correct = shuffled[0];
    const wrongOptions = shuffled.slice(1, 4);
    
    const allOptions = [
      { ...correct, isCorrect: true },
      ...wrongOptions.map(o => ({ ...o, isCorrect: false }))
    ].sort(() => Math.random() - 0.5);

    setCorrectAnswer(correct);
    setOptions(allOptions);
    setAnswered(false);
    setIsCorrect(false);
  }, []);

  useEffect(() => {
    if (quizCategory) {
      generateQuestion(quizCategory);
    }
  }, [quizCategory, currentQuestion, generateQuestion]);

  const handleAnswer = (option: { isCorrect: boolean; name: string }) => {
    if (answered) return;
    setAnswered(true);
    setIsCorrect(option.isCorrect);
    
    if (option.isCorrect) {
      setQuizScore(prev => prev + 1);
      onCorrect();
      speakArabic("أحسنت! إجابة صحيحة!");
    } else {
      speakArabic("حاول مرة أخرى!");
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < TOTAL_QUESTIONS - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setQuizCategory(null);
      setCurrentQuestion(0);
      setQuizScore(0);
    }
  };

  const selectCategory = (category: QuizCategory) => {
    setQuizCategory(category);
  };

  return {
    quizCategory,
    currentQuestion,
    options,
    correctAnswer,
    answered,
    isCorrect,
    quizScore,
    totalQuestions: TOTAL_QUESTIONS,
    handleAnswer,
    nextQuestion,
    selectCategory,
  };
}
