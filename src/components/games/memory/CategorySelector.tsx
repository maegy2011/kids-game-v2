"use client";

import { motion } from "motion/react";
import { MemoryCategory, MemoryCategoryItem } from "./types";

interface CategorySelectorProps {
  categories: MemoryCategoryItem[];
  onSelect: (category: MemoryCategory) => void;
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
        className="text-3xl md:text-6xl font-black text-purple-700 text-center mb-8 drop-shadow-lg"
      >
        {title}
      </motion.h2>

      <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-2xl w-full px-4">
        {categories.map((cat, index) => (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: "spring", bounce: 0.4 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(cat.id)}
            className="rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-8 shadow-xl flex flex-col items-center gap-2 md:gap-3 border-4 border-white active:scale-95 transition-transform"
            style={{ backgroundColor: cat.color + "30" }}
          >
            <span className="text-5xl md:text-8xl">{cat.emoji}</span>
            <span className="text-lg md:text-2xl font-black" style={{ color: cat.color }}>
              {cat.name}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
