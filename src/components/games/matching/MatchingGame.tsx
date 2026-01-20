"use client";

import { motion } from "motion/react";
import { useMatchingGame } from "./useMatchingGame";
import { CategorySelector } from "./CategorySelector";
import { GameBoard } from "./GameBoard";
import { GameComplete } from "./GameComplete";
import { MATCHING_CATEGORIES } from "./constants";
import { MatchingGameProps } from "./types";

export function MatchingGame({ onCorrect }: MatchingGameProps) {
  const {
    matchingCategory,
    leftItems,
    rightItems,
    selectedLeft,
    matchedPairs,
    wrongMatch,
    gameComplete,
    matchScore,
    handleLeftClick,
    handleRightClick,
    selectCategory,
    resetGame,
  } = useMatchingGame(onCorrect);

  if (!matchingCategory) {
    return (
      <CategorySelector
        categories={MATCHING_CATEGORIES}
        onSelect={selectCategory}
        title="🔗 اختر نوع المطابقة 🔗"
      />
    );
  }

  if (gameComplete) {
    return (
      <GameComplete
        score={matchScore}
        total={leftItems.length}
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
        className="text-2xl md:text-4xl font-black text-purple-700 text-center mb-4 md:mb-6 drop-shadow-lg"
      >
        🔗 طابق الصورة بالاسم 🔗
      </motion.h2>

      <div className="bg-gradient-to-r from-green-400 to-emerald-400 rounded-full px-4 py-2 md:px-6 md:py-3 shadow-lg mb-4 md:mb-6">
        <span className="text-xl md:text-2xl font-black text-white">
          {matchedPairs.length} / {leftItems.length}
        </span>
      </div>

      <GameBoard
        leftItems={leftItems}
        rightItems={rightItems}
        selectedLeft={selectedLeft}
        matchedPairs={matchedPairs}
        wrongMatch={wrongMatch}
        onLeftClick={handleLeftClick}
        onRightClick={handleRightClick}
      />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={resetGame}
        className="mt-6 md:mt-8 bg-gray-200 rounded-full px-6 py-3 text-lg md:text-xl font-bold text-gray-700 shadow-lg border-4 border-white"
      >
        رجوع ↩️
      </motion.button>
    </motion.div>
  );
}
