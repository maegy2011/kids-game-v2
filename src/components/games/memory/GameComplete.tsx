"use client";

import { motion } from "motion/react";

interface GameCompleteProps {
  moves: number;
  onPlayAgain: () => void;
}

export function GameComplete({ moves, onPlayAgain }: GameCompleteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-6 px-4"
    >
      <motion.div
        className="text-[80px] md:text-[120px]"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        🎉
      </motion.div>
      <h2 className="text-3xl md:text-5xl font-black text-purple-700 text-center">
        ممتاز! أكملت اللعبة!
      </h2>
      <p className="text-2xl md:text-3xl font-bold text-green-600">
        عدد المحاولات: {moves}
      </p>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onPlayAgain}
        className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full px-8 py-4 text-xl md:text-2xl font-black text-white shadow-xl border-4 border-white"
      >
        العب مرة أخرى 🔄
      </motion.button>
    </motion.div>
  );
}
