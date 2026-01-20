"use client";

import { useState, useEffect, useCallback } from "react";
import { speakArabic } from "@/lib/audio";
import { MemoryCategory, MemoryCard } from "./types";
import { getDataForCategory } from "./utils";

export function useMemoryGame(onCorrect: () => void) {
  const [memoryCategory, setMemoryCategory] = useState<MemoryCategory | null>(null);
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const startGame = useCallback((category: MemoryCategory) => {
    const data = getDataForCategory(category);
    const pairs: MemoryCard[] = [];
    
    data.forEach((item, index) => {
      pairs.push(
        { id: index * 2, pairId: index, display: item.display, color: item.color, isFlipped: false, isMatched: false, type: item.type },
        { id: index * 2 + 1, pairId: index, display: item.display, color: item.color, isFlipped: false, isMatched: false, type: item.type }
      );
    });

    const shuffled = pairs.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setGameComplete(false);
    setIsChecking(false);
  }, []);

  useEffect(() => {
    if (memoryCategory) {
      startGame(memoryCategory);
    }
  }, [memoryCategory, startGame]);

  const handleCardClick = (id: number) => {
    if (isChecking) return;
    
    const card = cards.find(c => c.id === id);
    if (!card || card.isFlipped || card.isMatched) return;
    if (flippedCards.length >= 2) return;

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);
    setCards(prev => prev.map(c => c.id === id ? { ...c, isFlipped: true } : c));

    if (newFlippedCards.length === 2) {
      setIsChecking(true);
      setMoves(prev => prev + 1);
      
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === firstId || c.id === secondId 
              ? { ...c, isMatched: true } 
              : c
          ));
          setMatchedPairs(prev => [...prev, firstCard.pairId]);
          setFlippedCards([]);
          setIsChecking(false);
          onCorrect();
          speakArabic("أحسنت!");

          if (matchedPairs.length + 1 === cards.length / 2) {
            setTimeout(() => {
              setGameComplete(true);
              speakArabic("ممتاز! أكملت اللعبة!");
            }, 500);
          }
        }, 600);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === firstId || c.id === secondId 
              ? { ...c, isFlipped: false } 
              : c
          ));
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  const selectCategory = (category: MemoryCategory) => {
    setMemoryCategory(category);
  };

  const resetGame = () => {
    setMemoryCategory(null);
  };

  return {
    memoryCategory,
    cards,
    matchedPairs,
    moves,
    gameComplete,
    isChecking,
    handleCardClick,
    selectCategory,
    resetGame,
  };
}
