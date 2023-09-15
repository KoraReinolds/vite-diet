import type { IDietPlan } from "@/interfaces/IDietPlan";
import { CompositeWithFixedValue } from "./Composite";
import type { Food } from "./Food";
import type { IDietPlanParams } from "@/interfaces/IDietPlanParams";
import type { PFC } from "@/interfaces/PFC";

class DietPlan
extends CompositeWithFixedValue<Food>
implements IDietPlan {
  private _percise: number = 2
  private _kkal: number
  private _pfc: PFC
  protected _chunks: number = 1

  constructor(params: IDietPlanParams) {
    const { pfcRatio, kkal } = params
    super({
      ...params,
      chunks: 1,
      name: 'DietPlan'
    })
    this._kkal = kkal
    this._pfc = pfcRatio
  }

  getParams(): IDietPlanParams {
    return {
      childs: this.getAllList(),
      kkal: this.kkal,
      pfcRatio: this.pfcRatio
    } 
  }

  get pfcRatio() {
    return this._pfc 
  }
  
  get percise() {
    return this._percise
  }
  
  get kkal() {
    return this._kkal
  }
  
}

export { DietPlan }