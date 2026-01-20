"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { shapesData } from "@/data/game-data";
import { ShapeDisplay } from "./ShapeDisplay";

interface ShapesGridProps {
  selectedItem: number | null;
  onItemClick: (index: number, name: string) => void;
}

export function ShapesGrid({ selectedItem, onItemClick }: ShapesGridProps) {
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
        ⬛ الأشكال ⬛
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
              className="rounded-[3rem] p-10 md:p-16 shadow-2xl flex flex-col items-center gap-6 border-8 border-white relative overflow-hidden bg-white"
              style={{
                minWidth: "320px",
                minHeight: "380px",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="relative z-10 flex items-center justify-center"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ShapeDisplay 
                  shape={shapesData[enlargedItem].shape} 
                  color={shapesData[enlargedItem].color} 
                  size={150} 
                />
              </motion.div>
              
              <motion.span 
                className="text-4xl md:text-6xl font-black drop-shadow-lg relative z-10"
                style={{ color: shapesData[enlargedItem].color }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {shapesData[enlargedItem].name}
              </motion.span>

              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeEnlarged}
                className="mt-4 bg-gray-100 rounded-full px-10 py-4 text-2xl font-black shadow-lg border-4 relative z-10"
                style={{ color: shapesData[enlargedItem].color, borderColor: shapesData[enlargedItem].color }}
              >
                إغلاق ❌
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl w-full p-6 rounded-[2rem] shadow-xl border-4 border-white/50"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        {shapesData.map((item, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.05, type: "spring", bounce: 0.4 }}
            whileHover={{ scale: 1.15, rotate: [-3, 3, 0], y: -8 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleClick(index, item.name)}
            className="relative rounded-[1.5rem] p-6 md:p-8 shadow-lg flex flex-col items-center gap-4 transition-all border-4 border-white overflow-hidden bg-white"
            style={{
              boxShadow: selectedItem === index 
                ? `0 0 0 6px white, 0 0 40px ${item.color}` 
                : `0 8px 20px ${item.color}40`,
            }}
          >
            <motion.div
              className="flex items-center justify-center"
              animate={selectedItem === index 
                ? { scale: [1, 1.4, 1], rotate: [0, 360] } 
                : { scale: [1, 1.05, 1] }}
              transition={selectedItem === index 
                ? { duration: 0.6 } 
                : { duration: 2, repeat: Infinity, delay: index * 0.1 }}
            >
              <ShapeDisplay shape={item.shape} color={item.color} size={60} />
            </motion.div>
            <span 
              className="text-lg md:text-xl font-black"
              style={{ color: item.color }}
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
