"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";

interface Item {
  id: number;
  emoji: string;
  name: string;
}

interface Connection {
  leftId: number;
  rightId: number;
  correct: boolean;
}

const categories = [
  {
    name: "الفواكه",
    items: [
      { id: 1, emoji: "🍎", name: "تفاحة" },
      { id: 2, emoji: "🍌", name: "موزة" },
      { id: 3, emoji: "🍇", name: "عنب" },
      { id: 4, emoji: "🍊", name: "برتقالة" },
      { id: 5, emoji: "🍓", name: "فراولة" },
    ],
  },
  {
    name: "الحيوانات",
    items: [
      { id: 1, emoji: "🐱", name: "قطة" },
      { id: 2, emoji: "🐕", name: "كلب" },
      { id: 3, emoji: "🐘", name: "فيل" },
      { id: 4, emoji: "🦁", name: "أسد" },
      { id: 5, emoji: "🐰", name: "أرنب" },
    ],
  },
  {
    name: "الألوان",
    items: [
      { id: 1, emoji: "🔴", name: "أحمر" },
      { id: 2, emoji: "🟢", name: "أخضر" },
      { id: 3, emoji: "🔵", name: "أزرق" },
      { id: 4, emoji: "🟡", name: "أصفر" },
      { id: 5, emoji: "🟣", name: "بنفسجي" },
    ],
  },
];

export default function ConnectGame() {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [shuffledRight, setShuffledRight] = useState<Item[]>([]);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineCoords, setLineCoords] = useState<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  } | null>(null);

  const currentCategory = categories[categoryIndex];

  const shuffleArray = useCallback((array: Item[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  useEffect(() => {
    setShuffledRight(shuffleArray(currentCategory.items));
    setConnections([]);
    setSelectedLeft(null);
  }, [categoryIndex, currentCategory.items, shuffleArray]);

  useEffect(() => {
    if (connections.length === currentCategory.items.length) {
      const allCorrect = connections.every((c) => c.correct);
      if (allCorrect) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }
    }
  }, [connections, currentCategory.items.length]);

  const getElementCenter = (elementId: string) => {
    const element = document.getElementById(elementId);
    const container = containerRef.current;
    if (!element || !container) return null;

    const elementRect = element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    return {
      x: elementRect.left - containerRect.left + elementRect.width / 2,
      y: elementRect.top - containerRect.top + elementRect.height / 2,
    };
  };

  const handleLeftClick = (id: number) => {
    if (connections.some((c) => c.leftId === id)) return;
    setSelectedLeft(id);

    const leftCenter = getElementCenter(`left-${id}`);
    if (leftCenter) {
      setLineCoords({
        x1: leftCenter.x,
        y1: leftCenter.y,
        x2: leftCenter.x,
        y2: leftCenter.y,
      });
    }
  };

  const handleRightClick = (id: number) => {
    if (selectedLeft === null) return;
    if (connections.some((c) => c.rightId === id)) return;

    const isCorrect = selectedLeft === id;
    const newConnection: Connection = {
      leftId: selectedLeft,
      rightId: id,
      correct: isCorrect,
    };

    setConnections([...connections, newConnection]);
    if (isCorrect) {
      setScore(score + 10);
    }
    setSelectedLeft(null);
    setLineCoords(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (selectedLeft === null || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const leftCenter = getElementCenter(`left-${selectedLeft}`);
    if (leftCenter) {
      setLineCoords({
        x1: leftCenter.x,
        y1: leftCenter.y,
        x2: e.clientX - containerRect.left,
        y2: e.clientY - containerRect.top,
      });
    }
  };

  const resetGame = () => {
    setConnections([]);
    setSelectedLeft(null);
    setShuffledRight(shuffleArray(currentCategory.items));
    setLineCoords(null);
  };

  const nextCategory = () => {
    setCategoryIndex((prev) => (prev + 1) % categories.length);
    setScore(0);
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      dir="rtl"
      style={{
        background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)",
      }}
    >
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-3xl p-8 text-center animate-bounce">
            <span className="text-8xl">🎉</span>
            <h2 className="text-4xl font-bold text-green-500 mt-4">أحسنت!</h2>
            <p className="text-xl text-gray-600 mt-2">لقد أكملت جميع التوصيلات</p>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="bg-white/80 hover:bg-white px-4 py-2 rounded-full text-lg font-bold shadow-lg transition-all"
          >
            🏠 الرئيسية
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
            🔗 لعبة التوصيل
          </h1>
          <div className="bg-yellow-400 px-4 py-2 rounded-full text-lg font-bold shadow-lg">
            ⭐ {score}
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          {categories.map((cat, idx) => (
            <button
              key={cat.name}
              onClick={() => {
                setCategoryIndex(idx);
                setScore(0);
              }}
              className={`px-4 py-2 rounded-full font-bold transition-all ${
                idx === categoryIndex
                  ? "bg-white text-pink-500 shadow-lg scale-110"
                  : "bg-white/50 text-white hover:bg-white/70"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div
          ref={containerRef}
          className="relative bg-white/90 backdrop-blur rounded-3xl p-6 shadow-2xl"
          onMouseMove={handleMouseMove}
        >
          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
          >
            {connections.map((conn, idx) => {
              const leftCenter = getElementCenter(`left-${conn.leftId}`);
              const rightCenter = getElementCenter(`right-${conn.rightId}`);
              if (!leftCenter || !rightCenter) return null;

              return (
                <line
                  key={idx}
                  x1={leftCenter.x}
                  y1={leftCenter.y}
                  x2={rightCenter.x}
                  y2={rightCenter.y}
                  stroke={conn.correct ? "#22c55e" : "#ef4444"}
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              );
            })}
            {lineCoords && (
              <line
                x1={lineCoords.x1}
                y1={lineCoords.y1}
                x2={lineCoords.x2}
                y2={lineCoords.y2}
                stroke="#a855f7"
                strokeWidth="3"
                strokeDasharray="10,5"
                strokeLinecap="round"
              />
            )}
          </svg>

          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-4">
              {currentCategory.items.map((item) => {
                const isConnected = connections.some((c) => c.leftId === item.id);
                const isSelected = selectedLeft === item.id;

                return (
                  <button
                    key={item.id}
                    id={`left-${item.id}`}
                    onClick={() => handleLeftClick(item.id)}
                    disabled={isConnected}
                    className={`
                      w-24 h-24 rounded-2xl text-5xl flex items-center justify-center
                      transition-all duration-200 shadow-lg
                      ${isConnected ? "bg-gray-200 opacity-50" : "bg-gradient-to-br from-pink-400 to-rose-500 hover:scale-110"}
                      ${isSelected ? "ring-4 ring-purple-500 scale-110" : ""}
                    `}
                  >
                    {item.emoji}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col gap-4">
              {shuffledRight.map((item) => {
                const connection = connections.find((c) => c.rightId === item.id);
                const isConnected = !!connection;

                return (
                  <button
                    key={item.id}
                    id={`right-${item.id}`}
                    onClick={() => handleRightClick(item.id)}
                    disabled={isConnected || selectedLeft === null}
                    className={`
                      px-6 py-4 rounded-2xl text-2xl font-bold
                      transition-all duration-200 shadow-lg min-w-[120px]
                      ${isConnected
                        ? connection.correct
                          ? "bg-green-400 text-white"
                          : "bg-red-400 text-white"
                        : "bg-gradient-to-br from-blue-400 to-indigo-500 text-white hover:scale-105"
                      }
                      ${selectedLeft !== null && !isConnected ? "animate-pulse" : ""}
                    `}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={resetGame}
            className="bg-white hover:bg-gray-100 text-gray-700 px-6 py-3 rounded-full font-bold shadow-lg transition-all hover:scale-105"
          >
            🔄 إعادة
          </button>
          <button
            onClick={nextCategory}
            className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-all hover:scale-105"
          >
            التالي ➡️
          </button>
        </div>
      </div>
    </div>
  );
}
