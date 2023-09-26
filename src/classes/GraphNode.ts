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
      dp.getAllList().reduce((state, food) => {
        state[food.name] = 0
        return state
      }, this.state)
    }
  }

  heuristic(): number {
    this.dp.setValuesFromState(this.state)
    const { proteins, fats, carbohydrates } = this.dp.normilizePFC()
    let res = 0
    res += Math.abs(proteins - this.dp.pfcRatio.proteins)
    res += Math.abs(carbohydrates - this.dp.pfcRatio.carbohydrates)
    res += Math.abs(fats - this.dp.pfcRatio.fats)
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