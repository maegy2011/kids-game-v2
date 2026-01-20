"use client";

import { motion } from "motion/react";
import { ShapeDisplay } from "../ShapeDisplay";
import { QuizCategory, QuizOption } from "./types";

interface QuestionCardProps {
  quizCategory: QuizCategory;
  correctAnswer: { display: string; name: string; color: string } | null;
  options: QuizOption[];
  answered: boolean;
  onAnswer: (option: QuizOption) => void;
}

export function QuestionCard({ quizCategory, correctAnswer, options, answered, onAnswer }: QuestionCardProps) {
  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="bg-white/90 rounded-[2rem] p-8 md:p-12 shadow-2xl mb-8 text-center border-4 border-purple-200"
      >
        <motion.h3
          className="text-3xl md:text-4xl font-black text-purple-700 mb-6"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          أين {correctAnswer?.name}؟ 🤔
        </motion.h3>

        {quizCategory === "colors" && correctAnswer && (
          <motion.div
            className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto border-4 border-white shadow-xl"
            style={{ backgroundColor: correctAnswer.color }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}

        {quizCategory === "shapes" && correctAnswer && (
          <motion.div
            className="flex justify-center"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ShapeDisplay shape={correctAnswer.display} color={correctAnswer.color} size={100} />
          </motion.div>
        )}
      </motion.div>

      <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-2xl w-full">
        {options.map((option, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, type: "spring", bounce: 0.4 }}
            whileHover={!answered ? { scale: 1.08, y: -5 } : {}}
            whileTap={!answered ? { scale: 0.95 } : {}}
            onClick={() => onAnswer(option)}
            disabled={answered}
            className={`rounded-[1.5rem] p-6 md:p-8 shadow-xl flex flex-col items-center gap-3 border-4 transition-all ${
              answered
                ? option.isCorrect
                  ? "border-green-500 bg-green-100"
                  : "border-red-300 bg-red-50 opacity-60"
                : "border-white bg-white hover:border-purple-300"
            }`}
          >
            {quizCategory === "colors" ? (
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white shadow-lg"
                style={{ backgroundColor: option.color }}
              />
            ) : quizCategory === "shapes" ? (
              <ShapeDisplay shape={option.display} color={option.color} size={60} />
            ) : (
              <span className="text-5xl md:text-6xl">{option.display}</span>
            )}
            <span className="text-xl md:text-2xl font-black" style={{ color: option.color }}>
              {option.name}
            </span>

            {answered && option.isCorrect && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-4xl"
              >
                ✅
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </>
  );
}
