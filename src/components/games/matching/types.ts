export type MatchingCategory = "fruits" | "vegetables" | "animals" | "birds";

export interface MatchingItem {
  id: number;
  display: string;
  name: string;
  color: string;
}

export interface MatchingRightItem {
  id: number;
  name: string;
  color: string;
  matched: boolean;
}

export interface MatchingCategoryItem {
  id: MatchingCategory;
  name: string;
  emoji: string;
  color: string;
}

export interface MatchingGameProps {
  onCorrect: () => void;
}
