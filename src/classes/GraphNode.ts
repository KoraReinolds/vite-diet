import type { GraphState, IGraphNode } from "@/interfaces/IGraphNode";
import type { IPrototype } from "@/interfaces/IPrototype";
import { DietPlan } from "./DietPlan";

class GraphNode
implements IPrototype<GraphNode>, IGraphNode {

  dp: DietPlan
  state: GraphState = {}
  
  constructor(dp: DietPlan, state?: GraphState) {
    this.dp = dp
    if (state) {
      this.state = state
    } else {
      dp.getAllList().reduce((prev, food) => {
        food.set(1)
        prev[food.name] = 0 
        return prev
      }, this.state)
    }
  }

  heuristic(): number {
    const childs = this.dp.getAllList()
      .filter(food => {
        const val = this.state[food.name]
        if (val) food.set(val)
        return !!val
      })
    const dp = new DietPlan({ childs, kkal: this.dp.kkal, pfcRatio: this.dp.pfcRatio })
    const { proteins, fats, carbohydrates } = dp.normilizePFC()
    let res = 0
    res += Math.abs(proteins - dp.pfcRatio.proteins)
    res += Math.abs(carbohydrates - dp.pfcRatio.carbohydrates)
    res += Math.abs(fats - dp.pfcRatio.fats)
    return res
  }

  getNeighbors(): IGraphNode[] {
    return Object.keys(this.state).map(key => {
      const newGraphNode = this.clone()
      newGraphNode.state[key] += 1
      return newGraphNode 
    })
  }

  clone(): GraphNode {
    return new GraphNode(this.dp, { ...this.state })
  };

}

export { GraphNode }