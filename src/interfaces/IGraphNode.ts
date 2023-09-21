import type { DietPlan } from "@/classes/DietPlan"

type GraphState = Record<string, number>

interface IGraphNode {
  dp: DietPlan
  state: GraphState
  heuristic(): number
  getNeighbors(): IGraphNode[]
}

export type { IGraphNode, GraphState }