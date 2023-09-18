type GraphState = Record<string, number>

interface IGraphNode {
  state: GraphState
  heuristic(): number
  getNeighbors(): IGraphNode[]
}

export type { IGraphNode, GraphState }