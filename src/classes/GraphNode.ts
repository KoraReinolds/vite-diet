import type { GraphState, IGraphNode } from "@/interfaces/IGraphNode";
import type { IPrototype } from "@/interfaces/IPrototype";
import type { Meal } from "./Meal";
import { PFCRatio } from "@/interfaces/PFC";
import { DietPlan } from "./DietPlan";

class GraphNode
implements IPrototype<GraphNode>, IGraphNode {

  state: GraphState = {}
  dp: DietPlan
  meal: Meal
  
  constructor(dp: DietPlan, state?: GraphState) {
    this.dp = dp
    this.meal = dp.getNewMeal()
    if (state) {
      this.state = state
    } else {
      this.meal.getAllList().reduce((state, food) => {
        state[food.name] = 0
        return state
      }, this.state)
    }
  }

  heuristic(): number {
    Object.entries(this.state).forEach(([key, val]) => {
      this.meal.get(key)?.set(val)
    })
    const { proteins, fats, carbohydrates } = new PFCRatio({
      carbohydrates: this.meal.carbohydrates,
      proteins: this.meal.proteins,
      fats: this.meal.fats,
    }).normilize()
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
      newGraphNode.state[key] += chunks
      return newGraphNode 
    })
  }

  clone(): GraphNode {
    return new GraphNode(this.dp, { ...this.state })
  };

}

export { GraphNode }