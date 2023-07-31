import type { Food } from "@/classes/Food"

interface IDietPlanParams {
  food: Food[]
  kkal: number
  pfcRatio: {
    proteins: number
    fats: number
    carbohydrates: number
  }
}

export type { IDietPlanParams }