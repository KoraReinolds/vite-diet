import type { IDietPlanParams } from "./IDietPlanParams"
import type { GraphState } from "./IGraphNode"

interface IDietPlan
extends Omit<IDietPlanParams, 'childs'> {
  percise: number
  setValuesFromState(state: GraphState): void
}

export type { IDietPlan }