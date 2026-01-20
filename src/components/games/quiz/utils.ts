import { fruitsData, vegetablesData, animalsData, birdsData, colorsData, shapesData } from "@/data/game-data";
import { QuizCategory } from "./types";

export function getDataForCategory(category: QuizCategory) {
  switch (category) {
    case "fruits":
      return fruitsData.map(f => ({ display: f.emoji, name: f.name, color: f.color }));
    case "vegetables":
      return vegetablesData.map(v => ({ display: v.emoji, name: v.name, color: v.color }));
    case "animals":
      return animalsData.map(a => ({ display: a.emoji, name: a.name, color: a.color }));
    case "birds":
      return birdsData.map(b => ({ display: b.emoji, name: b.name, color: b.color }));
    case "colors":
      return colorsData.map(c => ({ display: "🔵", name: c.name, color: c.color }));
    case "shapes":
      return shapesData.map(s => ({ display: s.shape, name: s.name, color: s.color }));
  }
}
