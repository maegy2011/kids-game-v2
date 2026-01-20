"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { AnimatePresence } from "motion/react";

import {
  fruitsData,
  vegetablesData,
  numbersData,
  animalsData,
  birdsData,
  lettersData,
  type GameCategory,
} from "@/data/game-data";
import { speakArabic, loadSoundsFromDB } from "@/lib/audio";
import {
  GameGrid,
  ColorsGrid,
  ShapesGrid,
  QuizGame,
  MatchingGame,
  MemoryGame,
} from "@/components/games";
import {
  BackgroundEffects,
  CelebrationEffect,
  GameHeader,
  HomeScreen,
} from "@/components/home";

const fruitsItems = fruitsData.map((f) => ({ display: f.emoji, name: f.name, color: f.color }));
const vegetablesItems = vegetablesData.map((v) => ({ display: v.emoji, name: v.name, color: v.color }));
const numbersItems = numbersData.map((n) => ({ display: n.emoji, name: n.name, color: n.color }));
const lettersItems = lettersData.map((l) => ({ display: l.letter, name: l.name, color: l.color }));
const animalsBaseItems = animalsData.map((a) => ({ display: a.emoji, name: a.name, color: a.color }));
const birdsBaseItems = birdsData.map((b) => ({ display: b.emoji, name: b.name, color: b.color }));

export default function Home() {
  const [currentGame, setCurrentGame] = useState<GameCategory>("home");
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationEmojis, setCelebrationEmojis] = useState<string[]>([]);
  const [soundsLoaded, setSoundsLoaded] = useState<Record<string, boolean>>({});

  const animalsItems = useMemo(() => 
    animalsBaseItems.map(a => ({ ...a, hasSound: soundsLoaded[a.name] || false })),
    [soundsLoaded]
  );

  const birdsItems = useMemo(() => 
    birdsBaseItems.map(b => ({ ...b, hasSound: soundsLoaded[b.name] || false })),
    [soundsLoaded]
  );

  const refreshSounds = useCallback(async () => {
    const soundMap = await loadSoundsFromDB();
    const loaded: Record<string, boolean> = {};
    Object.keys(soundMap).forEach(name => {
      loaded[name] = true;
    });
    setSoundsLoaded(loaded);
  }, []);

  useEffect(() => {
    refreshSounds();
  }, [refreshSounds]);

  useEffect(() => {
    const handleFocus = () => {
      refreshSounds();
    };
    
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [refreshSounds]);

  const triggerCelebration = useCallback(() => {
    const emojis = ["🎉", "⭐", "🌟", "✨", "🎊", "🎈", "💖"];
    setCelebrationEmojis(emojis.sort(() => Math.random() - 0.5).slice(0, 8));
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 1800);
  }, []);

  const handleItemClick = useCallback((index: number, name: string, playSound?: boolean) => {
    setSelectedItem(index);
    setScore((prev) => prev + 1);
    speakArabic(name);
    if (playSound) {
      import("@/lib/audio").then(({ playAnimalSound }) => {
        setTimeout(() => playAnimalSound(name), 1000);
      });
    }
    triggerCelebration();
    setTimeout(() => setSelectedItem(null), 1200);
  }, [triggerCelebration]);

  return (
    <div
      className="min-h-screen font-sans overflow-hidden relative"
      dir="rtl"
      style={{
        background: "linear-gradient(180deg, #87CEEB 0%, #98FB98 50%, #FFE4B5 100%)",
      }}
    >
      <BackgroundEffects />
      <CelebrationEffect show={showCelebration} emojis={celebrationEmojis} />
      <GameHeader 
        score={score} 
        currentGame={currentGame} 
        onGoHome={() => setCurrentGame("home")} 
      />

      <main className="relative z-10 container mx-auto px-4 pb-20">
        <AnimatePresence mode="wait">
          {currentGame === "home" && (
            <HomeScreen onSelectGame={setCurrentGame} />
          )}

{currentGame === "fruits" && (
              <GameGrid
                title="🍎 الفواكه 🍎"
                items={fruitsItems}
                selectedItem={selectedItem}
                onItemClick={handleItemClick}
                bgColor="#FFF0F0"
              />
            )}

            {currentGame === "vegetables" && (
              <GameGrid
                title="🥕 الخضروات 🥕"
                items={vegetablesItems}
                selectedItem={selectedItem}
                onItemClick={handleItemClick}
                bgColor="#F0FFF0"
              />
            )}

            {currentGame === "animals" && (
              <GameGrid
                title="🦁 الحيوانات 🦁"
                items={animalsItems}
                selectedItem={selectedItem}
                onItemClick={handleItemClick}
                bgColor="#FFF8E1"
                showSoundIcon
              />
            )}

            {currentGame === "birds" && (
              <GameGrid
                title="🐦 الطيور 🐦"
                items={birdsItems}
                selectedItem={selectedItem}
                onItemClick={handleItemClick}
                bgColor="#E3F2FD"
                showSoundIcon
              />
            )}

{currentGame === "numbers" && (
              <GameGrid
                title="🔢 الأرقام 🔢"
                items={numbersItems}
                selectedItem={selectedItem}
                onItemClick={handleItemClick}
                bgColor="#F3E5F5"
              />
            )}

            {currentGame === "letters" && (
              <GameGrid
                title="أ ب ت الحروف أ ب ت"
                items={lettersItems}
                selectedItem={selectedItem}
                onItemClick={handleItemClick}
                isLetter
                bgColor="#FCE4EC"
              />
            )}

          {currentGame === "colors" && (
            <ColorsGrid
              selectedItem={selectedItem}
              onItemClick={handleItemClick}
            />
          )}

          {currentGame === "shapes" && (
            <ShapesGrid
              selectedItem={selectedItem}
              onItemClick={handleItemClick}
            />
          )}

          {currentGame === "quiz" && (
            <QuizGame
              onCorrect={() => {
                setScore((prev) => prev + 5);
                triggerCelebration();
              }}
            />
          )}

          {currentGame === "matching" && (
            <MatchingGame
              onCorrect={() => {
                setScore((prev) => prev + 3);
                triggerCelebration();
              }}
            />
          )}

          {currentGame === "memory" && (
            <MemoryGame
              onCorrect={() => {
                setScore((prev) => prev + 2);
                triggerCelebration();
              }}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
