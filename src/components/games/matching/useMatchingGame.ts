"use client";

import { useState, useEffect, useCallback } from "react";
import { speakArabic } from "@/lib/audio";
import { MatchingCategory, MatchingItem, MatchingRightItem } from "./types";
import { getDataForCategory } from "./utils";

export function useMatchingGame(onCorrect: () => void) {
  const [matchingCategory, setMatchingCategory] = useState<MatchingCategory | null>(null);
  const [leftItems, setLeftItems] = useState<MatchingItem[]>([]);
  const [rightItems, setRightItems] = useState<MatchingRightItem[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [wrongMatch, setWrongMatch] = useState<{ left: number; right: number } | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [matchScore, setMatchScore] = useState(0);

  const startGame = useCallback((category: MatchingCategory) => {
    const data = getDataForCategory(category);
    const shuffledLeft = [...data].sort(() => Math.random() - 0.5);
    const shuffledRight = [...data].sort(() => Math.random() - 0.5).map(item => ({
      ...item,
      matched: false,
    }));
    
    setLeftItems(shuffledLeft);
    setRightItems(shuffledRight);
    setSelectedLeft(null);
    setMatchedPairs([]);
    setWrongMatch(null);
    setGameComplete(false);
    setMatchScore(0);
  }, []);

  useEffect(() => {
    if (matchingCategory) {
      startGame(matchingCategory);
    }
  }, [matchingCategory, startGame]);

  const handleLeftClick = (id: number) => {
    if (matchedPairs.includes(id)) return;
    setSelectedLeft(id);
    setWrongMatch(null);
  };

  const handleRightClick = (id: number) => {
    if (selectedLeft === null || rightItems.find(r => r.id === id)?.matched) return;
    
    if (selectedLeft === id) {
      setMatchedPairs(prev => [...prev, id]);
      setRightItems(prev => prev.map(item => 
        item.id === id ? { ...item, matched: true } : item
      ));
      setMatchScore(prev => prev + 1);
      onCorrect();
      speakArabic("أحسنت!");
      
      if (matchedPairs.length + 1 === leftItems.length) {
        setTimeout(() => {
          setGameComplete(true);
          speakArabic("ممتاز! أكملت اللعبة!");
        }, 500);
      }
    } else {
      setWrongMatch({ left: selectedLeft, right: id });
      speakArabic("حاول مرة أخرى!");
      setTimeout(() => setWrongMatch(null), 800);
    }
    setSelectedLeft(null);
  };

  const selectCategory = (category: MatchingCategory) => {
    setMatchingCategory(category);
  };

  const resetGame = () => {
    setMatchingCategory(null);
  };

  return {
    matchingCategory,
    leftItems,
    rightItems,
    selectedLeft,
    matchedPairs,
    wrongMatch,
    gameComplete,
    matchScore,
    handleLeftClick,
    handleRightClick,
    selectCategory,
    resetGame,
  };
}
