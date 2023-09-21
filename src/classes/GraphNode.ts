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
    let res = this.dp.kkal
    this.dp.getAllList().forEach(food => {
      let macroApproximation = 1
      macroApproximation -= Math.abs(food.pfcRatio.proteins - this.dp.pfcRatio.proteins) / 3
      macroApproximation -= Math.abs(food.pfcRatio.carbohydrates - this.dp.pfcRatio.carbohydrates) / 3
      macroApproximation -= Math.abs(food.pfcRatio.fats - this.dp.pfcRatio.fats) / 3
      res -= food.getEnergyChunk() * this.state[food.name] * macroApproximation
    })
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