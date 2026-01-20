"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { playAnimalSound, stopAnimalSound } from "@/lib/audio";

interface GameGridProps {
  title: string;
  items: { display: string; name: string; color: string; hasSound?: boolean }[];
  selectedItem: number | null;
  onItemClick: (index: number, name: string, playSound?: boolean) => void;
  isLetter?: boolean;
  bgColor?: string;
  showSoundIcon?: boolean;
}

export function GameGrid({
  title,
  items,
  selectedItem,
  onItemClick,
  isLetter = false,
  bgColor = "#FFFFFF",
  showSoundIcon = false,
}: GameGridProps) {
  const [enlargedItem, setEnlargedItem] = useState<number | null>(null);

  const handleClick = (index: number, name: string, hasSound?: boolean) => {
    setEnlargedItem(index);
    onItemClick(index, name, hasSound);
  };

  const closeEnlarged = () => {
    stopAnimalSound();
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
        {title}
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
                backgroundColor: items[enlargedItem].color,
                minWidth: "320px",
                minHeight: "380px",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-4 left-4 text-6xl">✨</div>
                <div className="absolute top-4 right-4 text-6xl">⭐</div>
                <div className="absolute bottom-4 left-4 text-6xl">🌟</div>
                <div className="absolute bottom-4 right-4 text-6xl">💫</div>
              </div>

              <motion.span
                className="text-[140px] md:text-[200px] relative z-10"
                animate={{ 
                  scale: [1, 1.15, 1],
                  rotate: [0, -8, 8, 0],
                  y: [0, -10, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {items[enlargedItem].display}
              </motion.span>
              
              <motion.span 
                className="text-4xl md:text-6xl font-black text-white drop-shadow-lg relative z-10"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {items[enlargedItem].name}
              </motion.span>

              {showSoundIcon && items[enlargedItem].hasSound && (
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    playAnimalSound(items[enlargedItem].name);
                  }}
                  className="bg-white/30 rounded-full p-4 text-4xl relative z-10"
                >
                  🔊
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeEnlarged}
                className="mt-4 bg-white rounded-full px-10 py-4 text-2xl font-black shadow-lg border-4 relative z-10"
                style={{ color: items[enlargedItem].color, borderColor: items[enlargedItem].color }}
              >
                إغلاق ❌
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div 
        className={`grid ${isLetter ? "grid-cols-4 md:grid-cols-7" : "grid-cols-3 md:grid-cols-4"} gap-4 md:gap-6 max-w-5xl w-full p-6 rounded-[2rem] shadow-xl border-4 border-white/50`}
        style={{ backgroundColor: bgColor }}
      >
        {items.map((item, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.05, type: "spring", bounce: 0.4 }}
            whileHover={{ scale: 1.15, rotate: [-3, 3, 0], y: -8 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleClick(index, item.name, item.hasSound)}
            className={`relative rounded-[1.5rem] ${isLetter ? "p-4 md:p-5" : "p-5 md:p-6"} shadow-lg flex flex-col items-center gap-2 transition-all border-4 border-white overflow-hidden`}
            style={{
              backgroundColor: item.color,
              boxShadow: selectedItem === index 
                ? `0 0 0 6px white, 0 0 40px ${item.color}` 
                : `0 8px 20px ${item.color}40`,
            }}
          >
            <motion.span
              className={`${isLetter ? "text-5xl md:text-6xl" : "text-5xl md:text-7xl"}`}
              animate={selectedItem === index 
                ? { scale: [1, 1.4, 1], rotate: [0, 360] } 
                : { y: [0, -3, 0] }}
              transition={selectedItem === index 
                ? { duration: 0.6 } 
                : { duration: 2, repeat: Infinity, delay: index * 0.1 }}
            >
              {item.display}
            </motion.span>
            <span className={`${isLetter ? "text-sm md:text-lg" : "text-base md:text-xl"} font-black text-white drop-shadow-md`}>
              {item.name}
            </span>
            
            {showSoundIcon && item.hasSound && (
              <div className="absolute top-1 left-1 text-lg bg-white/50 rounded-full p-1">
                🔊
              </div>
            )}
            
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
