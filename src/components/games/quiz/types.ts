export type QuizCategory = "fruits" | "vegetables" | "animals" | "birds" | "colors" | "shapes";

export interface QuizOption {
  display: string;
  name: string;
  color: string;
  isCorrect: boolean;
}

export interface QuizCategoryItem {
  id: QuizCategory;
  name: string;
  emoji: string;
  color: string;
}

export interface QuizGameProps {
  onCorrect: () => void;
}
