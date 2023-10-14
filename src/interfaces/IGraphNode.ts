import type { DietPlan } from "@/classes/DietPlan"
import type { Meal } from "@/classes/Meal"

type GraphState = Record<string, number>

interface IGraphNode {
  meal: Meal
  dp: DietPlan
  state: GraphState
  heuristic(): number
  getNeighbors(): IGraphNode[]
}

export type { IGraphNode, GraphState }