import type { Meal } from "@/classes/Meal"
import type { IDietPlanParams } from "./IDietPlanParams"

interface IDietPlan
extends Omit<IDietPlanParams, 'childs'> {
  leftKcal: number
  getNewMeal(): Meal
}

export type { IDietPlan }