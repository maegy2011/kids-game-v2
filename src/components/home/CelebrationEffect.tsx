"use client";

import { motion, AnimatePresence } from "motion/react";

interface CelebrationEffectProps {
  show: boolean;
  emojis: string[];
}

export function CelebrationEffect({ show, emojis }: CelebrationEffectProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1.2, rotate: 0 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="text-[120px] md:text-[180px]"
          >
            🎉
          </motion.div>
          {emojis.map((emoji, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 1, scale: 0 }}
              animate={{
                opacity: [1, 1, 0],
                scale: [0, 1.5, 1],
                x: Math.cos((i / 8) * Math.PI * 2) * 200,
                y: Math.sin((i / 8) * Math.PI * 2) * 200,
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute text-5xl md:text-6xl"
            >
              {emoji}
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
