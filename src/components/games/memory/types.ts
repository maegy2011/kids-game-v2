export type MemoryCategory = "fruits" | "animals" | "colors" | "shapes";

export interface MemoryCard {
  id: number;
  pairId: number;
  display: string;
  color: string;
  isFlipped: boolean;
  isMatched: boolean;
  type?: string;
}

export interface MemoryCategoryItem {
  id: MemoryCategory;
  name: string;
  emoji: string;
  color: string;
}

export interface MemoryGameProps {
  onCorrect: () => void;
}
