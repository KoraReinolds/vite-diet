import type { Food } from "@/classes/Food"
import type { PFC } from "./PFC"

interface IDietPlanParams {
  childs: Food[]
  kkal: number
  pfcRatio: PFC
}

export type { IDietPlanParams }