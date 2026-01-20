"use client";

import { motion } from "motion/react";
import { floatingEmojis } from "@/data/game-data";

export function BackgroundEffects() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-sky-300/50 to-transparent" />
      
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`cloud-${i}`}
          className="absolute text-white text-6xl md:text-8xl opacity-40"
          animate={{
            x: ["-100%", "100vw"],
          }}
          transition={{
            duration: 30 + i * 10,
            repeat: Infinity,
            ease: "linear",
            delay: i * 5,
          }}
          style={{
            top: `${5 + i * 8}%`,
          }}
        >
          ☁️
        </motion.div>
      ))}

      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`float-${i}`}
          className="absolute text-3xl md:text-4xl"
          initial={{ opacity: 0.6 }}
          animate={{
            y: [0, -30, 0],
            rotate: [-5, 5, -5],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        >
          {floatingEmojis[i % floatingEmojis.length]}
        </motion.div>
      ))}

      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 120" className="w-full h-20 md:h-32">
          <path
            fill="#90EE90"
            d="M0,64 C480,120 960,0 1440,64 L1440,120 L0,120 Z"
          />
        </svg>
      </div>
    </div>
  );
}
