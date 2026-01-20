import { fruitsData, vegetablesData, animalsData, birdsData } from "@/data/game-data";
import { MatchingCategory } from "./types";

export function getDataForCategory(category: MatchingCategory) {
  switch (category) {
    case "fruits":
      return fruitsData.slice(0, 6).map((f, i) => ({ id: i, display: f.emoji, name: f.name, color: f.color }));
    case "vegetables":
      return vegetablesData.slice(0, 6).map((v, i) => ({ id: i, display: v.emoji, name: v.name, color: v.color }));
    case "animals":
      return animalsData.slice(0, 6).map((a, i) => ({ id: i, display: a.emoji, name: a.name, color: a.color }));
    case "birds":
      return birdsData.slice(0, 6).map((b, i) => ({ id: i, display: b.emoji, name: b.name, color: b.color }));
  }
}
