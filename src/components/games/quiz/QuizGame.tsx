"use client";

import { motion } from "motion/react";
import { useQuizGame } from "./useQuizGame";
import { CategorySelector } from "./CategorySelector";
import { QuestionCard } from "./QuestionCard";
import { ResultFeedback } from "./ResultFeedback";
import { QUIZ_CATEGORIES, TOTAL_QUESTIONS } from "./constants";
import { QuizGameProps } from "./types";

export function QuizGame({ onCorrect }: QuizGameProps) {
  const {
    quizCategory,
    currentQuestion,
    options,
    correctAnswer,
    answered,
    isCorrect,
    quizScore,
    handleAnswer,
    nextQuestion,
    selectCategory,
  } = useQuizGame(onCorrect);

  if (!quizCategory) {
    return (
      <CategorySelector
        categories={QUIZ_CATEGORIES}
        onSelect={selectCategory}
        title="❓ اختر نوع الاختبار ❓"
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="flex flex-col items-center"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-white/80 rounded-full px-6 py-3 shadow-lg">
          <span className="text-2xl font-black text-purple-700">
            السؤال {currentQuestion + 1} / {TOTAL_QUESTIONS}
          </span>
        </div>
        <div className="bg-gradient-to-r from-green-400 to-emerald-400 rounded-full px-6 py-3 shadow-lg">
          <span className="text-2xl font-black text-white">
            النتيجة: {quizScore}
          </span>
        </div>
      </div>

      <QuestionCard
        quizCategory={quizCategory}
        correctAnswer={correctAnswer}
        options={options}
        answered={answered}
        onAnswer={handleAnswer}
      />

      {answered && (
        <ResultFeedback
          isCorrect={isCorrect}
          isLastQuestion={currentQuestion >= TOTAL_QUESTIONS - 1}
          onNext={nextQuestion}
        />
      )}
    </motion.div>
  );
}
