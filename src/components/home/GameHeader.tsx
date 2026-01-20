"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { type GameCategory } from "@/data/game-data";

interface GameHeaderProps {
  score: number;
  currentGame: GameCategory;
  onGoHome: () => void;
}

export function GameHeader({ score, currentGame, onGoHome }: GameHeaderProps) {
  return (
    <header className="relative z-10 p-4 md:p-6 flex justify-between items-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full px-5 py-3 md:px-8 md:py-4 flex items-center gap-3 shadow-lg border-4 border-white"
      >
        <motion.span 
          className="text-3xl md:text-4xl"
          animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
        >
          ⭐
        </motion.span>
        <span className="text-3xl md:text-4xl font-black text-white drop-shadow-md">{score}</span>
      </motion.div>

      <div className="flex items-center gap-3">
        <Link href="/settings">
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-gradient-to-r from-gray-500 to-gray-600 rounded-full px-4 py-3 md:px-6 md:py-4 text-white text-xl md:text-2xl font-bold shadow-lg border-4 border-white flex items-center gap-2"
          >
            <span className="text-2xl md:text-3xl">⚙️</span>
          </motion.button>
        </Link>

        {currentGame !== "home" && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onGoHome}
            className="bg-gradient-to-r from-pink-400 to-rose-400 rounded-full px-6 py-3 md:px-8 md:py-4 text-white text-xl md:text-2xl font-bold shadow-lg border-4 border-white flex items-center gap-3"
          >
            <span className="text-2xl md:text-3xl">🏠</span>
            <span>الرئيسية</span>
          </motion.button>
        )}
      </div>
    </header>
  );
}
