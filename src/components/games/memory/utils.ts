import { fruitsData, animalsData, colorsData, shapesData } from "@/data/game-data";
import { MemoryCategory } from "./types";

export function getDataForCategory(category: MemoryCategory): { display: string; color: string; type?: string }[] {
  switch (category) {
    case "fruits":
      return fruitsData.slice(0, 6).map(f => ({ display: f.emoji, color: f.color }));
    case "animals":
      return animalsData.slice(0, 6).map(a => ({ display: a.emoji, color: a.color }));
    case "colors":
      return colorsData.slice(0, 6).map(c => ({ display: "●", color: c.color }));
    case "shapes":
      return shapesData.slice(0, 6).map(s => ({ display: s.shape, color: s.color, type: "shape" }));
  }
}
