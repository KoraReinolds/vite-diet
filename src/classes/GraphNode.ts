import type { GraphState, IGraphNode } from "@/interfaces/IGraphNode";
import type { IPrototype } from "@/interfaces/IPrototype";
import { DietPlan } from "./DietPlan";

class GraphNode
implements IPrototype<GraphNode>, IGraphNode {

  dp: DietPlan
  state: GraphState = {}
  min: number = 10000
  
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
    return res * 2 + Math.abs((this.dp.kcal - this.dp.getEnergy()) / this.dp.kcal)
  }

  getNeighbors(): IGraphNode[] {
    return Object.keys(this.state).map(key => {
      const newGraphNode = this.clone()
      const food = this.dp.get(key)
      let chunks = 1
      if (food) {
        const energyChunk = (this.dp.kcal - this.dp.getEnergy()) / 10
        chunks = Math.max(1, Math.floor(energyChunk / food.getEnergyChunk()))
      }
      newGraphNode.state[key] += chunks
      return newGraphNode 
    })
  }

  clone(): GraphNode {
    return new GraphNode(this.dp, { ...this.state })
  };

}

export { GraphNode }