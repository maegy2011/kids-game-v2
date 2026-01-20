"use client";

import { motion } from "motion/react";
import { QuizCategory, QuizCategoryItem } from "./types";

interface CategorySelectorProps {
  categories: QuizCategoryItem[];
  onSelect: (category: QuizCategory) => void;
  title: string;
}

export function CategorySelector({ categories, onSelect, title }: CategorySelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="flex flex-col items-center"
    >
      <motion.h2
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="text-4xl md:text-6xl font-black text-purple-700 text-center mb-8 drop-shadow-lg"
      >
        {title}
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-3xl w-full">
        {categories.map((cat, index) => (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: "spring", bounce: 0.4 }}
            whileHover={{ scale: 1.08, y: -10 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(cat.id)}
            className="rounded-[2rem] p-6 md:p-8 shadow-xl flex flex-col items-center gap-3 border-4 border-white"
            style={{ backgroundColor: cat.color + "30" }}
          >
            <span className="text-6xl md:text-8xl">{cat.emoji}</span>
            <span className="text-xl md:text-2xl font-black" style={{ color: cat.color }}>
              {cat.name}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
