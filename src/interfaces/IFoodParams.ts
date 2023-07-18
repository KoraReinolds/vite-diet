import type { MacroNutrient } from "@/classes/MacroNutrient"

interface IFoodParams {
  name: string
  value?: number
  proteins: MacroNutrient
  fats: MacroNutrient
  carbohydrates: MacroNutrient
}

export type { IFoodParams }