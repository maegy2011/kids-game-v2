"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface ColorRegion {
  id: number;
  number: number;
  path: string;
  color: string | null;
  correctColor: string;
}

const colorPalette = [
  { number: 1, color: "#ef4444", name: "أحمر" },
  { number: 2, color: "#3b82f6", name: "أزرق" },
  { number: 3, color: "#22c55e", name: "أخضر" },
  { number: 4, color: "#eab308", name: "أصفر" },
  { number: 5, color: "#f97316", name: "برتقالي" },
  { number: 6, color: "#8b5cf6", name: "بنفسجي" },
  { number: 7, color: "#ec4899", name: "وردي" },
  { number: 8, color: "#14b8a6", name: "فيروزي" },
];

const coloringTemplates = [
  {
    name: "زهرة",
    viewBox: "0 0 200 200",
    regions: [
      { id: 1, number: 1, path: "M100,20 L120,60 L160,60 L130,90 L140,130 L100,105 L60,130 L70,90 L40,60 L80,60 Z", correctColor: "#ef4444" },
      { id: 2, number: 3, path: "M85,130 L100,105 L115,130 L115,180 L85,180 Z", correctColor: "#22c55e" },
      { id: 3, number: 4, path: "M100,70 A15,15 0 1,1 100,100 A15,15 0 1,1 100,70", correctColor: "#eab308" },
    ],
  },
  {
    name: "منزل",
    viewBox: "0 0 200 200",
    regions: [
      { id: 1, number: 1, path: "M100,20 L170,80 L30,80 Z", correctColor: "#ef4444" },
      { id: 2, number: 4, path: "M40,80 L160,80 L160,180 L40,180 Z", correctColor: "#eab308" },
      { id: 3, number: 2, path: "M70,110 L95,110 L95,150 L70,150 Z", correctColor: "#3b82f6" },
      { id: 4, number: 5, path: "M110,130 L110,180 L150,180 L150,130 Z", correctColor: "#f97316" },
    ],
  },
  {
    name: "فراشة",
    viewBox: "0 0 200 200",
    regions: [
      { id: 1, number: 6, path: "M100,40 C60,40 30,70 30,100 C30,130 60,160 100,130 Z", correctColor: "#8b5cf6" },
      { id: 2, number: 6, path: "M100,40 C140,40 170,70 170,100 C170,130 140,160 100,130 Z", correctColor: "#8b5cf6" },
      { id: 3, number: 7, path: "M95,40 L105,40 L105,180 L95,180 Z", correctColor: "#ec4899" },
      { id: 4, number: 4, path: "M55,80 A15,15 0 1,1 55,110 A15,15 0 1,1 55,80", correctColor: "#eab308" },
      { id: 5, number: 4, path: "M145,80 A15,15 0 1,1 145,110 A15,15 0 1,1 145,80", correctColor: "#eab308" },
    ],
  },
  {
    name: "شمس",
    viewBox: "0 0 200 200",
    regions: [
      { id: 1, number: 4, path: "M100,50 A50,50 0 1,1 100,150 A50,50 0 1,1 100,50", correctColor: "#eab308" },
      { id: 2, number: 5, path: "M95,10 L105,10 L105,40 L95,40 Z", correctColor: "#f97316" },
      { id: 3, number: 5, path: "M95,160 L105,160 L105,190 L95,190 Z", correctColor: "#f97316" },
      { id: 4, number: 5, path: "M10,95 L40,95 L40,105 L10,105 Z", correctColor: "#f97316" },
      { id: 5, number: 5, path: "M160,95 L190,95 L190,105 L160,105 Z", correctColor: "#f97316" },
      { id: 6, number: 5, path: "M35,35 L55,55 L48,62 L28,42 Z", correctColor: "#f97316" },
      { id: 7, number: 5, path: "M145,55 L165,35 L172,42 L152,62 Z", correctColor: "#f97316" },
      { id: 8, number: 5, path: "M48,138 L55,145 L35,165 L28,158 Z", correctColor: "#f97316" },
      { id: 9, number: 5, path: "M145,145 L152,138 L172,158 L165,165 Z", correctColor: "#f97316" },
    ],
  },
];

export default function ColoringGame() {
  const [templateIndex, setTemplateIndex] = useState(0);
  const [regions, setRegions] = useState<ColorRegion[]>([]);
  const [selectedColor, setSelectedColor] = useState<typeof colorPalette[0] | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const currentTemplate = coloringTemplates[templateIndex];

  useEffect(() => {
    setRegions(
      currentTemplate.regions.map((r) => ({
        ...r,
        color: null,
      }))
    );
    setIsComplete(false);
  }, [templateIndex, currentTemplate.regions]);

  useEffect(() => {
    if (regions.length > 0 && regions.every((r) => r.color !== null)) {
      const allCorrect = regions.every((r) => r.color === r.correctColor);
      if (allCorrect) {
        setIsComplete(true);
      }
    }
  }, [regions]);

  const handleRegionClick = (regionId: number) => {
    if (!selectedColor || isComplete) return;

    setRegions((prev) =>
      prev.map((r) =>
        r.id === regionId ? { ...r, color: selectedColor.color } : r
      )
    );
  };

  const resetColoring = () => {
    setRegions((prev) => prev.map((r) => ({ ...r, color: null })));
    setIsComplete(false);
  };

  const nextTemplate = () => {
    setTemplateIndex((prev) => (prev + 1) % coloringTemplates.length);
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      dir="rtl"
      style={{
        background: "linear-gradient(135deg, #a855f7 0%, #c084fc 50%, #e879f9 100%)",
      }}
    >
      {isComplete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-3xl p-8 text-center animate-bounce">
            <span className="text-8xl">🎨</span>
            <h2 className="text-4xl font-bold text-purple-500 mt-4">رائع!</h2>
            <p className="text-xl text-gray-600 mt-2">لونت الصورة بشكل صحيح</p>
            <button
              onClick={nextTemplate}
              className="mt-4 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full font-bold"
            >
              الصورة التالية
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
            🎨 لعبة التلوين
          </h1>
          <div className="bg-white px-4 py-2 rounded-full text-lg font-bold shadow-lg">
            {currentTemplate.name}
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          {coloringTemplates.map((template, idx) => (
            <button
              key={template.name}
              onClick={() => setTemplateIndex(idx)}
              className={`px-4 py-2 rounded-full font-bold transition-all ${
                idx === templateIndex
                  ? "bg-white text-purple-500 shadow-lg scale-110"
                  : "bg-white/50 text-white hover:bg-white/70"
              }`}
            >
              {template.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
          <div className="bg-white/20 backdrop-blur rounded-3xl p-4">
            <p className="text-white text-center mb-3 font-bold">اختر لوناً</p>
            <div className="grid grid-cols-4 gap-3">
              {colorPalette.map((palette) => (
                <button
                  key={palette.number}
                  onClick={() => setSelectedColor(palette)}
                  className={`
                    w-14 h-14 rounded-xl flex flex-col items-center justify-center
                    transition-all shadow-lg
                    ${selectedColor?.number === palette.number
                      ? "ring-4 ring-white scale-110"
                      : "hover:scale-105"
                    }
                  `}
                  style={{ backgroundColor: palette.color }}
                >
                  <span className="text-white text-xl font-bold drop-shadow">
                    {palette.number}
                  </span>
                </button>
              ))}
            </div>
            {selectedColor && (
              <p className="text-white text-center mt-3">
                اللون المختار: {selectedColor.name}
              </p>
            )}
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-2xl">
            <svg
              ref={svgRef}
              viewBox={currentTemplate.viewBox}
              className="w-72 h-72 md:w-96 md:h-96"
            >
              {regions.map((region) => (
                <g key={region.id}>
                  <path
                    d={region.path}
                    fill={region.color || "#f3f4f6"}
                    stroke="#374151"
                    strokeWidth="2"
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleRegionClick(region.id)}
                  />
                  {!region.color && (
                    <text
                      x={getPathCenter(region.path).x}
                      y={getPathCenter(region.path).y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-2xl font-bold fill-gray-500 pointer-events-none"
                    >
                      {region.number}
                    </text>
                  )}
                </g>
              ))}
            </svg>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={resetColoring}
            className="bg-white hover:bg-gray-100 text-gray-700 px-6 py-3 rounded-full font-bold shadow-lg transition-all hover:scale-105"
          >
            🔄 إعادة
          </button>
          <button
            onClick={nextTemplate}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-all hover:scale-105"
          >
            التالي ➡️
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-white/90 text-lg">
            اختر لوناً ثم اضغط على المنطقة المرقمة بنفس الرقم
          </p>
        </div>
      </div>
    </div>
  );
}

function getPathCenter(path: string): { x: number; y: number } {
  const numbers = path.match(/[\d.]+/g);
  if (!numbers || numbers.length < 2) return { x: 100, y: 100 };

  let sumX = 0;
  let sumY = 0;
  let count = 0;

  for (let i = 0; i < numbers.length - 1; i += 2) {
    sumX += parseFloat(numbers[i]);
    sumY += parseFloat(numbers[i + 1]);
    count++;
  }

  return {
    x: sumX / count,
    y: sumY / count,
  };
}
