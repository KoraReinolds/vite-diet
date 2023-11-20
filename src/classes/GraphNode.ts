import type { GraphState, IGraphNode } from "@/interfaces/IGraphNode";
import type { IPrototype } from "@/interfaces/IPrototype";
import type { Meal } from "./Meal";
import { PFCEnergyRatio } from "@/interfaces/PFC";
import type { IDietPlan } from "@/interfaces/IDietPlan";

class GraphNode
implements IPrototype<GraphNode>, IGraphNode {

  state: GraphState = {}
  maxState: GraphState = {}
  dp: IDietPlan
  meal: Meal
  
  constructor(dp: IDietPlan, state?: GraphState, maxState?: GraphState) {
    this.dp = dp
    this.meal = dp.getNewMeal()
    this.state = {
      ...this.meal.getAllList().reduce((state, food) => {
        state[food.name] = 0
        return state
      }, this.state),
      ...state,
    }
    this.maxState = maxState || {}
  }

  heuristic(): number {
    Object.entries(this.state).forEach(([key, val]) => {
      this.meal.get(key)?.set(val)
    })
    const { proteins, fats, carbohydrates } = new PFCEnergyRatio(this.meal).normilize()
    let res = 0
    const pfc = this.dp.pfcRatio
    res += Math.abs(proteins - pfc.proteins)
    res += Math.abs(carbohydrates - pfc.carbohydrates)
    res += Math.abs(fats - pfc.fats)
    return res * 2 + Math.abs(this.dp.leftKcal / this.dp.kcal)
  }

  getNeighbors(): IGraphNode[] {
    return Object.keys(this.state).map(key => {
      const newGraphNode = this.clone()
      const food = this.meal.get(key)
      let chunks = 1
      if (food) {
        const energyChunk = this.dp.leftKcal / 10
        chunks = Math.max(1, Math.floor(energyChunk / food.getEnergyChunk()))
      }
      newGraphNode.state[key] = Math.min(
        this.maxState[key] ?? +Infinity,
        newGraphNode.state[key] + chunks
      )
      return newGraphNode 
    })
  }

  clone(): GraphNode {
    return new GraphNode(this.dp, { ...this.state }, this.maxState)
  };

}

export { GraphNode }