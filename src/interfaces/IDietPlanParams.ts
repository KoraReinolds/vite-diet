import type { Dish } from "@/classes/Dish"
import type { Food } from "@/classes/Food"

interface IDietPlanParams {
  food: Array<Food | Dish>
  kkal: number
  pfcRatio: {
    proteins: number
    fats: number
    carbohydrates: number
  }
}

export type { IDietPlanParams }