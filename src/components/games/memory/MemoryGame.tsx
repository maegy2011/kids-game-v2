"use client";

import { motion } from "motion/react";
import { useMemoryGame } from "./useMemoryGame";
import { CategorySelector } from "./CategorySelector";
import { CardGrid } from "./CardGrid";
import { GameComplete } from "./GameComplete";
import { MEMORY_CATEGORIES } from "./constants";
import { MemoryGameProps } from "./types";

export function MemoryGame({ onCorrect }: MemoryGameProps) {
  const {
    memoryCategory,
    cards,
    matchedPairs,
    moves,
    gameComplete,
    isChecking,
    handleCardClick,
    selectCategory,
    resetGame,
  } = useMemoryGame(onCorrect);

  if (!memoryCategory) {
    return (
      <CategorySelector
        categories={MEMORY_CATEGORIES}
        onSelect={selectCategory}
        title="🧠 اختر نوع لعبة الذاكرة 🧠"
      />
    );
  }

  if (gameComplete) {
    return (
      <GameComplete
        moves={moves}
        onPlayAgain={resetGame}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="flex flex-col items-center w-full px-2 md:px-4"
    >
      <motion.h2
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="text-2xl md:text-4xl font-black text-purple-700 text-center mb-4 drop-shadow-lg"
      >
        🧠 لعبة الذاكرة 🧠
      </motion.h2>

      <div className="flex gap-4 mb-4 md:mb-6">
        <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-full px-4 py-2 md:px-6 md:py-3 shadow-lg">
          <span className="text-lg md:text-2xl font-black text-white">
            المحاولات: {moves}
          </span>
        </div>
        <div className="bg-gradient-to-r from-green-400 to-emerald-400 rounded-full px-4 py-2 md:px-6 md:py-3 shadow-lg">
          <span className="text-lg md:text-2xl font-black text-white">
            {matchedPairs.length} / {cards.length / 2}
          </span>
        </div>
      </div>

      <CardGrid
        cards={cards}
        isChecking={isChecking}
        onCardClick={handleCardClick}
      />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={resetGame}
        className="mt-6 bg-gray-200 rounded-full px-6 py-3 text-lg md:text-xl font-bold text-gray-700 shadow-lg border-4 border-white"
      >
        رجوع ↩️
      </motion.button>
    </motion.div>
  );
}
