import type { PriorityQueue } from "@/classes/PriorityQueue"
import type { IGraphNode } from "./IGraphNode"

interface IBFS<T extends IGraphNode> {
  pq: PriorityQueue<T>
  search(goal: number): T | undefined
}

export type { IBFS }