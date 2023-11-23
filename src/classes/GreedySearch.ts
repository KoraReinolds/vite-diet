import type { IGreedySearch } from "@/interfaces/IGreedySearch"
import type { IGraphNode } from "@/interfaces/IGraphNode"
import { PriorityQueueMin } from "./PriorityQueueMin"

class GreedySearch implements IGreedySearch<IGraphNode> {
  private _pq: PriorityQueueMin<IGraphNode> = new PriorityQueueMin()
  private _visited: Set<string> = new Set() 

  get pq() {
    return this._pq
  }

  constructor(start: IGraphNode) {
    this._add(start)
  }
  
  private _add(item: IGraphNode): void {
    const state = Object.values(item.state).toString()
    if (!this._visited.has(state)) {
      this.pq.enqueue(item, item.heuristic())
      this._visited.add(state)
    }
  }

  search(goal: number): IGraphNode | undefined {
    let iteration = 100
    let min = +Infinity
    let minItem

    while (iteration) {
      iteration -= 1
      const item = this.pq.dequeue()
      if (item) {
        const h = item.heuristic()
        if (h < min) {
          minItem = item
          min = h
        }
        if (h < goal) {
          return item
        }

        item.getNeighbors().forEach(nextItem => {
          this._add(nextItem)
        })
      }
    }
    
    minItem?.heuristic()
   
    return minItem
  }

}

export { GreedySearch }