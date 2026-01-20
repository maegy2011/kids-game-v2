"use client";

import { motion } from "motion/react";
import { ShapeDisplay } from "../ShapeDisplay";
import { MemoryCard } from "./types";

interface CardGridProps {
  cards: MemoryCard[];
  isChecking: boolean;
  onCardClick: (id: number) => void;
}

export function CardGrid({ cards, isChecking, onCardClick }: CardGridProps) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 max-w-lg w-full">
      {cards.map((card) => (
        <motion.button
          key={card.id}
          initial={{ rotateY: 180 }}
          animate={{ rotateY: card.isFlipped || card.isMatched ? 0 : 180 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: card.isMatched ? 1 : 1.05 }}
          whileTap={{ scale: card.isMatched ? 1 : 0.95 }}
          onClick={() => onCardClick(card.id)}
          className={`aspect-square rounded-xl md:rounded-2xl shadow-lg flex items-center justify-center border-4 transition-all active:scale-95 ${
            card.isMatched
              ? "border-green-500 bg-green-100"
              : card.isFlipped
              ? "border-yellow-400 bg-white"
              : "border-purple-300 bg-gradient-to-br from-purple-400 to-pink-400"
          }`}
          style={{ minHeight: "70px" }}
          disabled={card.isMatched || isChecking}
        >
          {(card.isFlipped || card.isMatched) ? (
            card.type === "shape" ? (
              <div className="scale-75 md:scale-100">
                <ShapeDisplay shape={card.display} color={card.color} size={40} />
              </div>
            ) : card.display === "●" ? (
              <div 
                className="w-10 h-10 md:w-14 md:h-14 rounded-full border-4 border-white shadow-lg"
                style={{ backgroundColor: card.color }}
              />
            ) : (
              <span className="text-3xl md:text-5xl">{card.display}</span>
            )
          ) : (
            <span className="text-3xl md:text-4xl">❓</span>
          )}
        </motion.button>
      ))}
    </div>
  );
}
