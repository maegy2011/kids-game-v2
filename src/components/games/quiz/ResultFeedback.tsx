"use client";

import { motion } from "motion/react";

interface ResultFeedbackProps {
  isCorrect: boolean;
  isLastQuestion: boolean;
  onNext: () => void;
}

export function ResultFeedback({ isCorrect, isLastQuestion, onNext }: ResultFeedbackProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 flex flex-col items-center gap-4"
    >
      <motion.div
        className={`text-4xl md:text-5xl font-black ${isCorrect ? "text-green-500" : "text-red-500"}`}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 0.5, repeat: 2 }}
      >
        {isCorrect ? "🎉 أحسنت! 🎉" : "😢 حاول مرة أخرى!"}
      </motion.div>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onNext}
        className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full px-10 py-4 text-2xl font-black text-white shadow-xl border-4 border-white"
      >
        {isLastQuestion ? "إنهاء الاختبار 🏁" : "السؤال التالي ➡️"}
      </motion.button>
    </motion.div>
  );
}
