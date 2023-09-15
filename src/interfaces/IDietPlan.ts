import type { IDietPlanParams } from "./IDietPlanParams"

interface IDietPlan
extends Omit<IDietPlanParams, 'childs'> {
  percise: number
}

export type { IDietPlan }