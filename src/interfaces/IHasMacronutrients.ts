import type { MN } from "./IMacroNutrientValues"

interface IHasMacronutrients {
  proteins: number
  fats: number
  carbohydrates: number
  proteinsChunk: number
  fatsChunk: number
  carbohydratesChunk: number
  chunk: number
  getMacronutrient(mn: MN): number
}

export type { IHasMacronutrients }