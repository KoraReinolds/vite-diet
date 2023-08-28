import type { Food } from "@/classes/Food"
import type { PFC } from "./PFC"
import type { ICompositeParams } from "./ICompositeParams"

interface IDietPlanParams
extends ICompositeParams<Food> {
  kkal: number
  pfcRatio: PFC
}

export type { IDietPlanParams }