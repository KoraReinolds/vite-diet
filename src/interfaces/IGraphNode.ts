import type { Meal } from "@/classes/Meal"
import type { IDietPlan } from "./IDietPlan"

type GraphState = Record<string, number>

interface IGraphNode {
  meal: Meal
  dp: IDietPlan
  state: GraphState
  heuristic(): number
  getNeighbors(): IGraphNode[]
}

export type { IGraphNode, GraphState }