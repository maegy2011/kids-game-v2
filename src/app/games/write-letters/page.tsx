"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const arabicLetters = [
  { letter: "أ", name: "ألف" },
  { letter: "ب", name: "باء" },
  { letter: "ت", name: "تاء" },
  { letter: "ث", name: "ثاء" },
  { letter: "ج", name: "جيم" },
  { letter: "ح", name: "حاء" },
  { letter: "خ", name: "خاء" },
  { letter: "د", name: "دال" },
  { letter: "ذ", name: "ذال" },
  { letter: "ر", name: "راء" },
  { letter: "ز", name: "زاي" },
  { letter: "س", name: "سين" },
  { letter: "ش", name: "شين" },
  { letter: "ص", name: "صاد" },
  { letter: "ض", name: "ضاد" },
  { letter: "ط", name: "طاء" },
  { letter: "ظ", name: "ظاء" },
  { letter: "ع", name: "عين" },
  { letter: "غ", name: "غين" },
  { letter: "ف", name: "فاء" },
  { letter: "ق", name: "قاف" },
  { letter: "ك", name: "كاف" },
  { letter: "ل", name: "لام" },
  { letter: "م", name: "ميم" },
  { letter: "ن", name: "نون" },
  { letter: "هـ", name: "هاء" },
  { letter: "و", name: "واو" },
  { letter: "ي", name: "ياء" },
];

export default function WriteLettersGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showGuide, setShowGuide] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paths, setPaths] = useState<{ x: number; y: number }[][]>([]);
  const [currentPath, setCurrentPath] = useState<{ x: number; y: number }[]>([]);
  const [penColor, setPenColor] = useState("#10b981");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const currentLetter = arabicLetters[currentIndex];

  const penColors = [
    { color: "#10b981", name: "أخضر" },
    { color: "#3b82f6", name: "أزرق" },
    { color: "#ef4444", name: "أحمر" },
    { color: "#f59e0b", name: "برتقالي" },
    { color: "#8b5cf6", name: "بنفسجي" },
  ];

  useEffect(() => {
    drawCanvas();
  }, [paths, currentPath, showGuide, currentIndex, penColor]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (showGuide) {
      ctx.font = "bold 180px 'Arial'";
      ctx.fillStyle = "rgba(16, 185, 129, 0.15)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(currentLetter.letter, canvas.width / 2, canvas.height / 2);
    }

    ctx.strokeStyle = penColor;
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    paths.forEach((path) => {
      if (path.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(path[0].x, path[0].y);
      path.forEach((point) => {
        ctx.lineTo(point.x, point.y);
      });
      ctx.stroke();
    });

    if (currentPath.length > 1) {
      ctx.beginPath();
      ctx.moveTo(currentPath[0].x, currentPath[0].y);
      currentPath.forEach((point) => {
        ctx.lineTo(point.x, point.y);
      });
      ctx.stroke();
    }
  };

  const getCanvasCoords = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ("touches" in e) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    }
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDrawing(true);
    const coords = getCanvasCoords(e);
    setCurrentPath([coords]);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const coords = getCanvasCoords(e);
    setCurrentPath((prev) => [...prev, coords]);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    if (currentPath.length > 1) {
      setPaths((prev) => [...prev, currentPath]);
    }
    setCurrentPath([]);
  };

  const clearCanvas = () => {
    setPaths([]);
    setCurrentPath([]);
  };

  const checkDrawing = () => {
    setAttempts(attempts + 1);
    const totalPoints = paths.reduce((sum, path) => sum + path.length, 0);

    if (totalPoints >= 25) {
      setScore(score + 10);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        nextLetter();
      }, 1500);
    } else {
      clearCanvas();
    }
  };

  const nextLetter = () => {
    setCurrentIndex((prev) => (prev + 1) % arabicLetters.length);
    clearCanvas();
    setShowGuide(true);
  };

  const prevLetter = () => {
    setCurrentIndex((prev) => (prev - 1 + arabicLetters.length) % arabicLetters.length);
    clearCanvas();
    setShowGuide(true);
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      dir="rtl"
      style={{
        background: "linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)",
      }}
    >
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 pointer-events-none">
          <div className="bg-white rounded-3xl p-8 text-center animate-bounce">
            <span className="text-8xl">🌟</span>
            <h2 className="text-4xl font-bold text-green-500 mt-4">رائع!</h2>
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
            ✍️ اكتب الحروف
          </h1>
          <div className="bg-yellow-400 px-4 py-2 rounded-full text-lg font-bold shadow-lg">
            ⭐ {score}
          </div>
        </div>

        <div className="flex justify-center gap-1 mb-4 flex-wrap max-w-4xl mx-auto">
          {arabicLetters.map((item, idx) => (
            <button
              key={item.letter}
              onClick={() => {
                setCurrentIndex(idx);
                clearCanvas();
              }}
              className={`w-10 h-10 rounded-lg text-lg font-bold transition-all ${
                idx === currentIndex
                  ? "bg-white text-emerald-600 shadow-lg scale-110"
                  : idx < currentIndex
                  ? "bg-emerald-700 text-white"
                  : "bg-white/30 text-white hover:bg-white/50"
              }`}
            >
              {item.letter}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
          <div className="bg-white/20 backdrop-blur rounded-3xl p-6 text-center">
            <p className="text-white text-lg mb-2">اكتب حرف</p>
            <div className="text-8xl text-white font-bold drop-shadow-lg mb-2">
              {currentLetter.letter}
            </div>
            <p className="text-white text-2xl">{currentLetter.name}</p>

            <div className="mt-4 flex justify-center gap-2">
              {penColors.map((pen) => (
                <button
                  key={pen.color}
                  onClick={() => setPenColor(pen.color)}
                  className={`w-10 h-10 rounded-full transition-all ${
                    penColor === pen.color ? "ring-4 ring-white scale-110" : ""
                  }`}
                  style={{ backgroundColor: pen.color }}
                  title={pen.name}
                />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-4 shadow-2xl">
            <canvas
              ref={canvasRef}
              width={350}
              height={350}
              className="touch-none cursor-crosshair rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50"
              style={{ width: 350, height: 350 }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />

            <div className="flex justify-center gap-3 mt-4">
              <button
                onClick={() => setShowGuide(!showGuide)}
                className={`px-4 py-2 rounded-full font-bold transition-all ${
                  showGuide
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                👁️ الدليل
              </button>
              <button
                onClick={clearCanvas}
                className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-full font-bold transition-all"
              >
                🗑️ مسح
              </button>
              <button
                onClick={checkDrawing}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-bold transition-all"
              >
                ✓ تحقق
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={prevLetter}
            className="bg-white hover:bg-gray-100 text-gray-700 px-6 py-3 rounded-full font-bold shadow-lg transition-all hover:scale-105"
          >
            ⬅️ السابق
          </button>
          <button
            onClick={nextLetter}
            className="bg-gradient-to-r from-teal-400 to-emerald-500 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-all hover:scale-105"
          >
            التالي ➡️
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-white/80 text-lg">
            الحرف {currentIndex + 1} من {arabicLetters.length} | النقاط: {score}
          </p>
        </div>
      </div>
    </div>
  );
}
