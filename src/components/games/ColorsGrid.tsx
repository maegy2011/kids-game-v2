"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { colorsData } from "@/data/game-data";

interface ColorsGridProps {
  selectedItem: number | null;
  onItemClick: (index: number, name: string) => void;
}

export function ColorsGrid({ selectedItem, onItemClick }: ColorsGridProps) {
  const [enlargedItem, setEnlargedItem] = useState<number | null>(null);

  const handleClick = (index: number, name: string) => {
    setEnlargedItem(index);
    onItemClick(index, name);
  };

  const closeEnlarged = () => {
    setEnlargedItem(null);
  };

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
        🎨 الألوان 🎨
      </motion.h2>

      <AnimatePresence>
        {enlargedItem !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-40 flex items-center justify-center p-4"
            onClick={closeEnlarged}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180, y: 100 }}
              animate={{ scale: 1, rotate: 0, y: 0 }}
              exit={{ scale: 0, rotate: 180, y: 100 }}
              transition={{ type: "spring", bounce: 0.4 }}
              className="rounded-[3rem] p-10 md:p-16 shadow-2xl flex flex-col items-center gap-6 border-8 border-white relative overflow-hidden"
              style={{
                backgroundColor: colorsData[enlargedItem].bgColor,
                minWidth: "320px",
                minHeight: "380px",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="w-40 h-40 md:w-60 md:h-60 rounded-full border-8 border-white shadow-2xl relative z-10"
                style={{ backgroundColor: colorsData[enlargedItem].color }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              <motion.span 
                className="text-4xl md:text-6xl font-black drop-shadow-lg relative z-10"
                style={{ color: colorsData[enlargedItem].color === "#FAFAFA" ? "#333" : colorsData[enlargedItem].color }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {colorsData[enlargedItem].name}
              </motion.span>

              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeEnlarged}
                className="mt-4 bg-white rounded-full px-10 py-4 text-2xl font-black shadow-lg border-4 relative z-10"
                style={{ 
                  color: colorsData[enlargedItem].color === "#FAFAFA" ? "#333" : colorsData[enlargedItem].color, 
                  borderColor: colorsData[enlargedItem].color 
                }}
              >
                إغلاق ❌
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div 
        className="grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl w-full p-6 rounded-[2rem] shadow-xl border-4 border-white/50"
        style={{ backgroundColor: "#FFF5F5" }}
      >
        {colorsData.map((item, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.05, type: "spring", bounce: 0.4 }}
            whileHover={{ scale: 1.15, rotate: [-3, 3, 0], y: -8 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleClick(index, item.name)}
            className="relative rounded-[1.5rem] p-5 md:p-6 shadow-lg flex flex-col items-center gap-3 transition-all border-4 border-white overflow-hidden"
            style={{
              backgroundColor: item.bgColor,
              boxShadow: selectedItem === index 
                ? `0 0 0 6px white, 0 0 40px ${item.color}` 
                : `0 8px 20px ${item.color}40`,
            }}
          >
            <motion.div
              className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white shadow-lg"
              style={{ backgroundColor: item.color }}
              animate={selectedItem === index 
                ? { scale: [1, 1.4, 1] } 
                : { scale: [1, 1.05, 1] }}
              transition={selectedItem === index 
                ? { duration: 0.6 } 
                : { duration: 2, repeat: Infinity, delay: index * 0.1 }}
            />
            <span 
              className="text-base md:text-xl font-black drop-shadow-md"
              style={{ color: item.color === "#FAFAFA" ? "#333" : item.color }}
            >
              {item.name}
            </span>
            
            {selectedItem === index && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                className="absolute -top-2 -right-2 text-3xl bg-white rounded-full p-1 shadow-lg"
              >
                ✅
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
