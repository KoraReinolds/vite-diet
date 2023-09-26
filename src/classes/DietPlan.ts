import type { IDietPlan } from "@/interfaces/IDietPlan";
import { CompositeWithFixedValue } from "./Composite";
import type { Food } from "./Food";
import type { IDietPlanParams } from "@/interfaces/IDietPlanParams";
import type { PFC } from "@/interfaces/PFC";
import type { GraphState } from "@/interfaces/IGraphNode";

class DietPlan
extends CompositeWithFixedValue<Food>
implements IDietPlan {
  private _percise: number = 2
  private _kcal: number
  private _pfc: PFC
  protected _chunks: number = 1
  protected _defaultSize: number = 1

  constructor(params: IDietPlanParams) {
    const { pfcRatio, kcal } = params
    super({
      ...params,
      chunks: 1,
      name: 'DietPlan'
    })
    this._kcal = kcal
    this._pfc = this.normilizePFC(pfcRatio)
  }

  setValuesFromState(state: GraphState): void {
    Object.entries(state).forEach(([key, val]) => {
      this.get(key)?.set(val)
    })
  }

  get pfcRatio() {
    return this._pfc 
  }
  
  get percise() {
    return this._percise
  }
  
  get kcal() {
    return this._kcal
  }
  
}

export { DietPlan }