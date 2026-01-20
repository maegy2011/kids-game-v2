"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface PuzzlePiece {
  id: number;
  currentPos: number;
  correctPos: number;
  emoji: string;
}

const puzzleImages = [
  {
    name: "الفواكه",
    emojis: ["🍎", "🍊", "🍋", "🍇", "🍓", "🍑", "🍒", "🥝", "🍌"],
  },
  {
    name: "الحيوانات",
    emojis: ["🐱", "🐕", "🐘", "🦁", "🐰", "🐻", "🦊", "🐼", "🐨"],
  },
  {
    name: "الطبيعة",
    emojis: ["🌸", "🌻", "🌺", "🌹", "🌷", "🌼", "💐", "🌿", "🍀"],
  },
  {
    name: "المركبات",
    emojis: ["🚗", "🚕", "🚌", "🚎", "🏎️", "🚓", "🚑", "🚒", "✈️"],
  },
];

export default function PuzzleGame() {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [gridSize, setGridSize] = useState(3);

  const currentCategory = puzzleImages[categoryIndex];

  const initializePuzzle = useCallback(() => {
    const totalPieces = gridSize * gridSize;
    const emojis = currentCategory.emojis.slice(0, totalPieces);

    const initialPieces: PuzzlePiece[] = emojis.map((emoji, index) => ({
      id: index,
      currentPos: index,
      correctPos: index,
      emoji,
    }));

    const shuffled = [...initialPieces];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tempPos = shuffled[i].currentPos;
      shuffled[i].currentPos = shuffled[j].currentPos;
      shuffled[j].currentPos = tempPos;
    }

    setPieces(shuffled);
    setMoves(0);
    setIsComplete(false);
    setSelectedPiece(null);
  }, [currentCategory.emojis, gridSize]);

  useEffect(() => {
    initializePuzzle();
  }, [initializePuzzle]);

  useEffect(() => {
    if (pieces.length > 0) {
      const complete = pieces.every((p) => p.currentPos === p.correctPos);
      if (complete && moves > 0) {
        setIsComplete(true);
      }
    }
  }, [pieces, moves]);

  const handlePieceClick = (pieceId: number) => {
    if (isComplete) return;

    if (selectedPiece === null) {
      setSelectedPiece(pieceId);
    } else if (selectedPiece === pieceId) {
      setSelectedPiece(null);
    } else {
      setPieces((prev) => {
        const newPieces = [...prev];
        const piece1 = newPieces.find((p) => p.id === selectedPiece)!;
        const piece2 = newPieces.find((p) => p.id === pieceId)!;

        const tempPos = piece1.currentPos;
        piece1.currentPos = piece2.currentPos;
        piece2.currentPos = tempPos;

        return newPieces;
      });
      setMoves((m) => m + 1);
      setSelectedPiece(null);
    }
  };

  const getPieceAtPosition = (position: number) => {
    return pieces.find((p) => p.currentPos === position);
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      dir="rtl"
      style={{
        background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #fcd34d 100%)",
      }}
    >
      {isComplete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-3xl p-8 text-center animate-bounce">
            <span className="text-8xl">🎊</span>
            <h2 className="text-4xl font-bold text-amber-500 mt-4">أحسنت!</h2>
            <p className="text-xl text-gray-600 mt-2">
              أكملت البازل في {moves} حركة
            </p>
            <button
              onClick={initializePuzzle}
              className="mt-4 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-bold"
            >
              العب مرة أخرى
            </button>
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
            🧩 لعبة البازل
          </h1>
          <div className="bg-white px-4 py-2 rounded-full text-lg font-bold shadow-lg">
            🔄 {moves}
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-4 flex-wrap">
          {puzzleImages.map((cat, idx) => (
            <button
              key={cat.name}
              onClick={() => setCategoryIndex(idx)}
              className={`px-4 py-2 rounded-full font-bold transition-all ${
                idx === categoryIndex
                  ? "bg-white text-amber-500 shadow-lg scale-110"
                  : "bg-white/50 text-white hover:bg-white/70"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-4 mb-6">
          {[2, 3].map((size) => (
            <button
              key={size}
              onClick={() => setGridSize(size)}
              className={`px-4 py-2 rounded-full font-bold transition-all ${
                gridSize === size
                  ? "bg-amber-700 text-white shadow-lg"
                  : "bg-white/50 text-white hover:bg-white/70"
              }`}
            >
              {size}x{size}
            </button>
          ))}
        </div>

        <div className="flex justify-center">
          <div
            className="bg-white/90 backdrop-blur rounded-3xl p-4 shadow-2xl inline-block"
          >
            <div
              className="grid gap-2"
              style={{
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
              }}
            >
              {Array.from({ length: gridSize * gridSize }).map((_, position) => {
                const piece = getPieceAtPosition(position);
                if (!piece) return null;

                const isSelected = selectedPiece === piece.id;
                const isCorrect = piece.currentPos === piece.correctPos;

                return (
                  <button
                    key={position}
                    onClick={() => handlePieceClick(piece.id)}
                    className={`
                      w-24 h-24 md:w-28 md:h-28 rounded-2xl text-5xl md:text-6xl
                      flex items-center justify-center
                      transition-all duration-200 shadow-lg
                      ${isSelected
                        ? "ring-4 ring-purple-500 scale-105 bg-purple-100"
                        : isCorrect
                        ? "bg-green-100"
                        : "bg-gradient-to-br from-amber-100 to-orange-100"
                      }
                      hover:scale-105 cursor-pointer
                    `}
                  >
                    {piece.emoji}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={initializePuzzle}
            className="bg-white hover:bg-gray-100 text-gray-700 px-6 py-3 rounded-full font-bold shadow-lg transition-all hover:scale-105"
          >
            🔄 خلط جديد
          </button>
          <button
            onClick={() => {
              setCategoryIndex((prev) => (prev + 1) % puzzleImages.length);
            }}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-all hover:scale-105"
          >
            التالي ➡️
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-white/90 text-lg">
            اختر قطعتين لتبديلهما | الحركات: {moves}
          </p>
        </div>
      </div>
    </div>
  );
}
