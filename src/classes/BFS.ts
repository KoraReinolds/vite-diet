import type { IBFS } from "@/interfaces/IBFS"
import type { IGraphNode } from "@/interfaces/IGraphNode"
import { PriorityQueueMin } from "./PriorityQueueMin"

class BFS implements IBFS<IGraphNode> {
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

  search(goal: number) {
    const maxSize = 1000
    while (this.pq.length < maxSize) {
      if (this.pq.length > maxSize) return
      const item = this.pq.dequeue()
      if (item) {
        const h = item.heuristic()
        if (h < goal) {
          Object.entries(item).forEach(([key, val]) => { 
            item.dp.get(key)?.set(val)
          })
        }

        item.getNeighbors().forEach(nextItem => {
          this._add(nextItem)
        })
      }
    }
   
    return undefined
  }

}

export { BFS }