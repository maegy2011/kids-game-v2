"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { categories, newGames, type GameCategory } from "@/data/game-data";

interface HomeScreenProps {
  onSelectGame: (game: GameCategory) => void;
}

export function HomeScreen({ onSelectGame }: HomeScreenProps) {
  return (
    <motion.div
      key="home"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="flex flex-col items-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", bounce: 0.6 }}
        className="mb-8 text-center"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 mb-4 drop-shadow-lg"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🎮 تعلّم والعب 🎮
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl font-bold text-purple-700"
        >
          اختر لعبة وابدأ المرح! 🌟
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-4xl w-full">
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, y: 50, rotate: -5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: index * 0.08, type: "spring", bounce: 0.4 }}
            whileHover={{ scale: 1.08, rotate: [-2, 2, 0], y: -10 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectGame(category.id as GameCategory)}
            className="relative rounded-[1.5rem] p-4 md:p-6 shadow-xl flex flex-col items-center gap-2 transition-all border-4 border-white overflow-hidden"
            style={{ backgroundColor: category.bgColor }}
          >
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${category.color}, transparent 70%)`,
              }}
            />
            <motion.div
              className="relative z-10 text-5xl md:text-7xl"
              animate={{ 
                y: [0, -8, 0],
                rotate: [-3, 3, -3],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.15 }}
            >
              {category.emoji}
            </motion.div>
            <span 
              className="relative z-10 text-lg md:text-2xl font-black"
              style={{ color: category.color }}
            >
              {category.name}
            </span>
            <motion.div
              className="absolute -bottom-2 -right-2 text-3xl opacity-30"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              ✨
            </motion.div>
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-10 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-black text-purple-700 mb-6">
          ✨ ألعاب جديدة ✨
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 max-w-4xl w-full">
          {newGames.map((game, index) => (
            <Link key={game.id} href={game.href}>
              <motion.div
                initial={{ opacity: 0, y: 50, rotate: -5 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ delay: 0.9 + index * 0.08, type: "spring", bounce: 0.4 }}
                whileHover={{ scale: 1.08, rotate: [-2, 2, 0], y: -10 }}
                whileTap={{ scale: 0.95 }}
                className="relative rounded-[1.5rem] p-4 md:p-6 shadow-xl flex flex-col items-center gap-2 transition-all border-4 border-white overflow-hidden cursor-pointer"
                style={{ backgroundColor: game.bgColor }}
              >
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${game.color}, transparent 70%)`,
                  }}
                />
                <motion.div
                  className="relative z-10 text-5xl md:text-7xl"
                  animate={{ 
                    y: [0, -8, 0],
                    rotate: [-3, 3, -3],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.15 }}
                >
                  {game.emoji}
                </motion.div>
                <span 
                  className="relative z-10 text-lg md:text-2xl font-black"
                  style={{ color: game.color }}
                >
                  {game.name}
                </span>
                <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                  جديد
                </div>
                <motion.div
                  className="absolute -bottom-2 -right-2 text-3xl opacity-30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  ✨
                </motion.div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
