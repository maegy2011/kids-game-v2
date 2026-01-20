"use client";

import { motion } from "motion/react";
import { MatchingItem, MatchingRightItem } from "./types";

interface GameBoardProps {
  leftItems: MatchingItem[];
  rightItems: MatchingRightItem[];
  selectedLeft: number | null;
  matchedPairs: number[];
  wrongMatch: { left: number; right: number } | null;
  onLeftClick: (id: number) => void;
  onRightClick: (id: number) => void;
}

export function GameBoard({ 
  leftItems, 
  rightItems, 
  selectedLeft, 
  matchedPairs, 
  wrongMatch, 
  onLeftClick, 
  onRightClick 
}: GameBoardProps) {
  return (
    <div className="flex gap-3 md:gap-8 w-full max-w-4xl justify-center">
      <div className="flex flex-col gap-2 md:gap-3">
        {leftItems.map((item) => (
          <motion.button
            key={`left-${item.id}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: matchedPairs.includes(item.id) ? 1 : 1.05 }}
            whileTap={{ scale: matchedPairs.includes(item.id) ? 1 : 0.95 }}
            onClick={() => onLeftClick(item.id)}
            className={`rounded-xl md:rounded-2xl p-3 md:p-5 shadow-lg flex items-center justify-center border-4 transition-all min-w-[70px] md:min-w-[100px] active:scale-95 ${
              matchedPairs.includes(item.id)
                ? "opacity-50 border-green-500 bg-green-100"
                : selectedLeft === item.id
                ? "border-yellow-400 bg-yellow-50 ring-4 ring-yellow-300"
                : wrongMatch?.left === item.id
                ? "border-red-500 bg-red-100 animate-pulse"
                : "border-white bg-white"
            }`}
            disabled={matchedPairs.includes(item.id)}
          >
            <span className="text-4xl md:text-6xl">{item.display}</span>
          </motion.button>
        ))}
      </div>

      <div className="flex flex-col gap-2 md:gap-3">
        {rightItems.map((item) => (
          <motion.button
            key={`right-${item.id}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: item.matched ? 1 : 1.05 }}
            whileTap={{ scale: item.matched ? 1 : 0.95 }}
            onClick={() => onRightClick(item.id)}
            className={`rounded-xl md:rounded-2xl p-3 md:p-5 shadow-lg flex items-center justify-center border-4 transition-all min-w-[80px] md:min-w-[120px] active:scale-95 ${
              item.matched
                ? "opacity-50 border-green-500 bg-green-100"
                : wrongMatch?.right === item.id
                ? "border-red-500 bg-red-100 animate-pulse"
                : "border-white bg-white hover:border-cyan-300"
            }`}
            disabled={item.matched}
          >
            <span 
              className="text-lg md:text-2xl font-black"
              style={{ color: item.color }}
            >
              {item.name}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
