import type { Dish } from "@/classes/Dish"
import type { Food } from "@/classes/Food"

interface IDietPlanParams {
  food: Array<Food | Dish>
}

export type { IDietPlanParams }