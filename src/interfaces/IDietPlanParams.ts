import type { PFC } from "./PFC"
import type { Meal } from "@/classes/Meal"

interface IDietPlanParams {
  childs: Meal[]
  kcal: number
  pfcRatio: PFC
}

export type { IDietPlanParams }