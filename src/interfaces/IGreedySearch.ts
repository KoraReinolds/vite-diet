import type { PriorityQueue } from "@/classes/PriorityQueue"
import type { IGraphNode } from "./IGraphNode"

interface IGreedySearch<T extends IGraphNode> {
  pq: PriorityQueue<T>
  search(goal: number): T | undefined
}

export type { IGreedySearch }